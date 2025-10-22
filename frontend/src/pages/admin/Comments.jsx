import React, { useState, useEffect } from 'react'
import CommentsTableItem from '../../components/admin/CommentsTableItem';
import { useAppContext } from '../../context';
import toast from 'react-hot-toast';

const Comments = () => {
    const [comments, setComments] = useState([])
    const [filter, setFilter] = useState('Not Approved')
    const [unauthorized, setUnauthorized] = useState(false);


    const {axios} = useAppContext();

    const fetchComments = React.useCallback(async () => {
        try {
            const { data } = await axios.get('/api/admin/comments');
            if (data && data.success) {
                setComments(data.comments || []);
            } else {
                toast.error(data?.message || 'Failed to fetch comments');
            }
        } catch (error) {
            // If unauthorized or forbidden, show friendly message and clear comments
            const status = error?.response?.status;
            if (status === 401 || status === 403) {
                setComments([]);
                setUnauthorized(true);
                return;
            }

            toast.error('Failed to fetch comments');
            console.error('Error fetching comments:', error);
        }
    }, [axios]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const filterComments = comments.filter(comment => {
        if (filter === "Approved") return comment.isApproved === true;
        return comment.isApproved === false;
    });

    return (
        <div className='p-6'>
            {/* Header Section */}
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4'>
                <h1 className='text-2xl font-bold text-gray-900'>Comments</h1>
                <div className='flex gap-2'>
                    <button 
                        onClick={() => setFilter('Approved')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            filter === 'Approved' 
                                ? 'bg-green-500 text-white' 
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Approved
                    </button>
                    <button 
                        onClick={() => setFilter('Not Approved')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            filter === 'Not Approved' 
                                ? 'bg-red-500 text-white' 
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Not Approved
                    </button> 
                </div>
            </div>

            {/* Table Section */}
            <div className='bg-white rounded-xl shadow-lg p-6 border border-gray-200'>
                {unauthorized ? (
                    <div className='p-8 text-center text-gray-600'>
                        You do not have permission to view comments for other users. Complete your registration to access this section.
                    </div>
                ) : (
                <div className='overflow-x-auto'>
                    <table className='w-full'>
                        <thead className='bg-gray-50'>
                            <tr>
                                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>#</th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Blog Title & Commenter</th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Comment</th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Date</th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                            {filterComments.length > 0 ? (
                                filterComments.map((comment, index) => (
                                    <CommentsTableItem 
                                        key={comment._id || index}
                                        comment={comment} 
                                        index={index + 1} 
                                        fetchComments={fetchComments}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className='px-4 py-8 text-center text-gray-500'>
                                        No {filter.toLowerCase()} comments found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                )}
            </div>
        </div>
    )
}

export default Comments