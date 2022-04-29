import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { PostCreateDto } from "../interfaces/post/PostCreateDto";
import { PostResponseByUserDto } from "../interfaces/post/PostResponseByUserDto";
import { PostResponseDto } from "../interfaces/post/PostResponseDto";
import { PostUpdateDto } from "../interfaces/post/PostUpdateDto";
import Post from "../models/Post";

const createPost = async(postCreateDto: PostCreateDto): Promise<PostBaseResponseDto> => {
    
    try {
        const post = new Post({ 
            title: postCreateDto.title,
            content: postCreateDto.content,
            category: postCreateDto.category,
            author: postCreateDto.author,
            createdAt: postCreateDto.createdAt
        });
        await post.save()
        
        const data = {
            _id: post.id
        }
        return data
    } catch(error) {
        console.log(error);
        throw error;
    }
}

const updatePost = async(postId: string, postUpdateDto: PostUpdateDto) => {

    try {
        await Post.findByIdAndUpdate(postId, postUpdateDto);
    } catch(error) {
        console.log(error);
        throw error;
    }
}

const findPostById = async(userId: string): Promise<PostResponseDto | null> => {
    try {
        const data: PostResponseDto | null = await Post.findById(userId);

        
        if(!data) {
            return null    
        } else {
            return data        
        }
    
    } catch(error) {
        console.log(error);
        throw error;
    }
}

const deletePost = async(userId: string) => {
    try {
        await Post.findByIdAndDelete(userId);
    } catch(error) {
        console.log(error);
        throw error;
    }
}


export default {
    createPost,
    updatePost,
    findPostById,
    deletePost,
}