import express, {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import message from "../modules/responseMessage";
import config from "../config";

export default (req: Request, res: Response, next: NextFunction)=> {
    //request-header에서 토큰 받아오기
    const token = req.headers["authorization"]?.split(' ').reverse()[0]; //Bearer토큰만 받아오기 (원래 1에 잇는데 reverse해서 0번으로)

    //토큰이 없을 수도 있음
    if(!token){
        return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED,message.NULL_VALUE_TOKEN));
    }

    //토큰 검증
    try{
        const decoded = jwt.verify(token, config.jwtSecret); //verify
        
        req.body.user = (decoded as any).user;

        next(); //미들웨어 실행 끝나면 다음으로 넘어가게
    }catch(error: any){
        console.log(error);

        if(error.name === 'TokenExpiredError'){
            return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED,message.INVALID_TOKEN));
        }

        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,message.INTERNAL_SERVER_ERROR));
    }
}