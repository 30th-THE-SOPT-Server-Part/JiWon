import { UserInfo } from "../user/UserInfo";

export interface PostUpdateDto {
    title?: string;
    content?: string;
    category?: string;
    author?: UserInfo;
    createdAt?: Date;
}