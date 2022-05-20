//router index file
import { Router } from 'express';
import UserRouter from "./UserRouter";
import ReviewRouter from "./ReviewRouter";
import MovieRouter from "./MovieRouter";

const router: Router = Router();

/**
 * @swagger
 *  tags:    
 *      name: Users
 *      description: 유저 추가,수정,삭제,조회
 */
router.use('/user', UserRouter);

router.use('/review', ReviewRouter);

router.use('/movie', MovieRouter);

export default router;