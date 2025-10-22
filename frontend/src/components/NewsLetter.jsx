import React, { useState } from 'react'

const NewsLetter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Subscribed with:', email);
    setEmail('');
  };

  return (
    <div className='
      bg-white
      border border-gray-200
      rounded-xl
      p-6 sm:p-8
      max-w-2xl
      mx-auto
      my-12
      shadow-md
      text-center
    '>
      {/* Heading */}
      <h1 className='
        text-xl sm:text-2xl
        font-bold
        text-gray-900
        mb-2
      '>
        Never Miss A <span className='text-blue-600'>Blog</span>
      </h1>

      {/* Subheading */}
      <h2 className='
        text-base sm:text-lg
        text-gray-600
        mb-6
      '>
        Subscribe to our newsletter
      </h2>

      {/* Form */}
      <form 
        onSubmit={handleSubmit}
        className='
          flex
          flex-col sm:flex-row
          gap-2
          max-w-sm
          mx-auto
        '
      >
        <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          required
          className='
            flex-1
            px-4 py-2
            rounded-lg
            border border-gray-300
            text-gray-900
            text-sm
            placeholder-gray-500
            focus:outline-none
            focus:ring-1 focus:ring-blue-500 focus:border-transparent
          '
        />
        <button 
          type="submit"
          className='
            px-4 py-2 
            text-white
            font-semibold
            text-sm
            rounded-lg
            border-0
            bg-gradient-to-r from-blue-600 to-purple-600 
           hover:from-blue-700 hover:to-purple-700
            focus:outline-none
            focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
            transition-colors duration-200
            whitespace-nowrap
          '
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default NewsLetter