import express, { Request, Response } from "express";
import { PostCreateDto } from "../interfaces/post/PostCreateDto";
import { PostResponseDto } from "../interfaces/post/PostResponseDto";
import { PostUpdateDto } from "../interfaces/post/PostUpdateDto";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import { PostService } from "../services";


/**
 *  @route POST /user
 *  @desc Create User
 *  @access Public
 */

const createPost = async(req: Request, res: Response) => {
    const post: PostCreateDto = req.body;

    try {
        const data = await PostService.createPost(post);
        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_POST_SUCCESS, data));

    } catch(error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
};


/**
 *  @route PUT /post
 *  @desc Update Post
 *  @access Public
 */

const updatePost = async(req: Request, res: Response) => {
    const post: PostUpdateDto = req.body;
    const { postId } = req.params;
    try{
        await PostService.updatePost(postId, post);

        res.status(statusCode.NO_CONTENT).send(util.success(statusCode.NO_CONTENT, message.UPDATE_POST_SUCCESS));
    } catch(error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 *  @route GET /post
 *  @desc Read Post
 *  @access Public
 */

const findPostById = async(req: Request, res: Response) => {
    const { postId } = req.params;

    try{

        const data: PostResponseDto | null = await PostService.findPostById(postId);
        
        if(!data){
            return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.READ_POST_FAIL));
        }

        res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_POST_SUCCESS, data));

    } catch(error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 *  @route DELETE /post
 *  @desc DELETE Post
 *  @access Public
 */

const deletePost = async(req: Request, res: Response) => {

    const { postId } = req.params;
    try{
        await PostService.deletePost(postId);

        res.status(statusCode.NO_CONTENT).send(util.success(statusCode.NO_CONTENT, message.DELETE_POST_SUCCESS));
    } catch(error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}





export default {
    createPost,
    updatePost,
    findPostById,
    deletePost,

}