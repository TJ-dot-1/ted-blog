import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import Navbar from '../components/Navbar';
import Moment from 'moment';
import Footer from '../components/Footer';
import { useAppContext } from '../context';
import toast from 'react-hot-toast';

const Blog = () => {
    const { axios } = useAppContext();
    const { id } = useParams(); 
    const [data, setData] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [newName, setNewName] = useState('');
    const [loading, _setLoading] = useState(false);

    const fetchBlogData = useCallback(async () => {
        try {
            const { data } = await axios.get(`/api/blog/${id}`);
            // API returns `{ success: true, blog: { ... } }`
            if (data && (data.blog || data.success && typeof data === 'object')) {
                setData(data.blog || data);
            } else {
                toast.error('Blog not found');
            }
        } catch (error) {
            console.error('Error fetching blog data:', error);
            toast.error('Failed to load blog');
        }
    }, [id, axios]);

    const fetchComments = useCallback(async () => {
        try {
            const { data } = await axios.get(`/api/blog/${id}/comments`);
            if (data && data.comments) {
                setComments(data.comments);
            } else {
                setComments([]);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
            // Don't show toast for comments error as it might not be critical
        }
    }, [id, axios]);

    const addComment = async (e) => {
    e.preventDefault();
    
    // Check if required fields are filled - use the correct state variable names
    if (!newName.trim() || !newComment.trim()) {
        toast.error('Please fill in both name and comment');
        return;
    }

    try {
        const { data } = await axios.post('/api/blog/add-comment', {
            blogId: id,  // Make sure 'id' is defined (from useParams)
            name: newName.trim(),
            content: newComment.trim()
        });
        
        if (data && data.success) {
            // Clear the form fields using the correct setter functions
            setNewName('');
            setNewComment('');
            toast.success('Comment added successfully');
            
            // Refresh comments to show the new one
            fetchComments();
        } else {
            toast.error(data?.message || 'Failed to add comment');
        }
    } catch (error) {
        console.error('Error adding comment:', error);
        toast.error(error.response?.data?.message || 'Failed to add comment');
    }
};

    useEffect(() => {
        fetchBlogData();
        fetchComments();
    }, [fetchBlogData, fetchComments]);

    return data ? (
        <div className='min-h-screen bg-white'>
            <Navbar />
            
            {/* Blog Header */}
            <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16'>
                {/* Meta Information */}
                <div className='text-center mb-6'>
                    <p className='text-gray-500 text-sm sm:text-base mb-4'>
                        Published on {Moment(data.createdAt).format('MMMM Do YYYY')}
                    </p>
                    
                    {/* Title */}
                    <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight'>
                        {data.title}
                    </h1>
                    
                    {/* Subtitle */}
                    {data.subTitle && (
                        <h2 className='text-xl sm:text-2xl text-gray-600 mb-6 leading-relaxed'>
                            {data.subTitle}
                        </h2>
                    )}
                    
                    {/* Author */}
                    <div className='flex items-center justify-center space-x-3'>
                        <div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
                            <span className='text-white font-semibold text-sm'>TJ</span>
                        </div>
                        <p className='text-gray-700 font-medium'>Ted Josiah</p>
                    </div>
                </div>

                {/* Featured Image */}
                <div className='mb-8 sm:mb-12 lg:mb-16'>
                    <img 
                        src={data.image} 
                        alt={data.title}
                        className='w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-lg'
                    />
                </div>

                {/* Blog Content */}
                <article className='prose prose-lg sm:prose-xl max-w-none mb-16'>
                    <div 
                        className='
                            text-gray-700 
                            leading-relaxed 
                            text-base sm:text-lg
                            [&>p]:mb-6
                            [&>h2]:text-2xl [&>h2]:sm:text-3xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mt-8 [&>h2]:mb-4
                            [&>h3]:text-xl [&>h3]:sm:text-2xl [&>h3]:font-bold [&>h3]:text-gray-900 [&>h3]:mt-6 [&>h3]:mb-3
                            [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-6
                            [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:mb-6
                            [&>li]:mb-2
                            [&>blockquote]:border-l-4 [&>blockquote]:border-blue-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-600 [&>blockquote]:my-6
                            [&>code]:bg-gray-100 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-sm
                            [&>pre]:bg-gray-900 [&>pre]:text-white [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>pre]:my-6
                            [&>img]:rounded-lg [&>img]:shadow-md [&>img]:my-6
                        '
                        dangerouslySetInnerHTML={{__html: data.description}}
                    />
                </article>

                {/* Tags */}
                {data.tags && data.tags.length > 0 && (
                    <div className='mt-12 pt-8 border-t border-gray-200 mb-8'>
                        <div className='flex flex-wrap gap-2'>
                            {data.tags.map((tag, index) => (
                                <span 
                                    key={index}
                                    className='px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium'
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Social Sharing Section */}
                <div className='mt-8 pt-8 border-t border-gray-200 mb-12'>
                    <p className='text-gray-700 font-semibold mb-4'>Share this article</p>
                    <div className='flex flex-wrap gap-3'>
                        {[
                            {
                                name: 'LinkedIn',
                                url: `https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${encodeURIComponent(data.title)}`,
                                icon: assets.linkedin_icon,
                                bgColor: 'bg-[#0077B5] hover:bg-[#00669C]',
                                textColor: 'text-white'
                            },
                            {
                                name: 'WhatsApp',
                                url: `https://wa.me/?text=${encodeURIComponent(data.title + ' ' + window.location.href)}`,
                                icon: assets.whatsapp_icon,
                                bgColor: 'bg-[#25D366] hover:bg-[#20BD59]',
                                textColor: 'text-white'
                            },
                            {
                                name: 'Facebook',
                                url: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
                                icon: assets.facebook_icon,
                                bgColor: 'bg-[#1877F2] hover:bg-[#166FE5]',
                                textColor: 'text-white'
                            },
                            {
                                name: 'Twitter',
                                url: `https://twitter.com/intent/tweet?url=${window.location.href}&text=${encodeURIComponent(data.title)}`,
                                icon: assets.twitter_icon,
                                bgColor: 'bg-[#1DA1F2] hover:bg-[#1A91DA]',
                                textColor: 'text-white'
                            },
                            {
                                name: 'Telegram',
                                url: `https://t.me/share/url?url=${window.location.href}&text=${encodeURIComponent(data.title)}`,
                                icon: assets.telegram_icon,
                                bgColor: 'bg-[#0088CC] hover:bg-[#0077B3]',
                                textColor: 'text-white'
                            }
                        ].map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center space-x-2 px-4 py-3 rounded-lg ${social.bgColor} ${social.textColor} transition-all duration-200 font-medium shadow-sm hover:shadow-md`}
                                title={`Share on ${social.name}`}
                            >
                                <img src={social.icon} alt={social.name} className='w-5 h-5'/>
                                <span className='text-sm font-medium'>{social.name}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Comments Section */}
                <div className='border-t border-gray-200 pt-12'>
                    <h2 className='text-2xl font-bold text-gray-900 mb-8'>
                        Comments ({comments.length})
                    </h2>
                    
                    {/* Comments List */}
                    <div className='space-y-6 mb-12'>
                        {comments.map((comment, index) => (
                            <div key={comment._id || index} className='p-6 border border-gray-200 rounded-lg bg-gray-50'>
                                <div className='flex items-center mb-4'>
                                    <img 
                                        src={assets.user_icon} 
                                        alt="User" 
                                        className='w-10 h-10 rounded-full mr-3'
                                    />
                                    <div>
                                        <span className='font-medium text-gray-800 block'>{comment.name}</span>
                                        <span className='text-gray-500 text-sm'>
                                            {Moment(comment.createdAt || comment.date).fromNow()}
                                        </span>
                                    </div>
                                </div>
                                <p className='text-gray-700 leading-relaxed'>
                                    {comment.content}
                                </p>
                            </div>
                        ))}
                        
                        {comments.length === 0 && (
                            <div className='text-center py-8'>
                                <p className='text-gray-500'>No comments yet. Be the first to comment!</p>
                            </div>
                        )}
                    </div>

                    {/* Add Comment Form */}
                    <div className='bg-white p-6 rounded-lg border border-gray-200'>
                        <h3 className='text-xl font-semibold mb-4 text-gray-900'>Add a Comment</h3>
                        <form onSubmit={addComment}>
                            {/* Name Input */}
                            <input 
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className='w-full border border-gray-300 rounded-lg p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                placeholder='Enter your name'
                                required
                                disabled={loading}
                            />
                            {/* Comment Textarea */}
                            <textarea 
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className='w-full border border-gray-300 rounded-lg p-4 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                rows="4"
                                placeholder='Write your comment here...'
                                required
                                disabled={loading}
                            ></textarea>
                            <button 
                                type='submit'
                                disabled={loading}
                                className={`
                                    px-6 py-3 rounded-lg transition-colors duration-200 font-medium
                                    ${loading 
                                        ? 'bg-gray-400 cursor-not-allowed text-white' 
                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                    }
                                `}
                            >
                                {loading ? (
                                    <div className='flex items-center gap-2'>
                                        <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
                                        Adding Comment...
                                    </div>
                                ) : (
                                    'Submit Comment'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    ) : (
        <div className='min-h-screen bg-white flex items-center justify-center'>
            <div className='text-center'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
                <p className='text-gray-600'>Loading blog post...</p>
            </div>
        </div>
    );    
}

export default Blog