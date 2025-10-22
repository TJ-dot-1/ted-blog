import express from 'express';
import {
  addBlog,
  addComment,
  deleteBlogById,
  generateContent,
  getAllBlogs,
  getBlogById,
  getBlogComments,
  togglePublish
} from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';

const blogRouter = express.Router();

// Create blog (admin)
blogRouter.post('/add', upload.single('image'), auth, addBlog);

// Public: get all published blogs
blogRouter.get('/all', getAllBlogs);

// Get single blog by id
blogRouter.get('/:blogId', getBlogById);

// Delete blog by id (admin)
blogRouter.delete('/:id', auth, deleteBlogById);

// Toggle publish (admin compatibility)
blogRouter.post('/toggle-publish', auth, togglePublish);

// Public: add comment to a blog
blogRouter.post('/add-comment', addComment);

// Public: get approved comments for a blog
blogRouter.get('/:blogId/comments', getBlogComments);

// Generate content using Gemini AI
blogRouter.post('/generate', auth, generateContent);

export default blogRouter;