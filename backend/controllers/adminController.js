import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ 
                success: false,
                message: "Email and password are required" 
            });
        }
        
        // Attempt to find admin in DB
        const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
        if (admin) {
            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

            const token = jwt.sign({ id: admin._id, email: admin.email, role: admin.role, isRegistered: admin.isRegistered }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ success: true, message: 'Login successful', token, user: { email: admin.email, role: admin.role, isRegistered: admin.isRegistered } });
        }

        // Fallback to environment admin (legacy)
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email, role: 'admin', id: 'admin', isRegistered: true }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ success: true, message: 'Login successful', token, user: { email, role: 'admin', isRegistered: true } });
        }

        return res.status(401).json({ success: false, message: 'Invalid credentials' });
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false,
            message: "Server error", 
            error: error.message 
        });
    }
};

export const getAllBlogAdmin = async (req, res) => {
    try {
        const isEnvAdmin = req.user && req.user.id === 'admin';
        const query = isEnvAdmin ? {} : { author: req.user?.id };

        const blogs = await Blog.find(query).sort({ createdAt: -1 });
        res.status(200).json({ success: true, blogs });
    } catch (error) {
        console.error('Get All Blogs Admin error:', error);
        res.status(500).json({ 
            success: false,
            message: "Server error", 
            error: error.message 
        });
    }
};

export const getAllComments = async (req, res) => {
    try {
        const isEnvAdmin = req.user && req.user.id === 'admin';

        if (isEnvAdmin) {
            const comments = await Comment.find().sort({ createdAt: -1 });
            return res.status(200).json({ success: true, comments });
        }

        // Find blog ids owned by this admin
        const ownedBlogs = await Blog.find({ author: req.user?.id }).select('_id');
        const blogIds = ownedBlogs.map(b => b._id.toString());

        const comments = await Comment.find({ blogId: { $in: blogIds } }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, comments });
    } catch (error) {
        console.error('Get All Comments error:', error);
        res.status(500).json({ 
            success: false,
            message: "Server error", 
            error: error.message 
        });
    }
};

export const getDashboard = async (req, res) => {
    try {
        // By default, scope dashboard data to the authenticated user (req.user.id).
        // If the user is the special environment admin (id === 'admin'), return global data.
        const isEnvAdmin = req.user && req.user.id === 'admin';

        const blogQuery = isEnvAdmin ? {} : { author: req.user?.id };

        const recentBlogs = await Blog.find(blogQuery).sort({ createdAt: -1 }).limit(5);
        const totalComments = isEnvAdmin ? await Comment.countDocuments() : await Comment.countDocuments({});
        const totalBlogs = await Blog.countDocuments(blogQuery);
        const drafts = await Blog.countDocuments({ ...blogQuery, isPublished: false });
        const published = await Blog.countDocuments({ ...blogQuery, isPublished: true });
        const recentComments = isEnvAdmin ? await Comment.find().sort({ createdAt: -1 }).limit(5) : await Comment.find().sort({ createdAt: -1 }).limit(5);

        const dashboardData = { 
            stats: {
                totalBlogs, 
                drafts, 
                published, 
                totalComments
            },
            recentBlogs,
            recentComments
        };
       
        res.status(200).json({
            success: true,
            ...dashboardData
        }); 
    } catch (error) {
        console.error('Get Dashboard error:', error);
        res.status(500).json({ 
            success: false,
            message: "Server error", 
            error: error.message 
        });
    }
};

export const deleteCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Comment ID is required"
            });
        }

        const comment = await Comment.findById(id);
        if (!comment) return res.status(404).json({ success: false, message: 'Comment not found' });

        const isEnvAdmin = req.user && req.user.id === 'admin';

        // Verify ownership: the comment's blog must be owned by the requester, or requester is env-admin
        const blog = await Blog.findById(comment.blogId);
        if (!blog) return res.status(404).json({ success: false, message: 'Associated blog not found' });

        if (!isEnvAdmin && (!blog.author || blog.author.toString() !== req.user?.id)) {
            return res.status(403).json({ success: false, message: 'Not authorized to delete this comment' });
        }

        await Comment.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Delete Comment By ID error:', error);
        res.status(500).json({ 
            success: false,
            message: "Server error", 
            error: error.message 
        });
    }
};

