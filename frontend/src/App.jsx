import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Blog from './pages/Blog'
import Home from './pages/Home'
import AllBlogs from './pages/AllBlogs'
import Categories from './pages/Categories'
import AboutUs from './pages/AboutUs'
import Contact from './pages/Contact'
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
import CategoryPage from './pages/CategoryPage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import CookiePolicy from './pages/CookiePolicy'
import 'quill/dist/quill.snow.css';
import {Toaster} from "react-hot-toast"

import useAppContext from './context/useAppContext'

const App = () => {

  const { token, user } = useAppContext()

  return (
    <div className="min-h-screen transition-colors duration-200" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
        <Toaster />
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/blogs" element={<AllBlogs />} />
         <Route path="/categories" element={<Categories />} />
         <Route path="/about" element={<AboutUs />} />
         <Route path="/contact" element={<Contact />} />
         <Route path="/category/:category" element={<CategoryPage />} />
         <Route path="/privacy" element={<PrivacyPolicy />} />
         <Route path="/terms" element={<TermsOfService />} />
         <Route path="/cookies" element={<CookiePolicy />} />
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