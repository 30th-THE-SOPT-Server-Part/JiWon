import { Router } from "express";
import PostController from "../controllers/PostController";

const router: Router = Router();

router.post('/', PostController.createPost);
router.put('/:postId', PostController.updatePost);
router.get('/:postId', PostController.findPostById);
router.delete('/:postId', PostController.deletePost);

export default router;