import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    // Reference to the admin/user who created the blog
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: false
    },
    isPublished: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;