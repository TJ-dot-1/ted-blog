import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const CookiePolicy = () => {
  return (
    <>
        <Navbar />
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
            <div className='text-center mb-8'>
                <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>Cookie Policy</h1>
                <p className='text-gray-600 text-lg'>How we use cookies and similar technologies</p>
            </div>
            <div className='prose prose-lg max-w-none'>
                <p className='text-gray-700 leading-relaxed mb-6'>
                    Last updated: {new Date().toLocaleDateString()}
                </p>

                <h2 className='text-2xl font-semibold text-gray-900 mb-4'>What Are Cookies</h2>
                <p className='text-gray-700 leading-relaxed mb-6'>
                    Cookies are small text files that are stored on your computer or mobile device when you visit our website. They allow us to remember your preferences and improve your browsing experience.
                </p>

                <h2 className='text-2xl font-semibold text-gray-900 mb-4'>How We Use Cookies</h2>
                <p className='text-gray-700 leading-relaxed mb-6'>
                    We use cookies for various purposes, including to remember your login status, analyze site traffic, and personalize content. Some cookies are essential for the website to function properly.
                </p>

                <h2 className='text-2xl font-semibold text-gray-900 mb-4'>Types of Cookies We Use</h2>
                <ul className='list-disc list-inside text-gray-700 mb-6 space-y-2'>
                    <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
                    <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                    <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
                </ul>

                <h2 className='text-2xl font-semibold text-gray-900 mb-4'>Managing Cookies</h2>
                <p className='text-gray-700 leading-relaxed mb-6'>
                    You can control and manage cookies through your browser settings. Most browsers allow you to refuse cookies or alert you when cookies are being sent. However, disabling certain cookies may affect the functionality of our website.
                </p>

                <h2 className='text-2xl font-semibold text-gray-900 mb-4'>Contact Us</h2>
                <p className='text-gray-700 leading-relaxed mb-6'>
                    If you have any questions about our use of cookies, please contact us at privacy@blog.com.
                </p>
            </div>
        </div>
        <Footer />
    </>
  )
}

export default CookiePolicy