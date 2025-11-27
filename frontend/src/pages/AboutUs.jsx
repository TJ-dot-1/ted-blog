import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const AboutUs = () => {
  return (
    <>
        <Navbar />
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
            <div className='text-center mb-8'>
                <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>About Us</h1>
                <p className='text-gray-600 text-lg'>Learn more about our blog and mission</p>
            </div>
            <div className='prose prose-lg max-w-none'>
                <p className='text-gray-700 leading-relaxed mb-6'>
                    Welcome to our blog! We are passionate about sharing knowledge, insights, and stories that inspire and educate our readers.
                </p>
                <p className='text-gray-700 leading-relaxed mb-6'>
                    Our team consists of experienced writers and experts who are dedicated to providing high-quality content across various topics including technology, lifestyle, business, and more.
                </p>
                <p className='text-gray-700 leading-relaxed mb-6'>
                    Our mission is to create a platform where ideas can flourish, discussions can thrive, and learning never stops. We believe in the power of words to connect people and drive positive change.
                </p>
                <div className='bg-blue-50 p-6 rounded-lg mt-8'>
                    <h2 className='text-2xl font-semibold text-gray-900 mb-4'>Our Values</h2>
                    <ul className='list-disc list-inside text-gray-700 space-y-2'>
                        <li>Quality content that matters</li>
                        <li>Authenticity and transparency</li>
                        <li>Continuous learning and improvement</li>
                        <li>Community engagement</li>
                    </ul>
                </div>
            </div>
        </div>
        <Footer />
    </>
  )
}

export default AboutUs