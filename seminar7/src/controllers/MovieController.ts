import express, {Request, Response} from "express";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import { validationResult } from "express-validator";
import { MovieCreateDto } from "../interfaces/movie/MovieCreateDto";
import MovieService from "../services/MovieService";
import { stat } from "fs";
import { MovieCommentCreaateDto } from "../interfaces/movie/MovieCommentCreateDto";
import { MovieCommentUpdateDto } from "../interfaces/movie/MovieCommentUpdateDto";
import { MovieOptionType } from "../interfaces/movie/MovieOptionType";

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

/**
 * @route POST /movie/:movieId/comment
 * @Desc Comment Movie
 * @Access public 
 */
const createMovieComment = async (req:Request, res: Response) => {
    const error = validationResult(req); //validation 검사
    if(!error.isEmpty()){ //validation error가 발생했으면 오류 메시지 발생
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    }

    const movieCommentCreaateDto: MovieCommentCreaateDto = req.body;
    const {movieId} = req.params;

    try{
        const data = await MovieService.createMovieComment(movieId, movieCommentCreaateDto);
        if(!data){
            res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND,message.NOT_FOUND));
        }
        res.status(statusCode.CREATED).send(util.success(statusCode.OK,message.CREATED_MOVIE_COMMENT_SUCCESS,data));
        return data;
    }catch(error){
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 * @route GET /movie/:movieId
 * @Desc Get Movie
 * @Access public 
 */

const getMovie = async (req:Request, res:Response) => {

    const {movieId} = req.params;
    

    try{
        const data = await MovieService.getMovie(movieId);
        if(!data){
            res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND,message.NOT_FOUND));
        }
        res.status(statusCode.OK).send(util.success(statusCode.OK,message.READ_MOVIE_SUCCESS,data));
    }catch(error){
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}


/**
 * @route PUT /movie/:movieId/comment/:commentId
 * @Desc Update Movie Comment
 * @Access Private 
 */
 const updateMovieComment = async(req:Request, res:Response)=>{
    const error = validationResult(req); //validation 검사
    if(!error.isEmpty()){ //validation error가 발생했으면 오류 메시지 발생
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    }

    const movieCommentUpdateDto: MovieCommentUpdateDto = req.body;
    const {movieId, commentId} = req.params;
    const userId = req.body.user.id; //페이로드에서 body에 담아둠

    try{
        const data = await MovieService.updateMovieComment(movieId, commentId, userId, movieCommentUpdateDto);
        if(!data) {
            res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND,message.NOT_FOUND));
        }
        res.status(statusCode.OK).send(util.success(statusCode.OK,message.UPDATE_MOVIE_COMMENT_SUCCESS,data));

    }catch(error){
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
 }
 
 /**
 * @route GET /movie?search=
 * @Desc GET Movie By Search
 * @Access Public 
 */
const getMovieSearch = async (req: Request, res: Response) => {
    const {search} = req.query;

    try{
        const data = await MovieService.getMoviesBySearch(search as string);
        res.status(statusCode.OK).send(util.success(statusCode.OK,message.SEARCH_MOVIE_SUCCESS,data));
    }
    catch(error){
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,message.INTERNAL_SERVER_ERROR));
    }
}

 /**
 * @route GET /movie?search=&option=
 * @Desc GET Movie By Search (Option)
 * @Access Public 
 */
  const getMovieSearchWithOption = async (req: Request, res: Response) => {
    const {search, option} = req.query;

    //Type 가드 만들기
    const isOptionType = (option: string): option is MovieOptionType => { //함수 만들어서 타입인지 확인
        return ["title", 'director', 'title_director'].indexOf(option) !== -1;
    };

    if(!isOptionType(option as string)){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }

    try{
        const data = await MovieService.getMoviesBySearchWithOPtion(search as string, option as MovieOptionType);
        res.status(statusCode.OK).send(util.success(statusCode.OK,message.SEARCH_MOVIE_SUCCESS,data));
    }
    catch(error){
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,message.INTERNAL_SERVER_ERROR));
    }
}

export default{
    createMovie,
    createMovieComment,
    getMovie,
    updateMovieComment,
    getMovieSearch,
    getMovieSearchWithOption
}