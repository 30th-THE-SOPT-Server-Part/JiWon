import mongoose from "mongoose";
import { PostInfo } from "../post/PostInfo";
import { UserCreateDto } from "./UserCreateDto";


export interface UserResponseDto extends UserCreateDto {
    _id: mongoose.Schema.Types.ObjectId;
    posts: PostInfo[];
}