import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BlogCard from '../components/BlogCard'
import useAppContext from '../context/useAppContext'

const CategoryPage = () => {
  const { category } = useParams()
  const { blogs, input } = useAppContext()

  const filteredBlogs = () => {
    if (input === '') {
      return blogs
    }
    return blogs.filter((blog) => blog.title.toLowerCase().includes(input.toLowerCase()) ||
    blog.category.toLowerCase().includes(input.toLowerCase()))
  }

  const categoryBlogs = filteredBlogs().filter((blog) => blog.category.toLowerCase() === category.toLowerCase())

  return (
    <>
        <Navbar />
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
            <div className='text-center mb-8'>
                <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4 capitalize'>{category} Blogs</h1>
                <p className='text-gray-600 text-lg'>Discover all our {category} articles</p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'>
                {categoryBlogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                ))}
            </div>

            {categoryBlogs.length === 0 && (
                <div className='text-center py-12'>
                    <p className='text-gray-500 text-lg'>No blogs found in {category} category.</p>
                </div>
            )}
        </div>
        <Footer />
    </>
  )
}

export default CategoryPage