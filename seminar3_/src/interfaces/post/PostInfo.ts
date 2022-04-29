import { UserInfo } from "../user/UserInfo";


export interface PostInfo {
    title: string;
    content: string;
    category: string;
    author: UserInfo;
    createdAt: Date;
}