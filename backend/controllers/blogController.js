import fs from 'fs';
import imageKit from '../configs/imageKit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import main, { generateTopic } from '../configs/gemini.js';

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
    const imageFile = req.file;

    if (!title || !subTitle || !description || !category || !imageFile) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imageKit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: '/blog_images/'
    });

    const optimizedImageUrl = imageKit.url({
      path: response.filePath,
      transformation: [
        { quality: 'auto' },
        { format: 'webp' },
        { width: '800', height: '600' }
      ]
    });

  const image = optimizedImageUrl;
  const createdBlog = await Blog.create({ title, subTitle, description, category, image, isPublished, author: req.user?.id });

  res.status(201).json({ success: true, message: 'Blog post created successfully', blog: createdBlog });
  } catch (error) {
    console.error('Add Blog error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    console.error('Get All Blogs error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    if (!blogId) return res.status(400).json({ success: false, message: 'Blog ID is required' });
    
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    
    res.status(200).json({ success: true, blog });
  } catch (error) {
    console.error('Get Blog By ID error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ success: false, message: 'Blog ID is required' });

    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

    // Delete associated comments
    await Comment.deleteMany({ blogId: id });

    res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Delete Blog By ID error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ success: false, message: 'Blog ID is required' });

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

    blog.isPublished = !blog.isPublished;
    await blog.save();

    res.status(200).json({ 
      success: true, 
      message: 'Blog updated successfully', 
      blog: { 
        id: blog._id, 
        title: blog.title, 
        isPublished: blog.isPublished 
      } 
    });
  } catch (error) {
    console.error('Toggle Publish error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { blogId, blog, name, content } = req.body;
    const targetBlogId = blogId || blog;
    
    if (!targetBlogId || !name || !content) {
      return res.status(400).json({ success: false, message: 'blogId, name and content are required' });
    }

    const createdComment = await Comment.create({ blogId: targetBlogId, name, content });
    const comments = await Comment.find({ blogId: targetBlogId, isApproved: true }).sort({ createdAt: -1 });

    res.status(200).json({ 
      success: true, 
      message: 'Comment added successfully', 
      comment: createdComment, 
      comments 
    });
  } catch (error) {
    console.error('Add Comment error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.params;
    if (!blogId) return res.status(400).json({ success: false, message: 'Blog ID is required' });
    
    const comments = await Comment.find({ blogId, isApproved: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, comments });
  } catch (error) {
    console.error('Get Blog Comments error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const generateContent = async (req, res) => {
  try {
    const { prompt, topic, seed } = req.body;
    let subject = prompt || topic;

    if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
      // auto-generate a topic if none provided
      subject = await generateTopic(seed || '');
    }

    const content = await main(subject);
    res.status(200).json({ success: true, subject, content });
  } catch (error) {
    console.error('Generate Content error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};