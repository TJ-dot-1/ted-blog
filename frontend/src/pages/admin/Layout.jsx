import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { Outlet} from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import { useAppContext } from '../../context';

const Layout = () => {

    const {axios, setToken, navigate} = useAppContext();



    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const logout = () => {
        localStorage.removeItem('adminToken');
        axios.defaults.headers.common['Authorization'] = null;
        setToken(null);
        navigate('/');
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    return (
        <div className='min-h-screen bg-gray-50'>
            {/* Navbar */}
            <div className='flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-200 bg-white'>
                {/* Left Section - Menu Button and Logo */}
                <div className='flex items-center gap-4'>
                    {/* Mobile Menu Button */}
                    <button 
                        onClick={toggleSidebar}
                        className='lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200'
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    
                    {/* Logo */}
                    <img 
                        src={assets.logo} 
                        alt="TedBlog Logo" 
                        onClick={() => navigate('/')} 
                        className='w-28 sm:w-32 cursor-pointer transition-opacity duration-200 hover:opacity-80'
                    />
                </div>
                
                {/* Logout Button */}
                <button 
                    onClick={logout} 
                    className='
                        px-4 py-2 sm:px-6 sm:py-2
                        bg-gradient-to-r from-blue-500 to-purple-600
                        text-white 
                        font-semibold
                        rounded-lg
                        cursor-pointer
                        hover:from-blue-600 hover:to-purple-700
                        transition-all duration-200
                        text-sm sm:text-base
                    '
                >
                    Logout
                </button>
            </div>

            {/* Main Content Area */}
            <div className='flex relative'>
                {/* Sidebar Overlay for Mobile */}
                {isSidebarOpen && (
                    <div 
                        className='fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden'
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}
                
                {/* Sidebar */}
                <div className={`
                    fixed lg:static
                    top-0 left-0
                    h-full
                    transform transition-transform duration-300 ease-in-out
                    z-30
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}>
                    <Sidebar onItemClick={() => setIsSidebarOpen(false)} />
                </div>
                
                {/* Page Content */}
                <div className='flex-1 p-4 sm:p-6 lg:p-8 w-full min-h-screen'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout