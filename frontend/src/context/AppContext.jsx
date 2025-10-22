import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Create axios instance with defaults
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
import { AppContext } from './contextValue.js';

export const AppProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [input, setInput] = useState("");

    const fetchBlogs = async () => {
        try {
            const { data } = await axiosInstance.get('/api/blog/all');
            // Check the actual response structure from your API
            if (data.blogs) {
                setBlogs(data.blogs);
            } else if (data.blog) {
                setBlogs(data.blog);
            } else if (Array.isArray(data)) {
                setBlogs(data);
            } else {
                setBlogs([]);
            }
        } catch (error) {
            console.error('Error fetching blogs:', error);
            toast.error(error.response?.data?.message || error.message || 'Failed to fetch blogs');
        }
    };

    useEffect(() => {
        fetchBlogs();
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
            // decode token payload and set user
            try {
                const payload = JSON.parse(atob(storedToken.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
                setUser(payload);
            } catch {
                setUser(null);
            }
        }
    }, []);

    // Update axios headers when token changes
    useEffect(() => {
        if (token) {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('token', token);
            // Try to fetch authoritative profile from server (preferred).
            (async () => {
                try {
                    const { data } = await axiosInstance.get('/api/admin/me');
                    if (data && data.success && data.user) {
                        setUser(data.user);
                        return;
                    }
                } catch (err) {
                    // If /me fails (unauthorized), fall back to decoding token or clear token
                    const status = err?.response?.status;
                    if (status === 401 || status === 403) {
                        setToken(null);
                        return;
                    }
                    console.warn('Failed to fetch /api/admin/me, falling back to token payload');
                }

                // Fallback: decode token payload locally
                try {
                    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
                    setUser(payload);
                } catch {
                    setUser(null);
                }
            })();
        } else {
            delete axiosInstance.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
            setUser(null);
        }
    }, [token]);

    // Intercept responses to handle expired/unauthorized tokens globally
    useEffect(() => {
        const interceptor = axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                const status = error.response?.status;
                const message = error.response?.data?.message || '';

                // If unauthorized or token expired, clear the token and redirect to admin login
                if (status === 401 || /expired/i.test(message) || /invalid token/i.test(message)) {
                    toast.error('Session expired or unauthorized — please log in again');
                    setToken(null);
                    // navigate to admin login route; App.jsx will show Login when token is falsy
                    try {
                        navigate('/admin');
                    } catch {
                        // navigate may not be available in some contexts; ignore
                    }
                }

                return Promise.reject(error);
            }
        );

        return () => axiosInstance.interceptors.response.eject(interceptor);
    }, [navigate, setToken]);

    const value = {
        axios: axiosInstance, // Provide the axios instance
        navigate,
        token,
        user,
        // mark registration complete
        completeRegistration: () => {
            setUser((u) => ({ ...(u || {}), isRegistered: true }));
        },
        setToken,
        setUser,
        blogs,
        setBlogs,
        input,
        setInput,
        fetchBlogs
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};