import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { UserCreateDto } from "../interfaces/user/UserCreateDto";
import { UserUpdateDto } from "../interfaces/user/UserUpdateDto";
import { UserResponseDto } from "../interfaces/user/UserResponseDto";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { UserSigninDto } from "../interfaces/user/UserSigninDto";

const signinUser = async(userSigninDto: UserSigninDto): Promise<PostBaseResponseDto | null | number> => {
    try{
        //이메일로 user를 먼저 찾은 후, 해당 user에 해쉬되어 저장되어 있는 패스워드와 입력된 패스워드를 해쉬 시킨 값이 같은지 비교
        const user = await User.findOne({
            email: userSigninDto.email
        });
        if(!user) return null;

        const isMatch = await bcrypt.compare(userSigninDto.password, user.password);
        if(!isMatch) return 401;

        const data = {
            _id: user._id
        };

        return data;

    } catch(error){
        console.log(error);
        throw error;
    }
}
const createUser = async(userCreateDto: UserCreateDto): Promise<PostBaseResponseDto | null> => { //async 함수는 Promise를 반환해야 한다.
    try{
        //email이 이미 있으면 가입한 유저
        const existUser = await User.findOne({
            email: userCreateDto.email
        });
        if(existUser) return null;


        //dto를 저장할 객체로 변환하는 과정
        console.log("SERVICE IN");
        const user = new User({ 
            name: userCreateDto.name,
            phone: userCreateDto.phone,
            email: userCreateDto.email,
            password: userCreateDto.password,
            age: userCreateDto.age,
            school: {
                name: userCreateDto.school?.name,
                major: userCreateDto.school?.major
            }
        });
        
        //비밀번호 암호화!
        const salt = await bcrypt.genSalt(10); //salt:아주 작은 임의의 랜덤한 텍스트
        user.password = await bcrypt.hash(userCreateDto.password, salt);

        await user.save();

        const data = {
            _id: user.id
        };

        return data;
    } catch(error){
        
        console.log(error);
        throw error;
    }
}

const updateUser = async(userId: string, userUpdateDto: UserUpdateDto) => {
    try{
        //findByIdAndUpdate
        await User.findByIdAndUpdate(userId,userUpdateDto);

    }
    catch(error){
        console.log(error);
        throw error;
    }
}

const findUserById = async(userId:string): Promise<UserResponseDto | null> => {
    try{
        const user = await User.findById(userId);
        if(!user){
            return null;
        }
        return user;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

const deleteUser = async(userId:string) :Promise<void> => {
    try{
        await User.findByIdAndDelete(userId);
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export default {
    signinUser,
    createUser,
    updateUser,
    findUserById,
    deleteUser
}