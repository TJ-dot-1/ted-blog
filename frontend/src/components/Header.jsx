import React, { useRef } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context'

const Header = () => {
  const { setInput, input, fetchBlogs } = useAppContext()
  const inputRef = useRef()

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value)
  }

  const handleClearSearch = () => {
    setInput('')
    if (inputRef.current) {
      inputRef.current.value = ''
    }
    // Fetch all blogs to reset the view
    fetchBlogs()
  }

  return ( 
    <div className='relative'>
      {/* New Feature Banner */}
      <div className='flex items-center justify-center bg-gradient-to-r from-yellow-50 to-amber-50 border-b border-yellow-200 py-2 px-4'>
        <p className='text-yellow-800 text-sm sm:text-base font-medium flex items-center'>
          <span>New: AI feature integrated</span>
          <img src={assets.star_icon} alt="New Feature" className='w-5 h-5 sm:w-6 sm:h-6 inline-block ml-2 animate-pulse'/>
        </p>
      </div>

      {/* Main Content */}
      <div className='pt-8 sm:pt-12 lg:pt-16 pb-8 sm:pb-12 lg:pb-16 px-4 sm:px-8 lg:px-16'>
        {/* Heading */}
        <h1 className='text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-6 lg:mb-8 leading-tight'>
          Your Own <span className='bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent'>Blogging</span> Platform
        </h1>

        {/* Description */}
        <p className='text-center text-gray-600 text-base sm:text-lg lg:text-xl xl:text-2xl mb-8 lg:mb-12 px-4 sm:px-8 lg:px-32 xl:px-64 leading-relaxed'>
          Create, share, and connect with a community of bloggers. Our platform offers seamless blogging experience with AI-powered tools to enhance your content.
        </p>

        {/* Search Form */}
        <form onSubmit={onSubmitHandler} className='flex justify-center mb-6'>
          <div className='flex shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 w-full max-w-2xl'>
            <input 
              ref={inputRef}
              type="text"
              placeholder='Search blogs...'
              className='
                flex-1
                px-4 sm:px-6 py-3 sm:py-4
                border-0
                bg-white
                text-gray-800
                text-sm sm:text-base lg:text-lg
                focus:outline-none 
                focus:ring-2 focus:ring-blue-500 
                focus:ring-opacity-50
                transition-all duration-200
                placeholder-gray-500
              '
            />
            <button 
              type="submit"
              className='
                px-6 sm:px-8 py-3 sm:py-4
                bg-gradient-to-r from-blue-500 to-purple-600
                text-white 
                font-semibold 
                text-sm sm:text-base lg:text-lg
                hover:from-blue-600 hover:to-purple-700
                focus:outline-none 
                focus:ring-2 focus:ring-blue-500 
                focus:ring-opacity-50
                transition-all duration-200
                transform hover:-translate-y-0.5
                active:translate-y-0
                whitespace-nowrap
                cursor-pointer
              '
            >
              Search
            </button>
          </div>
        </form>

        {/* Clear Search Button - Only show when there's input */}
        {(input || inputRef.current?.value) && (
          <div className='flex justify-center mb-8'>
            <button
              onClick={handleClearSearch}
              className='
                px-6 sm:px-8 py-2 sm:py-3
                bg-gradient-to-r from-gray-500 to-gray-600
                text-white 
                font-semibold 
                text-sm sm:text-base
                rounded-lg
                hover:from-gray-600 hover:to-gray-700
                focus:outline-none 
                focus:ring-2 focus:ring-gray-500 
                focus:ring-opacity-50
                transition-all duration-200
                transform hover:-translate-y-0.5
                active:translate-y-0
                whitespace-nowrap
                cursor-pointer
                flex items-center gap-2
              '
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear Search
            </button>
          </div>
        )}

        {/* Search Info */}
        {input && (
          <div className='text-center mb-4'>
            <p className='text-gray-600 text-sm'>
              Showing results for: <span className='font-semibold text-blue-600'>"{input}"</span>
            </p>
            <p className='text-gray-500 text-xs mt-1'>
              Clear search to see all blogs
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header