import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { UserCreateDto } from "../interfaces/user/UserCreateDto";
import { UserResponseDto } from "../interfaces/user/UserResponseDto";
import { UserUpdateDto } from "../interfaces/user/UserUpdateDto";
import Post from "../models/Post";
import User from "../models/User";

const createUser = async(userCreateDto: UserCreateDto): Promise<PostBaseResponseDto> => {

    try{
        const user = new User(userCreateDto);

        await user.save();

        const data: PostBaseResponseDto = {
            _id: user.id
        };

        return data;
    } catch(error) {
        console.log(error);
        throw error;
    }
}

const updateUser = async(userId: string, userUpdateDto: UserUpdateDto) => {

    try {
        await User.findByIdAndUpdate(userId, userUpdateDto);
    } catch(error) {
        console.log(error);
        throw error;
    }
}

const findUserById = async(userId: string): Promise<UserResponseDto | null> => {
    try {
        const user = await User.findById(userId);

        
        if(!user) {
            return null    
        }
    
        const posts = await Post.find({'author': userId});
        const data: UserResponseDto = {
            name: user.name,
            email: user.email,
            age: user.age,
            gender: user.gender,
            _id: user.id,
            posts: posts
        };
        return data        
        
    
    } catch(error) {
        console.log(error);
        throw error;
    }
}

const deleteUser = async(userId: string) => {
    try {
        await User.findByIdAndDelete(userId);
    } catch(error) {
        console.log(error);
        throw error;
    }
}
export default  {
    createUser,
    updateUser,
    findUserById,
    deleteUser
}