import React, { useState } from 'react'
import { blog_data, blogCategories } from '../assets/assets'
import BlogCard from './BlogCard';
import useAppContext from '../context/useAppContext';

const BlogList = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const { blogs, input } = useAppContext()

    const filteredBlogs = () => {
        if (input === '') {
            return blogs
        }
        return blogs.filter((blog) => blog.title.toLowerCase().includes(input.toLowerCase()) || 
        blog.category.toLowerCase().includes(input.toLowerCase()))
    }

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
            {/* Categories Section */}
            <div className='mb-8 sm:mb-12'>
                <div className='flex gap-2 sm:gap-3 lg:gap-4 overflow-x-auto pb-4 px-4 sm:px-0 snap-x snap-mandatory touch-pan-x justify-start lg:justify-center scrollbar-hide'>
                    {blogCategories.map((item) => (
                        <button
                            key={item}
                            onClick={() => setActiveCategory(item)}
                            className={`
                                relative
                                min-w-max
                                px-4 py-2 sm:px-5 sm:py-2.5
                                rounded-full
                                cursor-pointer 
                                font-medium
                                text-sm sm:text-base
                                transition-all duration-300
                                flex-shrink-0
                                snap-start
                                border border-gray-200
                                whitespace-nowrap
                                ${activeCategory === item
                                    ? 'text-white shadow-lg'
                                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50 hover:border-gray-300'
                                }
                            `}
                            aria-pressed={activeCategory === item}
                            aria-label={`Filter ${item}`}
                        >
                            {activeCategory === item && (
                                <div
                                    className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full -z-10'
                                    aria-hidden='true'
                                />
                            )}
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            {/* Blog Content */}
            <div className='text-center px-2 sm:px-0'>
                <h2 className='text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-3 sm:mb-4'>
                    Blogs in <span className='text-blue-600'>{activeCategory}</span>
                </h2>
                <p className='text-gray-600 text-sm sm:text-base mb-6 sm:mb-8'>
                    {activeCategory === 'All'
                        ? 'Showing all blog posts'
                        : `Filtered by ${activeCategory} category`
                    }
                </p>

                {/* Blog Cards Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'>
                    {filteredBlogs()
                        .filter((blog) => activeCategory === 'All' ? true : blog.category === activeCategory)
                        .map((blog) => (
                            <BlogCard key={blog._id} blog={blog} />
                        ))
                    }
                </div>

                {/* Empty State */}
                {blog_data.filter((blog) => activeCategory === 'All' ? true : blog.category === activeCategory).length === 0 && (
                    <div className='text-center py-12'>
                        <p className='text-gray-500 text-lg'>No blogs found in {activeCategory} category.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BlogList