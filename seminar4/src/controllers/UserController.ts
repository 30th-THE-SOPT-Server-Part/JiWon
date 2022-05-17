import express, {Request, Response} from "express";
import { rmSync } from "fs";
import { userInfo } from "os";
import { UserCreateDto } from "../interfaces/user/UserCreateDto";
import { UserUpdateDto } from "../interfaces/user/UserUpdateDto";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import {UserService} from "../services";
import { validationResult } from "express-validator";


/**
 * @route POST /user
 * @desc Create User
 * @access Public //쿠키, 세션, 토큰 같은 것 사용할 때
 */
const createUser = async (req: Request, res: Response) => { //비동기처리 해주기
    const error = validationResult(req); //validation 검사
    if(!error.isEmpty()){ //validation error가 발생했으면 오류 메시지 발생
        console.log(error);
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    }
    const userCreateDto: UserCreateDto = req.body; //UserCreateDto로 req.body 받아옴

    //async await을 사용하기 때문에 try,catch문을 사용한다.
    try{
        //console.log("Controller IN");

        const data = await UserService.createUser(userCreateDto);
        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_USER_SUCCESS,data));
    }
    catch (error){
        console.log(error);
        //서버 내부에서 오류 발생
        res.status(statusCode.INTERNAL_SERVER_ERROR)
            .json(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }

}

/**
 * @route PUT /user/:userId
 * @desc Update User
 * @access Public //쿠키, 세션, 토큰 같은 것 사용할 때
 */
const updateUser = async (req:Request, res:Response): Promise<void> => {
    const userUpdateDto: UserUpdateDto = req.body;
    const {userId} = req.params;
    console.log("Controller IN");

    try{
        await UserService.updateUser(userId,userUpdateDto);
        res.status(statusCode.NO_CONTENT).send();
    }
    catch(error){
        console.log(error);
        //서버 내부에서 오류 발생
        res.status(statusCode.INTERNAL_SERVER_ERROR)
            .json(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)); 
    }
}

/**
 * @route GET /user/:userId
 * @desc GET User
 * @access Public //쿠키, 세션, 토큰 같은 것 사용할 때
 */
const findUserById = async (req:Request, res:Response)=> {
    const {userId} = req.params;
    console.log("Controller IN");

    try{
        const data = await UserService.findUserById(userId);
        
        if(!data){
            return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
            //return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND,message.NOT_FOUND));
        }
        res.status(statusCode.OK).send(util.success(statusCode.OK,message.READ_USER_SUCCESS,data));
    }
    catch(error) {
        console.log(error);
        //서버 내부에서 오류 발생
        res.status(statusCode.INTERNAL_SERVER_ERROR)
            .json(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)); 
    }
}

/**
 * @route DELETE /user/:userId
 * @desc DELETE User
 * @access Public //쿠키, 세션, 토큰 같은 것 사용할 때
 */
const deleteUser = async (req:Request, res:Response)=>{
    const {userId} = req.params;
    console.log("Controller IN");

    try{
        await UserService.deleteUser(userId);
        res.status(statusCode.NO_CONTENT).send();
    }
    catch(error){
        console.log(error);
        //서버 내부에서 오류 발생
        res.status(statusCode.INTERNAL_SERVER_ERROR)
            .json(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)); 
    }
}

export default {
    createUser,
    updateUser,
    findUserById,
    deleteUser
}