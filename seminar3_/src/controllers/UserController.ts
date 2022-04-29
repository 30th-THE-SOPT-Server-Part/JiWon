import express, { Request, Response } from "express";
import { UserResponseDto } from "../interfaces/user/UserResponseDto";
import { UserUpdateDto } from "../interfaces/user/UserUpdateDto";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import { UserService } from "../services";

/**
 *  @route POST /user
 *  @desc Create User
 *  @access Public
 */


const createUser = async(req: Request, res: Response) => {
    const user = req.body;
    try {
    const data = await UserService.createUser(user);
    
    res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_USER_SUCCESS, data));

    } catch(error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 *  @route PUT /user
 *  @desc Update User
 *  @access Public
 */

const updateUser = async(req: Request, res: Response) => {
    const user: UserUpdateDto = req.body;
    const { userId } = req.params;
    try{
        await UserService.updateUser(userId, user);

        res.status(statusCode.NO_CONTENT).send(util.success(statusCode.NO_CONTENT, message.UPDATE_USER_SUCCESS));
    } catch(error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 *  @route GET /user
 *  @desc Read User
 *  @access Public
 */

const findUserById = async(req: Request, res: Response) => {
    const { userId } = req.params;

    try{

        const data: UserResponseDto | null = await UserService.findUserById(userId);
        
        if(!data){
            return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.READ_USER_FAIL));
        }
        
        res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_USER_SUCCESS, data));

    } catch(error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 *  @route DELETE /user
 *  @desc DELETE User
 *  @access Public
 */

const deleteUser = async(req: Request, res: Response) => {

    const { userId } = req.params;
    try{
        await UserService.deleteUser(userId);

        res.status(statusCode.NO_CONTENT).send(util.success(statusCode.NO_CONTENT, message.DELETE_USER_SUCCESS));
    } catch(error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

export default {
    createUser,
    updateUser,
    findUserById,
    deleteUser
}