//router index file
import { Router } from 'express';
import UserRouter from './UserRouter';
import PostRouter from './PostRouter'
const router = Router();

router.use('/user', UserRouter);
router.use('/post', PostRouter);

export default router;