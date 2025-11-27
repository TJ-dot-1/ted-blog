Project Overview

A modern, responsive blogging platform built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring AI-powered content generation, user authentication, and admin dashboard.

Live link: https://ted-blog-5jqu.vercel.app

![MERN](https://img.shields.io/badge/MERN_Stack-0A0A0A?style=for-the-badge&logo=react&logoColor=61DAFB) ![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-4.x+-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-171515?style=for-the-badge&logo=github&logoColor=white)

🚀 Features
Frontend

    Modern UI/UX - Responsive design with Tailwind CSS

    User Authentication - Login/Register with JWT

    Blog Management - Create, read, update, delete blogs

    AI Content Generation - Gemini AI integration for blog content

    Rich Text Editor - Quill.js for blog content creation

    Comment System - User comments on blog posts

    Search & Filter - Find blogs by title, category, or content

    Admin Dashboard - Manage blogs, users, and comments

Backend

    RESTful API - Clean API architecture

    JWT Authentication - Secure user authentication

    File Upload - Image handling with Multer and ImageKit

    AI Integration - Google Gemini AI for content generation

    MongoDB Database - NoSQL database with Mongoose ODM

    Role-based Access - Admin and user permissions

    Comment System - Full CRUD operations for comments

🛠 Tech Stack
Frontend

    React 18 - UI framework

    Vite - Build tool and dev server

    Tailwind CSS - Utility-first CSS framework

    React Router - Client-side routing

    Axios - HTTP client

    React Hot Toast - Notifications

    Quill.js - Rich text editor

    Context API - State management

Backend

    Node.js - Runtime environment

    Express.js - Web framework

    MongoDB - Database

    Mongoose - ODM for MongoDB

    JWT - Authentication tokens

    bcryptjs - Password hashing

    Multer - File upload handling

    ImageKit - Image optimization and CDN

    Google Gemini AI - AI content generation

    CORS - Cross-origin resource sharing

📁 Project Structure
text

blog-platform/
├── backend/
│   ├── configs/
│   │   ├── database.js
│   │   ├── imageKit.js
│   │   └── gemini.js
│   ├── controllers/
│   │   ├── blogController.js
│   │   ├── adminController.js
│   │   └── authController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── multer.js
│   ├── models/
│   │   ├── Blog.js
│   │   ├── User.js
│   │   └── Comment.js
│   ├── routes/
│   │   ├── blogRoutes.js
│   │   ├── adminRoutes.js
│   │   └── authRoutes.js
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── BlogCard.jsx
    │   │   └── Header.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Blog.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── AddBlog.jsx
    │   │   └── Admin/
    │   ├── context/
    │   │   └── AppContext.jsx
    │   ├── assets/
    │   │   └── assets.js
    │   └── App.jsx

🚀 Installation & Setup
Prerequisites

    Node.js (v18 or higher)

    MongoDB (local or Atlas)

    Google Gemini AI API key

    ImageKit account

Backend Setup

    Navigate to backend directory
    bash

cd backend

Install dependencies
bash

npm install

Environment Variables
Create .env file:
env

PORT=5000
MONGODB_URI=mongodb://localhost:27017/blog
JWT_SECRET=your_jwt_secret_key

# Admin Credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123

# ImageKit Configuration
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

# Gemini AI Configuration
GEMINI_API_KEY=your_gemini_api_key

Start the server
bash

npm run dev

Frontend Setup

    Navigate to frontend directory
    bash

cd frontend

Install dependencies
bash

npm install

Environment Variables
Create .env file:
env

VITE_BASE_URL=http://localhost:5000

Start the development server
bash

npm run dev

📚 API Endpoints
Authentication

    POST /api/auth/register - User registration

    POST /api/auth/login - User login

    POST /api/admin/login - Admin login

Blogs

    GET /api/blogs/all - Get all published blogs

    GET /api/blogs/:id - Get single blog by ID

    POST /api/blogs/add - Create new blog (protected)

    DELETE /api/blogs/:id - Delete blog (protected)

    POST /api/blogs/toggle-publish - Toggle publish status (protected)

    POST /api/blogs/generate - Generate AI content (protected)

Comments

    POST /api/blogs/add-comment - Add comment to blog

    GET /api/blogs/:blogId/comments - Get blog comments

Admin

    GET /api/admin/blogs - Get all blogs (admin)

    GET /api/admin/comments - Get all comments (admin)

    GET /api/admin/dashboard - Get dashboard stats (admin)

🎯 Key Features Documentation
AI Content Generation

The platform integrates with Google Gemini AI to help users generate blog content:

    Automatic blog post generation based on title

    SEO-optimized content structure

    HTML formatting with proper headings and lists

    Fallback content when AI is unavailable

Image Management

    Automatic image optimization with ImageKit

    WebP format conversion

    Responsive image sizing

    CDN delivery for fast loading

Rich Text Editor

    Quill.js implementation

    Formatting tools (bold, italic, lists, etc.)

    Image embedding

    Code block support

    Clean HTML output

User Roles

    Admin: Full access to all features, dashboard, user management

    User: Create blogs, comment, view published content

    Guest: View published blogs only

🔒 Security Features

    JWT-based authentication

    Password hashing with bcrypt

    Role-based access control

    Input validation and sanitization

    CORS configuration

    File upload restrictions

📱 Responsive Design

The application is fully responsive and optimized for:

    Desktop computers

    Tablets

    Mobile devices

    Various screen sizes and orientations

🚀 Deployment
Backend Deployment (Example: Railway/Render)

    Set environment variables in deployment platform

    Connect MongoDB database

    Deploy from GitHub repository

Frontend Deployment (Example: Vercel/Netlify)

    Build the project: npm run build

    Set environment variables

    Deploy from GitHub repository

🤝 Contributing

    Fork the repository

    Create a feature branch

    Commit your changes

    Push to the branch

    Create a Pull Request

📄 License

This project is licensed under the MIT License.
🆘 Support

For support and questions:

    Create an issue in the GitHub repository

    Check the documentation

    Review existing issues and discussions

🔮 Future Enhancements

    User profiles and avatars

    Blog categories and tags

    Social sharing integration

    Email notifications

    Advanced search with filters

    Blog scheduling

    Multi-language support

    Progressive Web App (PWA) features

    Dark mode toggle

    Blog export functionality
