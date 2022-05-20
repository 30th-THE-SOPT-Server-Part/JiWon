import express, {Request, Response} from "express";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import { validationResult } from "express-validator";
import { MovieCreateDto } from "../interfaces/movie/MovieCreateDto";
import MovieService from "../services/MovieService";
import { stat } from "fs";

/**
 * @route POST /movie
 * @Desc Create Movie
 * @Access public 
 */

const createMovie = async (req:Request, res: Response) => {
    const error = validationResult(req); //validation 검사
    if(!error.isEmpty()){ //validation error가 발생했으면 오류 메시지 발생
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    }

    const movieCreateDto: MovieCreateDto = req.body;

    try{
        const data = await MovieService.createMovie(movieCreateDto);
        
        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED,message.CREATED_MOVIE_SUCCESS,data));

    }catch(error){
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

export default{
    createMovie
}