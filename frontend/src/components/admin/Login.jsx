import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAppContext from '../../context/useAppContext'
import toast from 'react-hot-toast'


const Login = () => {
    const {axios, setToken} = useAppContext()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const [tokenValue, setTokenValue] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        try {
            const {data} = await axios.post('/api/admin/login', {email, password})
            if (data && data.token) {
                setToken(data.token)
                setTokenValue(data.token)
                localStorage.setItem('token', data.token)
                // Set Authorization header consistently with AppContext
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
                navigate('/admin')
            } else {
                toast.error(data?.message || 'Login failed')
            }
        } catch (error) {
           toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4'>
            <div className='max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden'>
                <div className='p-8'>
                    {/* Header */}
                    <div className='text-center mb-8'>
                        <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                            <span className='text-blue-600'>Admin</span> Login
                        </h1>
                        <p className='text-gray-600'>
                            Enter your credentials to access the admin panel
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        {/* Email Field */}
                        <div>
                            <label 
                                htmlFor="email" 
                                className='block text-sm font-medium text-gray-700 mb-2'
                            >
                                Email Address
                            </label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email" 
                                required 
                                className='
                                    w-full 
                                    px-4 py-3 
                                    border border-gray-300 
                                    rounded-lg 
                                    focus:outline-none 
                                    focus:ring-2 focus:ring-blue-500 
                                    focus:border-transparent
                                    transition-all duration-200
                                    placeholder-gray-400
                                '
                                disabled={loading}
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label 
                                htmlFor="password" 
                                className='block text-sm font-medium text-gray-700 mb-2'
                            >
                                Password
                            </label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password" 
                                required 
                                className='
                                    w-full 
                                    px-4 py-3 
                                    border border-gray-300 
                                    rounded-lg 
                                    focus:outline-none 
                                    focus:ring-2 focus:ring-blue-500 
                                    focus:border-transparent
                                    transition-all duration-200
                                    placeholder-gray-400
                                '
                                disabled={loading}
                            />
                        </div>

                        {/* Login Button */}
                        <div className='space-y-2'>
                        <div className='flex gap-2'>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className='
                                w-full 
                                py-3 
                                bg-gradient-to-r from-blue-500 to-purple-600
                                text-white 
                                font-semibold 
                                rounded-lg
                                hover:from-blue-600 hover:to-purple-700
                                focus:outline-none 
                                focus:ring-2 focus:ring-blue-500 
                                focus:ring-opacity-50
                                transition-all duration-200
                                transform hover:-translate-y-0.5
                                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                                flex items-center justify-center
                            '
                        >
                            {loading ? (
                                <>
                                    <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Logging in...
                                </>
                            ) : (
                                'Login'
                            )}
                        </button>
                        <button type='button' onClick={()=>navigate('/admin/signup')} className='py-3 px-4 bg-white border border-gray-200 rounded-lg text-sm'>Sign up</button>
                        </div>
                        {tokenValue && (
                            <div className='flex items-center justify-between mt-2'>
                                <code className='text-xs text-gray-600 truncate max-w-[70%]'>{tokenValue}</code>
                                <button type='button' onClick={()=>{navigator.clipboard.writeText(tokenValue); toast.success('Token copied')}} className='px-3 py-1 bg-gray-100 rounded-md text-sm'>Copy</button>
                            </div>
                        )}
                        </div>
                    </form>

                    
                </div>
            </div>
        </div>
    )
}

export default Login