export const approveCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Comment ID is required"
            });
        }

        const comment = await Comment.findById(id);
        if (!comment) return res.status(404).json({ success: false, message: 'Comment not found' });

        const isEnvAdmin = req.user && req.user.id === 'admin';
        const blog = await Blog.findById(comment.blogId);
        if (!blog) return res.status(404).json({ success: false, message: 'Associated blog not found' });

        if (!isEnvAdmin && (!blog.author || blog.author.toString() !== req.user?.id)) {
            return res.status(403).json({ success: false, message: 'Not authorized to approve this comment' });
        }

        comment.isApproved = true;
        await comment.save();

        res.status(200).json({ success: true, message: 'Comment approved successfully', comment });
    } catch (error) {
        console.error('Approve Comment By ID error:', error);
        res.status(500).json({ 
            success: false,
            message: "Server error", 
            error: error.message 
        });
    }
};

// Additional useful admin functions:

export const toggleBlogPublish = async (req, res) => {
    try {
        const { id } = req.body;
        
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Blog ID is required"
            });
        }

        console.log('toggleBlogPublish called by user:', req.user?.email || req.user || 'unknown', 'id:', id);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.warn('Invalid blog id provided to toggleBlogPublish:', id);
            return res.status(400).json({ success: false, message: 'Invalid blog ID' });
        }

        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

        const isEnvAdmin = req.user && req.user.id === 'admin';
        if (!isEnvAdmin && (!blog.author || blog.author.toString() !== req.user?.id)) {
            return res.status(403).json({ success: false, message: 'Not authorized to toggle this blog' });
        }

        blog.isPublished = !blog.isPublished;
        await blog.save();

        res.status(200).json({
            success: true,
            message: `Blog ${blog.isPublished ? 'published' : 'unpublished'} successfully`,
            blog
        });
    } catch (error) {
        console.error('Toggle Blog Publish error:', error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

export const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.body;
        
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Blog ID is required"
            });
        }

        console.log('deleteBlogById called by user:', req.user?.email || req.user || 'unknown', 'id:', id);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.warn('Invalid blog id provided to deleteBlogById:', id);
            return res.status(400).json({ success: false, message: 'Invalid blog ID' });
        }

        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

        const isEnvAdmin = req.user && req.user.id === 'admin';
        if (!isEnvAdmin && (!blog.author || blog.author.toString() !== req.user?.id)) {
            return res.status(403).json({ success: false, message: 'Not authorized to delete this blog' });
        }

        await Blog.findByIdAndDelete(id);
        // Also delete associated comments
        await Comment.deleteMany({ blogId: id });

        res.status(200).json({ success: true, message: 'Blog and associated comments deleted successfully' });
    } catch (error) {
        console.error('Delete Blog By ID error:', error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

export const adminRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ success: false, message: 'Name, email and password are required' });

        const existing = await Admin.findOne({ email: email.toLowerCase().trim() });
        if (existing) return res.status(400).json({ success: false, message: 'Admin with this email already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        const admin = await Admin.create({ name, email: email.toLowerCase().trim(), password: hashed });

        const token = jwt.sign({ id: admin._id, email: admin.email, role: admin.role, isRegistered: admin.isRegistered }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(201).json({ success: true, message: 'Admin created', token, user: { email: admin.email, name: admin.name, isRegistered: admin.isRegistered } });
    } catch (error) {
        console.error('Admin register error:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

export const getMe = async (req, res) => {
    try {
        const isEnvAdmin = req.user && req.user.id === 'admin';
        if (isEnvAdmin) {
            return res.status(200).json({ success: true, user: { email: process.env.ADMIN_EMAIL, role: 'admin', isRegistered: true } });
        }

        const admin = await Admin.findById(req.user?.id).select('-password');
        if (!admin) return res.status(404).json({ success: false, message: 'User not found' });

        res.status(200).json({ success: true, user: { email: admin.email, name: admin.name, role: admin.role, isRegistered: admin.isRegistered } });
    } catch (error) {
        console.error('Get Me error:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}