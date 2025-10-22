import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAppContext from '../../context/useAppContext'
import toast from 'react-hot-toast'

const Signup = () => {
    const { axios, setToken, setUser } = useAppContext()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            // Try common signup endpoints; backend may differ
            const endpointCandidates = ['/api/admin/register', '/api/admin/signup', '/api/auth/register', '/api/auth/signup'];
            let resp = null;
            for (const ep of endpointCandidates) {
                try {
                    const { data } = await axios.post(ep, { name, email, password })
                    resp = data
                    break
                } catch {
                    // ignore and try next
                }
            }

            if (!resp) {
                toast.error('Registration endpoint not available on server');
                return;
            }

            if (resp && resp.success) {
                toast.success('Registration successful — signing you in...');
                if (resp.token) {
                    setToken(resp.token);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${resp.token}`;
                    localStorage.setItem('token', resp.token);
                    // set user as unregistered until they complete profile
                    try {
                        setUser({ email: resp.user?.email || email, name: resp.user?.name || name, isRegistered: false, role: resp.user?.role || 'user' });
                    } catch {
                        // ignore
                    }
                }
                setTimeout(() => navigate('/'), 1200);
            } else {
                toast.error(resp?.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Signup error:', error);
            toast.error(error?.response?.data?.message || error.message || 'Signup failed');
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4'>
            <div className='max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden'>
                <div className='p-8'>
                    <div className='text-center mb-8'>
                        <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                            <span className='text-blue-600'>Admin</span> Signup
                        </h1>
                        <p className='text-gray-600'>Create an admin account to manage the blog</p>
                    </div>

                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Full Name</label>
                            <input value={name} onChange={(e)=>setName(e.target.value)} required className='w-full px-4 py-3 border border-gray-300 rounded-lg' placeholder='Your full name' />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
                            <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email' required className='w-full px-4 py-3 border border-gray-300 rounded-lg' placeholder='name@example.com' />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
                            <input value={password} onChange={(e)=>setPassword(e.target.value)} type='password' required className='w-full px-4 py-3 border border-gray-300 rounded-lg' placeholder='Choose a strong password' />
                        </div>

                        <button type='submit' disabled={loading} className='w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg'>
                            {loading ? 'Creating account...' : 'Sign up'}
                        </button>

                        <div className='text-center text-sm text-gray-600'>
                            Already have an account? <button type='button' onClick={()=>navigate('/admin')} className='text-blue-600 font-medium'>Sign in</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
