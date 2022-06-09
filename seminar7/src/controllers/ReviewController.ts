import express, {Request, Response} from "express";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import { validationResult } from "express-validator";
import { ReviewCreateDto } from "../interfaces/review/ReviewCreateDto";
import { stat } from "fs";
import ReviewService from "../services/ReviewService";

/**
 * @route POST /review/movies/:movieId
 * @Desc Create Review
 * @Access public 
 */

const createReview = async (req: Request, res: Response) => {
    const error = validationResult(req); //validation 검사
    if(!error.isEmpty()){ //validation error가 발생했으면 오류 메시지 발생
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    }

    const reviewCreateDto: ReviewCreateDto = req.body;
    const {movieId} = req.params;
    try{
        const data = await ReviewService.createReview(movieId, reviewCreateDto);
        
        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED,message.CREATED_REVIEW_SUCCESS,data));
    }catch(error){
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 * @route GET /review/movies/:movieId
 * @Desc Create Review
 * @Access public 
 */
const getReviews = async (req:Request, res:Response) => {
    const {movieId} = req.params;
    const {search} = req.query;

    const page: number = Number(req.query.page|| 1);
    try{
        const data = await ReviewService.getReviews(movieId, search as string, page as number);
        
        res.status(statusCode.OK).send(util.success(statusCode.OK,message.READ_REVIEW_SUCCESS,data));
    }catch(error){
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

export default {
    createReview,
    getReviews
}