import { Router } from "express";
import { FileController } from "../controllers";
import upload from "../config/multer";

const router: Router = Router();

router.post('/upload', upload.single('file'),FileController.uploadFileToS3);
router.post('/upload/multi', upload.array('file',2), FileController.uploadFilesToS3);

export default router;