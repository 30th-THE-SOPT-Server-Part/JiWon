import { SchoolInfo } from "../school/SchoolInfo";

export interface UserUpdateDto{
    //update니까 들어올 수도 있고 안들어 올수도있음
    name?: string;
    phone?: string;
    email?: string;
    age?: number;
    school?: SchoolInfo;
}