import mongoose from "mongoose";

export interface MovieInfo{
    title: string;
    director: string;
    startDate: Date;
    tumbnail: string;
    story: string;
    comments: MovieCommentInfo[];
}

export interface MovieCommentInfo {
    writer: mongoose.Types.ObjectId | string;
    comment: string;
}