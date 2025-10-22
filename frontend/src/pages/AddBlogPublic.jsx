import React from 'react'
import AddBlog from './admin/AddBlog'

// Reuse admin AddBlog but wrapped so non-admin logged-in users can access
const AddBlogPublic = () => {
  return <AddBlog />
}

export default AddBlogPublic
