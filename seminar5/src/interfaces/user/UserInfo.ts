import { SchoolInfo } from "../school/SchoolInfo";

export interface UserInfo{
    name: string;
    phone: string;
    email: string;
    password: string;
    age: number;
    school: SchoolInfo; //서브 도큐멘트
}