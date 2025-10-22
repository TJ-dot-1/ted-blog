import React from 'react'
import { useAppContext } from '../../context';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const BlogTableItem = ({blog, index, fetchBlogs}) => {
    const { title, createdAt, _id } = blog;
    const blogDate = new Date(createdAt).toLocaleDateString();
    
    const { axios } = useAppContext();
    const navigate = useNavigate();

    const deleteBlog = async () => {
        const confirm = window.confirm('Are you sure you want to delete this blog?');
        if (!confirm) return;
            if (!_id) {
                toast.error('Invalid blog id');
                return;
            }
        
        try {
            const { data } = await axios.delete(`/api/admin/blogs/${_id}`);
            if (data && data.success) {
                toast.success('Blog deleted successfully');
                // Refresh the blogs list
                if (fetchBlogs) {
                    await fetchBlogs();
                }
            } else {
                toast.error(data?.message || 'Failed to delete blog');
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
            toast.error(error.response?.data?.message || 'Error deleting blog');
        }
    }

    const togglePublish = async () => {
        if (!_id) {
            toast.error('Invalid blog id');
            return;
        }
        try {
            const { data } = await axios.patch(`/api/admin/blogs/${_id}/toggle-publish`);
            if (data && data.success) {
                toast.success(`Blog ${data.blog.isPublished ? 'published' : 'unpublished'} successfully`);
                // Refresh the blogs list
                if (fetchBlogs) {
                    await fetchBlogs();
                }
            } else {
                toast.error(data?.message || 'Failed to update blog status');
            }
        } catch (error) {
            console.error('Error updating blog status:', error);
            toast.error(error.response?.data?.message || 'Error updating blog status');
        }
    }

    const editBlog = () => {
        // Navigate to edit page
        navigate(`/admin/edit-blog/${_id}`);
    }

    return (
        <tr className="bg-white border-b hover:bg-gray-50">
            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                {index + 1}
            </td>
            <td className="px-4 py-3 font-medium text-gray-900">
                {title}
            </td>
            <td className="px-4 py-3 text-gray-700">
                {blogDate}
            </td>
            <td className="px-4 py-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    blog.isPublished 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                }`}>
                    {blog.isPublished ? 'Published' : 'Draft'}
                </span>
            </td>
            <td className="px-4 py-3">
                <div className='flex items-center gap-3'>
                    <button 
                        onClick={togglePublish} 
                        className={`text-sm font-medium px-3 py-1 rounded ${
                            blog.isPublished 
                                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                    >
                        {blog.isPublished ? 'Unpublish' : 'Publish'}
                    </button>
                    
                    <button 
                        onClick={deleteBlog} 
                        className='bg-red-100 text-red-700 hover:bg-red-200 text-sm font-medium px-3 py-1 rounded'
                    >
                        Delete
                    </button>

                    <button 
                        onClick={editBlog}
                        className='bg-blue-100 text-blue-700 hover:bg-blue-200 text-sm font-medium px-3 py-1 rounded'
                    >
                        Edit
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default BlogTableItem