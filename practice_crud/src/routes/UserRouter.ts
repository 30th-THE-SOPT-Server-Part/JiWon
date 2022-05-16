import {Router} from "express";
import { UserController } from "../controllers";

const router: Router = Router();

//route => (/user) => post
router.post('/', UserController.createUser);
router.put('/:userId',UserController.updateUser);
router.get('/:userId',UserController.findUserById);
router.delete('/:userId',UserController.deleteUser);

export default router;