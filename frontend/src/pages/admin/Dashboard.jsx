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
        <div className='rounded-xl shadow-lg p-6 border text-center transition-colors duration-200' style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-bg)' }}>
          <div className='flex justify-center mb-4'>
            <div className='p-3 bg-blue-100 rounded-lg'>
              <img src={assets.dashboard_icon_1} alt="Blogs" className='w-8 h-8' />
            </div>
          </div>
          <div>
            <p className='text-3xl font-bold mb-1' style={{ color: 'var(--text-color)' }}>{dashboardData.blogs}</p>
            <p style={{ color: 'var(--text-color)', opacity: 0.8 }}>Blogs</p>
          </div>
        </div>

        {/* Comments Card */}
        <div className='rounded-xl shadow-lg p-6 border text-center transition-colors duration-200' style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-bg)' }}>
          <div className='flex justify-center mb-4'>
            <div className='p-3 bg-green-100 rounded-lg'>
              <img src={assets.dashboard_icon_2} alt="Comments" className='w-8 h-8' />
            </div>
          </div>
          <div>
            <p className='text-3xl font-bold mb-1' style={{ color: 'var(--text-color)' }}>{dashboardData.comments}</p>
            <p style={{ color: 'var(--text-color)', opacity: 0.8 }}>Comments</p>
          </div>
        </div>

        {/* Drafts Card */}
        <div className='rounded-xl shadow-lg p-6 border text-center transition-colors duration-200' style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-bg)' }}>
          <div className='flex justify-center mb-4'>
            <div className='p-3 bg-yellow-100 rounded-lg'>
              <img src={assets.dashboard_icon_3} alt="Drafts" className='w-8 h-8' />
            </div>
          </div>
          <div>
            <p className='text-3xl font-bold mb-1' style={{ color: 'var(--text-color)' }}>{dashboardData.drafts}</p>
            <p style={{ color: 'var(--text-color)', opacity: 0.8 }}>Drafts</p>
          </div>
        </div>
      </div>

      {/* Recent Blogs Section */}
      <div className='rounded-xl shadow-lg p-6 border transition-colors duration-200' style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-bg)' }}>
        {/* Header */}
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center'>
            <img src={assets.dashboard_icon_4} alt="Recent Blogs" className='w-6 h-6 mr-3' />
            <h2 className='text-xl font-bold' style={{ color: 'var(--text-color)' }}>Recent Blogs</h2>
          </div>
          <p className='text-sm' style={{ color: 'var(--text-color)', opacity: 0.8 }}>{dashboardData.recentBlogs.length} blogs</p>
        </div>

        {/* Table for medium+ screens */}
        <div className='hidden sm:block overflow-x-auto'>
          <table className='w-full'>
            <thead style={{ backgroundColor: 'var(--card-bg)' }}>
              <tr>
                <th className='px-4 py-3 text-left text-xs font-medium uppercase tracking-wider' style={{ color: 'var(--text-color)', opacity: 0.7 }}>#</th>
                <th className='px-4 py-3 text-left text-xs font-medium uppercase tracking-wider' style={{ color: 'var(--text-color)', opacity: 0.7 }}>Blog Title</th>
                <th className='px-4 py-3 text-left text-xs font-medium uppercase tracking-wider' style={{ color: 'var(--text-color)', opacity: 0.7 }}>Date</th>
                <th className='px-4 py-3 text-left text-xs font-medium uppercase tracking-wider' style={{ color: 'var(--text-color)', opacity: 0.7 }}>Status</th>
                <th className='px-4 py-3 text-left text-xs font-medium uppercase tracking-wider' style={{ color: 'var(--text-color)', opacity: 0.7 }}>Actions</th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: 'var(--card-bg)' }}>
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
                  <td colSpan="5" className='px-4 py-8 text-center' style={{ color: 'var(--text-color)', opacity: 0.6 }}>
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
              <div key={blog._id || index} className='rounded-lg shadow p-4 border transition-colors duration-200' style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-bg)' }}>
                <div className='flex items-start justify-between'>
                  <div>
                    <p className='text-sm' style={{ color: 'var(--text-color)', opacity: 0.6 }}>#{index + 1}</p>
                    <h3 className='text-md font-medium' style={{ color: 'var(--text-color)' }}>{blog.title}</h3>
                    <p className='text-sm mt-1' style={{ color: 'var(--text-color)', opacity: 0.8 }}>{new Date(blog.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className='text-right'>
                    <p className={`font-medium ${blog.isPublished ? 'text-green-600' : 'text-red-600'}`}>
                      {blog.isPublished ? 'Published' : 'Unpublished'}
                    </p>
                    <div className='mt-3 flex gap-2 justify-end'>
                      <button className='hover:underline text-sm' style={{ color: '#2563eb' }}>Edit</button>
                      <button className='hover:underline text-sm' style={{ color: '#dc2626' }}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='text-center py-8' style={{ color: 'var(--text-color)', opacity: 0.6 }}>No recent blogs found.</div>
          )}
        </div>
      </div>
    
    </>
  )
}

export default Dashboard