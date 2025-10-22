import React from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/useAppContext'

const Navbar = () => {
  const {navigate, token} = useAppContext()

  return (
    <div className='flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16'>
      {/* Logo - Always on Left */}
      <img 
        onClick={() => navigate('/')} 
        src="/images/ted.png"
        alt="Logo" 
        className='w-20 sm:w-24 md:w-32 lg:w-36 xl:w-40 cursor-pointer transition-transform duration-200 hover:scale-105'
      />
      
      {/* Right-side actions */}
      <div className='flex items-center gap-3'>
        {!token && (
          <button onClick={() => navigate('/admin/signup')} className='py-2 px-4 text-sm font-medium rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50'>
            Sign up
          </button>
        )}

        <button 
          onClick={() => navigate('/admin')}
          className='
            flex items-center justify-center gap-2 
            px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3
            bg-gradient-to-r from-blue-600 to-purple-600 
            hover:from-blue-700 hover:to-purple-700
            text-white 
            font-semibold 
            text-sm sm:text-base lg:text-lg
            rounded-lg 
            shadow-lg 
            hover:shadow-xl
            transition-all 
            duration-300 
            ease-in-out
            transform 
            hover:-translate-y-0.5
            active:translate-y-0
            border-0
            outline-none
            focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50
          '
        >
          <span>{token ? 'Dashboard' : 'Login'}</span>
          <img 
            src={assets.arrow} 
            className='w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 transition-transform duration-200 group-hover:translate-x-1' 
            alt="arrow" 
          />
        </button>
      </div>
    </div>
  )
}

export default Navbar