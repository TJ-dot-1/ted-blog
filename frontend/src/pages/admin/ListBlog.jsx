import React, { useState, useEffect, useCallback } from 'react'
import BlogTableItem from '../../components/admin/BlogTableItem';
import { useAppContext } from '../../context';
import toast from 'react-hot-toast';

const ListBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const {axios} = useAppContext();

    const fetchBlogs = useCallback(async () => {
        try {
            const {data} = await axios.get('/api/admin/blogs');
            if (data && data.success) {
                setBlogs(data.blogs);
            }
        } catch (error) {
            toast.error('Failed to fetch blogs');
            console.error('Error fetching blogs:', error);
        }
    }, [axios]);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

  return (
    <div className='p-6'>
        <h1 className='text-2xl font-bold text-gray-900 mb-6'>All Blogs</h1>
        
        <div className='bg-white rounded-xl shadow-lg p-6 border border-gray-200'>
            {/* Table for medium+ screens */}
            <div className='hidden sm:block overflow-x-auto'>
                <table className='w-full'>
                    <thead className='bg-gray-50'>
                    <tr>
                        <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>#</th>
                        <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Blog Title</th>
                        <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Date</th>
                        <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                        <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                    </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {blogs && blogs.length > 0 ? (
                            blogs.map((blog, index) => (
                                <BlogTableItem 
                                    key={blog._id || index} 
                                    blog={blog} 
                                    index={index + 1}
                                    fetchBlogs={fetchBlogs}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className='px-4 py-8 text-center text-gray-500'>
                                    No blogs found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Stacked cards for small screens */}
            <div className='sm:hidden space-y-4'>
                {blogs && blogs.length > 0 ? (
                    blogs.map((blog, index) => (
                        <div key={blog._id || index} className='bg-white rounded-lg shadow p-4 border border-gray-200'>
                            <div className='flex items-start justify-between'>
                                <div>
                                    <p className='text-sm text-gray-500'>#{index + 1}</p>
                                    <h3 className='text-md font-medium text-gray-900'>{blog.title}</h3>
                                    <p className='text-sm text-gray-600 mt-1'>{new Date(blog.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className='text-right'>
                                    <p className={`font-medium ${blog.isPublished ? 'text-green-600' : 'text-red-600'}`}>
                                        {blog.isPublished ? 'Published' : 'Unpublished'}
                                    </p>
                                    <div className='mt-3 flex gap-2 justify-end'>
                                        <button className='text-blue-600 hover:underline text-sm'>Edit</button>
                                        <button className='text-red-600 hover:underline text-sm'>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='text-center text-gray-500 py-8'>No blogs found.</div>
                )}
            </div>
        </div>
    </div>
  )
}

export default ListBlog