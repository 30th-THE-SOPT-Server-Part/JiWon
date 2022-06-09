import mongoose from "mongoose";

export interface JwtPayloadInfo {
    user: {
        id: mongoose.Schema.Types.ObjectId //다른것을 담고 싶다면 아래에 추가하기
    }
}