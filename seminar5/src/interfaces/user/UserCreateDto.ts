import { SchoolInfo } from "../school/SchoolInfo";

export interface UserCreateDto {
    name: string;
    email: string;
    phone: string;
    password: string;
    age?: number;
    school?: SchoolInfo;
}