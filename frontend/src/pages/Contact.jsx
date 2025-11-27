import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import toast from 'react-hot-toast'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully!')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setLoading(false)
    }, 1000)
  }

  return (
    <>
        <Navbar />
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
            <div className='text-center mb-8'>
                <h1 className='text-3xl sm:text-4xl font-bold mb-4' style={{ color: 'var(--text-color)' }}>Contact Us</h1>
                <p className='text-lg' style={{ color: 'var(--text-color)', opacity: 0.8 }}>Get in touch with us</p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                {/* Contact Information */}
                <div>
                    <h2 className='text-2xl font-semibold mb-6' style={{ color: 'var(--text-color)' }}>Get In Touch</h2>
                    <div className='space-y-4'>
                        <div className='flex items-center'>
                            <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4'>
                                <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                                </svg>
                            </div>
                            <div>
                                <p className='font-medium' style={{ color: 'var(--text-color)' }}>Email</p>
                                <p style={{ color: 'var(--text-color)', opacity: 0.8 }}>tedblog@gmail.com</p>
                            </div>
                        </div>
                        <div className='flex items-center'>
                            <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4'>
                                <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
                                </svg>
                            </div>
                            <div>
                                <p className='font-medium' style={{ color: 'var(--text-color)' }}>Phone</p>
                                <p style={{ color: 'var(--text-color)', opacity: 0.8 }}>+254 706667129</p>
                            </div>
                        </div>
                        <div className='flex items-center'>
                            <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4'>
                                <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                                </svg>
                            </div>
                            <div>
                                <p className='font-medium' style={{ color: 'var(--text-color)' }}>Address</p>
                                <p style={{ color: 'var(--text-color)', opacity: 0.8 }}>123 Blog Street, City, State 12345</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div>
                    <h2 className='text-2xl font-semibold mb-6' style={{ color: 'var(--text-color)' }}>Send us a Message</h2>
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        <div>
                            <label htmlFor='name' className='block text-sm font-medium mb-1' style={{ color: 'var(--text-color)', opacity: 0.9 }}>Name</label>
                            <input
                                type='text'
                                id='name'
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-bg)', color: 'var(--text-color)' }}
                            />
                        </div>
                        <div>
                            <label htmlFor='email' className='block text-sm font-medium mb-1' style={{ color: 'var(--text-color)', opacity: 0.9 }}>Email</label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-bg)', color: 'var(--text-color)' }}
                            />
                        </div>
                        <div>
                            <label htmlFor='subject' className='block text-sm font-medium mb-1' style={{ color: 'var(--text-color)', opacity: 0.9 }}>Subject</label>
                            <input
                                type='text'
                                id='subject'
                                name='subject'
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-bg)', color: 'var(--text-color)' }}
                            />
                        </div>
                        <div>
                            <label htmlFor='message' className='block text-sm font-medium mb-1' style={{ color: 'var(--text-color)', opacity: 0.9 }}>Message</label>
                            <textarea
                                id='message'
                                name='message'
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-bg)', color: 'var(--text-color)' }}
                            ></textarea>
                        </div>
                        <button
                            type='submit'
                            disabled={loading}
                            className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
                        >
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
        <Footer />
    </>
  )
}

export default Contact