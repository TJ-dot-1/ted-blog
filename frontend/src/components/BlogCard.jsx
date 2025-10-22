import React from 'react'
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  // Guard: if no blog prop, render nothing (prevents runtime crashes)
  if (!blog) return null;

  // use the correct field name 'description' and provide safe defaults
  const { title = '', description = '', category = '', image = '', _id = '', author = '', date = '' } = blog;

  // Function to strip HTML tags for safe truncation
  const stripHtml = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '');
  };

  const truncatedDescription = stripHtml(description).slice(0, 120) + (stripHtml(description).length > 120 ? '...' : '');

  return (
    <div 
      onClick={() => navigate(`/blog/${_id}`)} 
      className='
        group
        bg-white 
        rounded-2xl 
        overflow-hidden 
        shadow-lg 
        hover:shadow-2xl 
        cursor-pointer 
        transition-all 
        duration-300 
        transform 
        hover:-translate-y-2
        border border-gray-100
        h-full
        flex flex-col
      '
    >
      {/* Image Container */}
      <div className='relative overflow-hidden'>
        <img 
          src={image || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'} 
          alt={title}
          className='
            w-full 
            h-36 sm:h-48 md:h-56 lg:h-64
            object-cover 
            transition-transform 
            duration-500 
            group-hover:scale-110
          '
        />
        {/* Category Badge */}
        <div className='absolute top-4 left-4'>
          <span className='
            px-3 py-1 
            text-xs font-semibold
            bg-white bg-opacity-90 
            text-gray-800 
            rounded-full 
            backdrop-blur-sm
            shadow-sm
          '>
            {category || 'Uncategorized'}
          </span>
        </div>
        {/* Overlay Gradient */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
      </div>

      {/* Content Container */}
      <div className='p-6 flex-1 flex flex-col'>
        {/* Title */}
        <h5 className='
          text-xl lg:text-2xl 
          font-bold 
          text-gray-900 
          mb-3
          line-clamp-2
          group-hover:text-blue-600
          transition-colors duration-300
          leading-tight
        '>
          {title || 'Untitled Blog'}
        </h5>

        {/* Description */}
        <p className='
          text-gray-600 
          text-sm lg:text-base
          mb-4
          line-clamp-3
          flex-1
          leading-relaxed
        '>
          {truncatedDescription}
        </p>

        {/* Footer - Author & Date */}
        <div className='
          flex 
          items-center 
          justify-between 
          pt-4 
          border-t 
          border-gray-100
          mt-auto
        '>
          <div className='flex items-center'>
            <div className='
              w-8 h-8 
              bg-gradient-to-r from-blue-500 to-purple-600 
              rounded-full 
              flex items-center justify-center
              text-white text-xs font-bold
              mr-3
            '>
              {(author || 'A').charAt(0).toUpperCase()}
            </div>
            <span className='text-sm text-gray-700 font-medium'>
              {author || 'Anonymous'}
            </span>
          </div>
          <span className='text-xs text-gray-500'>
            {date || 'Recently'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BlogCard