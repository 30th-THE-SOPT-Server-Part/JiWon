import mongoose from "mongoose";
import { MovieInfo } from "../interfaces/movie/MovieInfo";

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    director: {
        type: String,
        require: true
    },
    startDate: {
        type: Date
    },
    thumbnail: {
        type: String
    },
    story: {
        type: String
    },
    comments:[{
        writer: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        comment: {
            type: String,
            required: true
        }
    }, { timestamps: true }]
}, { 
    timestamps: true //createdAt, updatedAt
});

export default mongoose.model<MovieInfo & mongoose.Document>("Movie",MovieSchema);