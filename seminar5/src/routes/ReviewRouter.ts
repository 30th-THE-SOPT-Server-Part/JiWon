import { Router } from "express";
import ReviewController from "../controllers/ReviewController";
import { body } from "express-validator/check"; //express 바디에 있는 객체들로 바로 검증을 해주는 애들

const router : Router = Router();

router.post('/movies/:movieId', [ //컨트롤러로 들어가기 전에 req 값에 대한 검증을 먼저 해준다.
    body("title").notEmpty(),
    body("content").notEmpty(),
    body("writer").notEmpty()
]
, ReviewController.createReview);

router.get('/movies/:movieId', ReviewController.getReviews);

export default router;