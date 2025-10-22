import React from 'react'
import { useAppContext } from '../../context';
import toast from 'react-hot-toast';

const CommentsTableItem = ({ comment, index, fetchComments }) => {

    const { blog, createdAt, _id } = comment;
    const blogDate = new Date(createdAt);

    const { axios } = useAppContext();

    const approveComment = async () => {
        try {
            // Use correct endpoint and method as defined on the backend
            const { data } = await axios.post('/api/admin/approve-comment', { id: _id });
            if (data && data.success) {
                toast.success('Comment approved successfully');
                if (typeof fetchComments === 'function') fetchComments();
            } else {
                toast.error(data?.message || 'Failed to approve comment');
            }
        } catch (error) {
            toast.error('Failed to approve comment');
            console.error('Error approving comment:', error);
        }
    };

    // If you have a disapprove endpoint, implement it here. For now use deleteComment as fallback.

    const deleteComment = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this comment?');
        if (!confirmed) return;

        try {
            const { data } = await axios.post('/api/admin/delete-comment', { id: _id });
            if (data && data.success) {
                toast.success('Comment deleted successfully');
                if (typeof fetchComments === 'function') fetchComments();
            } else {
                toast.error(data?.message || 'Failed to delete comment');
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
            toast.error(error.response?.data?.message || 'Error deleting comment');
        }
    };
    
  return (
    <tr className="bg-white border-b hover:bg-gray-50">
        <td className="px-4 py-4 font-medium text-gray-900">
            {index}
        </td>
        <td className="px-4 py-4">
            <div className="space-y-2">
                <div>
                    <b>Blog</b>: {blog?.title || 'N/A'}
                </div>
                <div>
                    <b>Comment</b>: {comment.name || 'Anonymous'}
                </div>
                <div>
                    <b>Comment</b>: {comment.content}
                </div>
            </div>
        </td>
        <td className="px-4 py-4 text-gray-700">
            {comment.content}
        </td>
        <td className="px-4 py-4">
            {blogDate.toLocaleDateString()}
        </td>
        <td className="px-4 py-4">
            <p className={`font-medium ${comment.isApproved ? 'text-green-600' : 'text-red-600'}`}>
                {comment.isApproved ? 'Approved' : 'Not Approved'}
            </p>
        </td>
        <td className="px-4 py-4">
            <div className="flex flex-col sm:flex-row gap-2">
                {comment.isApproved ? (
                    <button onClick={deleteComment} className='text-blue-600 hover:underline px-2 py-1 rounded hover:bg-blue-50 transition-colors'>
                        Disapprove
                    </button>
                ) : (
                    <button onClick={approveComment} className='text-blue-600 hover:underline px-2 py-1 rounded hover:bg-blue-50 transition-colors'>
                        Approve
                    </button>
                )}
                <button onClick={deleteComment} className='text-red-600 hover:underline px-2 py-1 rounded hover:bg-red-50 transition-colors'>
                    Delete
                </button>
            </div>
        </td>
    </tr>
  )
}

export default CommentsTableItem