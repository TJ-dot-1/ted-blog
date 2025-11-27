import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const PrivacyPolicy = () => {
  return (
    <>
        <Navbar />
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
            <div className='text-center mb-8'>
                <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>Privacy Policy</h1>
                <p className='text-gray-600 text-lg'>How we collect, use, and protect your information</p>
            </div>
            <div className='prose prose-lg max-w-none'>
                <p className='text-gray-700 leading-relaxed mb-6'>
                    Last updated: {new Date().toLocaleDateString()}
                </p>

                <h2 className='text-2xl font-semibold text-gray-900 mb-4'>Information We Collect</h2>
                <p className='text-gray-700 leading-relaxed mb-6'>
                    We collect information you provide directly to us, such as when you create an account, submit comments, or contact us. This may include your name, email address, and any content you submit.
                </p>

                <h2 className='text-2xl font-semibold text-gray-900 mb-4'>How We Use Your Information</h2>
                <p className='text-gray-700 leading-relaxed mb-6'>
                    We use the information we collect to provide, maintain, and improve our services, process transactions, send communications, and ensure the security of our platform.
                </p>

                <h2 className='text-2xl font-semibold text-gray-900 mb-4'>Information Sharing</h2>
                <p className='text-gray-700 leading-relaxed mb-6'>
                    We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
                </p>

                <h2 className='text-2xl font-semibold text-gray-900 mb-4'>Data Security</h2>
                <p className='text-gray-700 leading-relaxed mb-6'>
                    We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>

                <h2 className='text-2xl font-semibold text-gray-900 mb-4'>Contact Us</h2>
                <p className='text-gray-700 leading-relaxed mb-6'>
                    If you have any questions about this Privacy Policy, please contact us at privacy@blog.com.
                </p>
            </div>
        </div>
        <Footer />
    </>
  )
}

export default PrivacyPolicy