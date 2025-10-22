import React, { useEffect, useState, useCallback } from 'react'
import { assets } from '../../assets/assets'
import BlogTableItem from '../../components/admin/BlogTableItem'
import { useAppContext } from '../../context'
import toast from 'react-hot-toast'

const Dashboard = () => {

    const [dashboardData, setDashboardData] = useState({
        blogs: 0,
        comments: 0,
        drafts: 0,
        recentBlogs: []
    })

    const {axios} = useAppContext();  

    const fetchDashboard = useCallback(async () => {
        try {
          const { data } = await axios.get('/api/admin/dashboard');
          if (data && data.success) {
            setDashboardData({
              blogs: data.stats?.totalBlogs || 0,
              comments: data.stats?.totalComments || 0,
              drafts: data.stats?.drafts || 0,
              recentBlogs: data.recentBlogs || []
            });
          } else {
            toast.error(data?.message || 'Failed to load dashboard');
          }
        } catch (error) {
          console.error('Failed to fetch dashboard data', error);
          toast.error('Failed to load dashboard data.');
        }
    }, [axios]);

    useEffect(() => {
        fetchDashboard();
    }, [fetchDashboard]);

  return (

    <>
        
      {/* Stats Cards with Icons on Top */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        {/* Blogs Card */}
        <div className='bg-white rounded-xl shadow-lg p-6 border border-gray-200 text-center'>
          <div className='flex justify-center mb-4'>
            <div className='p-3 bg-blue-100 rounded-lg'>
              <img src={assets.dashboard_icon_1} alt="Blogs" className='w-8 h-8' />
            </div>
          </div>
          <div>
            <p className='text-3xl font-bold text-gray-900 mb-1'>{dashboardData.blogs}</p>
            <p className='text-gray-600'>Blogs</p>
          </div>
        </div>

        {/* Comments Card */}
        <div className='bg-white rounded-xl shadow-lg p-6 border border-gray-200 text-center'>
          <div className='flex justify-center mb-4'>
            <div className='p-3 bg-green-100 rounded-lg'>
              <img src={assets.dashboard_icon_2} alt="Comments" className='w-8 h-8' />
            </div>
          </div>
          <div>
            <p className='text-3xl font-bold text-gray-900 mb-1'>{dashboardData.comments}</p>
            <p className='text-gray-600'>Comments</p>
          </div>
        </div>

        {/* Drafts Card */}
        <div className='bg-white rounded-xl shadow-lg p-6 border border-gray-200 text-center'>
          <div className='flex justify-center mb-4'>
            <div className='p-3 bg-yellow-100 rounded-lg'>
              <img src={assets.dashboard_icon_3} alt="Drafts" className='w-8 h-8' />
            </div>
          </div>
          <div>
            <p className='text-3xl font-bold text-gray-900 mb-1'>{dashboardData.drafts}</p>
            <p className='text-gray-600'>Drafts</p>
          </div>
        </div>
      </div>

      {/* Recent Blogs Section */}
      <div className='bg-white rounded-xl shadow-lg p-6 border border-gray-200'>
        {/* Header */}
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center'>
            <img src={assets.dashboard_icon_4} alt="Recent Blogs" className='w-6 h-6 mr-3' />
            <h2 className='text-xl font-bold text-gray-900'>Recent Blogs</h2>
          </div>
          <p className='text-sm text-gray-600'>{dashboardData.recentBlogs.length} blogs</p>
        </div>

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
              {dashboardData.recentBlogs && dashboardData.recentBlogs.length > 0 ? (
                dashboardData.recentBlogs.map((blog, index) => (
                  <BlogTableItem 
                    key={blog._id || index} 
                    blog={blog} 
                    index={index + 1}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="5" className='px-4 py-8 text-center text-gray-500'>
                    No recent blogs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Stacked list for small screens */}
        <div className='sm:hidden space-y-4'>
          {dashboardData.recentBlogs && dashboardData.recentBlogs.length > 0 ? (
            dashboardData.recentBlogs.map((blog, index) => (
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
            <div className='text-center text-gray-500 py-8'>No recent blogs found.</div>
          )}
        </div>
      </div>
    
    </>
  )
}

export default Dashboard