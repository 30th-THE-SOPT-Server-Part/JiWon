import mongoose from "mongoose";
import config from "../config";
import Movie from "../models/Movie";
import Review from "../models/Review";

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoURI); //.env에 적어둔 connect URI로 연결

        mongoose.set('autoCreate', true); //서버 실행 시 자동 Collection 생성

        console.log("Mongoose Connected ...");

        //서버 실행 시 동시에 빈 콜렉션 자동으로 생성해주기
        Movie.createCollection().then(function(collection) {
            console.log("Movie Collection Created");
        });

        Review.createCollection().then(function(collection) {
            console.log("Review Collection Created");
        });

    } catch (err: any) {
        console.error(err.message);
        process.exit(1);
    }
};

export default connectDB;