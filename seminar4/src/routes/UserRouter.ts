import {Router} from "express";
import { UserController } from "../controllers";
import { body } from "express-validator";

const router: Router = Router();

//route => (/user) => post
router.post('/', [
    body('name', "이름을 입력해주세요").notEmpty(),
    body('phone', "유효한 핸드폰 번호를 입력해주세요").isLength({min:8, max:11}),
    body('email', "유효한 이메일을 입력해주세요").isEmail(),
    body('age', "나이는 숫자로 입력해주세요").isInt()
    //phone, email, age, school
] ,UserController.createUser);
router.put('/:userId',UserController.updateUser);
router.get('/:userId',UserController.findUserById);
router.delete('/:userId',UserController.deleteUser);

export default router;