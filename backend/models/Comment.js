import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    blogId: {  // Changed from 'blog' to 'blogId'
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    isApproved: {
        type: Boolean,
        default: false,
    }     
}, { timestamps: true });

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;