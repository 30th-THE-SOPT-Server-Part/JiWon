import { Router } from "express";
import { body } from "express-validator/check"; //express 바디에 있는 객체들로 바로 검증을 해주는 애들
import auth from "../middlewares/auth";
import MovieController from "../controllers/MovieController";

const router : Router = Router();

router.post('/', [
    body('title').notEmpty(),
    body('director').notEmpty()
], MovieController.createMovie);

router.post('/:movieId/comment',[
    body('writer').notEmpty(),
    body('comment').notEmpty()
], MovieController.createMovieComment);

router.get('/:movieId', MovieController.getMovie);

router.put('/:movieId/comment/:commentId',[
    body('comment').notEmpty()
], auth, MovieController.updateMovieComment);

export default router;