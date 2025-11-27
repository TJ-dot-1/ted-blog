import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-64 min-h-[calc(100vh-80px)] p-6 border-r transition-colors duration-200' style={{ backgroundColor: 'var(--card-bg)', borderRightColor: 'var(--card-bg)' }}>
        <nav className='space-y-2'>
            <NavLink
                end
                to="/admin"
                className={({isActive}) =>
                    `flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                        isActive
                            ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600 font-semibold'
                            : 'hover:bg-gray-50'
                    }`
                }
                style={({isActive}) => ({
                    color: isActive ? '#2563eb' : 'var(--text-color)',
                    opacity: isActive ? 1 : 0.8
                })}
            >
                <span>📊</span>
                <span>Dashboard</span>
            </NavLink>
            
            <NavLink
                to="/admin/add-blog"
                className={({isActive}) =>
                    `flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                        isActive
                            ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600 font-semibold'
                            : 'hover:bg-gray-50'
                    }`
                }
                style={({isActive}) => ({
                    color: isActive ? '#2563eb' : 'var(--text-color)',
                    opacity: isActive ? 1 : 0.8
                })}
            >
                <span>✏️</span>
                <span>Add Blog</span>
            </NavLink>

            <NavLink
                to="/admin/list-blog"
                className={({isActive}) =>
                    `flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                        isActive
                            ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600 font-semibold'
                            : 'hover:bg-gray-50'
                    }`
                }
                style={({isActive}) => ({
                    color: isActive ? '#2563eb' : 'var(--text-color)',
                    opacity: isActive ? 1 : 0.8
                })}
            >
                <span>📝</span>
                <span>List Blog</span>
            </NavLink>

            <NavLink
                to="/admin/comments"
                className={({isActive}) =>
                    `flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                        isActive
                            ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600 font-semibold'
                            : 'text-gray-600 hover:bg-gray-50'
                    }`
                }
                style={({isActive}) => ({
                    color: isActive ? '#2563eb' : 'var(--text-color)',
                    opacity: isActive ? 1 : 0.8
                })}
            >
                <span>💬</span>
                <span>Comments</span>
            </NavLink>
        </nav>
    </div>
  )
}

export default Sidebar