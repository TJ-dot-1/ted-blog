import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const TermsOfService = () => {
  return (
    <>
        <Navbar />
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
            <div className='text-center mb-8'>
                <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>Terms of Service</h1>
                <p className='text-gray-600 text-lg'>Please read these terms carefully before using our service</p>
            </div>
            <div className='prose prose-lg max-w-none'>
                <p className='text-gray-700 leading-relaxed mb-6'>
                    Last updated: {new Date().toLocaleDateString()}
                </p>

                <h2 className='text-2xl font-semibold text-gray-900 mb-4'>Acceptance of Terms</h2>
                <p className='text-gray-700 leading-relaxed mb-6'>
                    By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
                </p>

                <h2 className='text-2xl font-semibold text-gray-900 mb-4'>Use License</h2>
                <p className='text-gray-700 leading-relaxed mb-6'>
                    Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only.
                </p>

                <h2 className='text-2xl font-semibold text-gray-900 mb-4'>User Comments</h2>
                <p className='text-gray-700 leading-relaxed mb-6'>
                    Certain parts of this website offer the opportunity for users to post and exchange opinions, information, material and data. We do not screen, edit, publish or review Comments prior to their appearance on the website.
                </p>

                <h2 className='text-2xl font-semibold text-gray-900 mb-4'>Content Liability</h2>
                <p className='text-gray-700 leading-relaxed mb-6'>
                    We shall have no responsibility or liability for any content appearing on your website. You agree to indemnify and defend us against all claims arising out of or based upon your Comments.
                </p>

                <h2 className='text-2xl font-semibold text-gray-900 mb-4'>Contact Information</h2>
                <p className='text-gray-700 leading-relaxed mb-6'>
                    If you have any questions about these Terms of Service, please contact us at legal@blog.com.
                </p>
            </div>
        </div>
        <Footer />
    </>
  )
}

export default TermsOfService