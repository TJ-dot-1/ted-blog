import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { blogCategories } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Categories = () => {
  const navigate = useNavigate()

  return (
    <>
        <Navbar />
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
            <div className='text-center mb-8'>
                <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>Blog Categories</h1>
                <p className='text-gray-600 text-lg'>Explore our blog posts by category</p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {blogCategories.map((category, index) => (
                    <div key={index} className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
                        <h2 className='text-xl font-semibold text-gray-900 mb-2'>{category}</h2>
                        <p className='text-gray-600 mb-4'>Discover insightful articles in the {category} category.</p>
                        <button
                          onClick={() => navigate(`/category/${category.toLowerCase()}`)}
                          className='text-blue-600 hover:text-blue-800 font-medium'
                        >
                          View Blogs →
                        </button>
                    </div>
                ))}
            </div>
        </div>
        <Footer />
    </>
  )
}

export default Categories