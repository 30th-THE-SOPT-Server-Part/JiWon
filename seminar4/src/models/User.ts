import mongoose from "mongoose";
import {UserInfo} from '../interfaces/user/UserInfo';

//interface를 mongoose로 맵핑하는 과정
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    phone:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique: true //유일하게 지정
    },
    age:{
        type: Number
    },
    school:{
        name: {type: String},
        major: {type: String}
    }
});

//export는 mongoose의 model이라는 애로 할 것이고, <이 인터페이스와 document> 타입으로 -> "이름"으로 -> UserSchema를 내보내겠다.
export default mongoose.model<UserInfo & mongoose.Document> ("User",UserSchema);