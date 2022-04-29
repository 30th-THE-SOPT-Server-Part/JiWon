import mongoose from "mongoose";
import { PostInfo } from "../interfaces/post/PostInfo";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default : Date.now
    }

},{timestamps:true});

export default mongoose.model<PostInfo & mongoose.Document>("Post", PostSchema);