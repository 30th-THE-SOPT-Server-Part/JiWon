import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { MovieCommentCreaateDto } from "../interfaces/movie/MovieCommentCreateDto";
import { MovieCommentUpdateDto } from "../interfaces/movie/MovieCommentUpdateDto";
import { MovieCreateDto } from "../interfaces/movie/MovieCreateDto";
import { MovieCommentInfo, MovieInfo } from "../interfaces/movie/MovieInfo";
import { MovieResponseDto } from "../interfaces/movie/MovieResponseDto";
import Movie from "../models/Movie";

const createMovie = async (movieCreateDto: MovieCreateDto) :Promise<PostBaseResponseDto>=> {
    try{
        const movie = new Movie(movieCreateDto);
        
        await movie.save();

        const data = {
            _id: movie._id
        };
        return data;

    }catch(error){
        console.log(error);
        throw error;
    }
}

const createMovieComment = async(movieId: string, movieCommentCreaateDto: MovieCommentCreaateDto): Promise<MovieInfo|null> => {
    try{
        const movie =await Movie.findById(movieId);
        if(!movie) return null;

        const newComments: MovieCommentInfo[] = [...movie.comments, movieCommentCreaateDto];

        const updatedMovie = await Movie.findOneAndUpdate({_id: movieId}, {comments: newComments}, {new : true});
        //new : true => 업데이트가 된 값을 리턴한다. 없으면 이전 값을 내보냄
        if(!updatedMovie) return null;

        return updatedMovie;
    
    }catch(error){
        console.log(error);
        throw error;
    }
}

const getMovie = async(movieId:string): Promise<MovieResponseDto| null> => {
    try{
        const movie = await Movie.findById(movieId).populate('comments.writer');
        if(!movie) return null;

        return movie;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

const updateMovieComment = async(movieId: string, commentId:string, userId: string, movieCommentUpdateDto:MovieCommentUpdateDto): Promise<MovieInfo | null> => {
    try{
        const movie = await Movie.findById(movieId);
        if(!movie) return null;

        const data = await Movie.findOneAndUpdate(
            { _id: movieId, comments: { $elemMatch: {_id:commentId, writer:userId}}},{ //영화를 찾고, commentId,userId에 해당하는 댓글 찾기
                $set: { //comment를 세팅
                    'comments.$.writer':userId,
                    'comments.$.comment': movieCommentUpdateDto.comment
                }
            },
            {new : true}
        );

        return data;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export default {
    createMovie,
    createMovieComment,
    getMovie,
    updateMovieComment
}