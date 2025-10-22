import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Blog from './pages/Blog'
import Home from './pages/Home'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddBlog from './pages/admin/AddBlog'
import ListBlog from './pages/admin/ListBlog'
import Comments from './pages/admin/Comments'
import Login from './components/admin/Login'
import Signup from './components/admin/Signup'
import AuthGuard from './components/guards/AuthGuard'
import RegisteredGuard from './components/guards/RegisteredGuard'
import BlogCards from './pages/BlogCards'
import AddBlogPublic from './pages/AddBlogPublic'
import 'quill/dist/quill.snow.css';
import {Toaster} from "react-hot-toast"

import useAppContext from './context/useAppContext'

const App = () => {

  const { token, user } = useAppContext()

  return (
    <div>
       <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/admin/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blogcards" element={<RegisteredGuard><BlogCards/></RegisteredGuard>} />
        <Route path="/add-blog" element={<AuthGuard><AddBlogPublic/></AuthGuard>} />
        <Route path="/dashboard" element={<RegisteredGuard><Dashboard/></RegisteredGuard>} />
  <Route path="/admin" element={ token && user?.role === 'admin' ? <Layout/> : <Login />}>
           <Route index element={<Dashboard />} />
           <Route path="add-blog" element={<AddBlog />} />
           <Route path="list-blog" element={<ListBlog />} />
           <Route path="comments" element={<Comments/>} />

        </Route>
      </Routes>
    </div>
  )
}

export default App