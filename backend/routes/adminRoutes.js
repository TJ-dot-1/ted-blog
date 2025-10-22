import express from 'express';
import {
	adminLogin,
	adminRegister,
	getAllComments,
	getAllBlogAdmin,
	deleteCommentById,
	approveCommentById,
	getDashboard,
	deleteBlogById,
	toggleBlogPublish,
	getMe
} from '../controllers/AdminController.js';
import { getAllBlogs } from '../controllers/blogController.js';
import auth from '../middleware/auth.js';

const adminRouter = express.Router();

adminRouter.post('/login', adminLogin);
adminRouter.post('/register', adminRegister);
adminRouter.get('/me', auth, getMe);
adminRouter.get('/comments', auth, getAllComments);
adminRouter.get('/blogs', auth, getAllBlogAdmin);
adminRouter.post('/delete-comment', auth, deleteCommentById);
adminRouter.post('/approve-comment', auth, approveCommentById);

// Dashboard
adminRouter.get('/dashboard', auth, getDashboard);

// Delete blog by id (frontend may call DELETE /api/admin/blogs/:id)
adminRouter.delete('/blogs/:id', auth, (req, res) => {
	// reuse existing controller which expects id in body
	req.body = Object.assign({}, req.body || {}, { id: req.params.id });
	return deleteBlogById(req, res);
});

// Toggle publish status (frontend calls PATCH /api/admin/blogs/:id/toggle-publish)
adminRouter.patch('/blogs/:id/toggle-publish', auth, (req, res) => {
	req.body = Object.assign({}, req.body || {}, { id: req.params.id });
	return toggleBlogPublish(req, res);
});

// Keep legacy delete-comment GET route removed - POST handler above is sufficient

export default adminRouter;