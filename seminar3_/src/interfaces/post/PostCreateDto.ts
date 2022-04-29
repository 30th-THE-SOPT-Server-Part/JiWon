import { UserInfo } from "../user/UserInfo";

export interface PostCreateDto {
    title: string;
    content: string;
    category: string;
    author: UserInfo;
    createdAt: Date;
}