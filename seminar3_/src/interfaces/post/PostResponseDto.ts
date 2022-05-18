import mongoose from "mongoose";
import { PostCreateDto } from "./PostCreateDto";


export interface PostResponseDto extends PostCreateDto {
    _id: mongoose.Schema.Types.ObjectId
}