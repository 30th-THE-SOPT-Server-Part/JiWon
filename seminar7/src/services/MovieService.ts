import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { MovieCommentCreaateDto } from "../interfaces/movie/MovieCommentCreateDto";
import { MovieCommentUpdateDto } from "../interfaces/movie/MovieCommentUpdateDto";
import { MovieCreateDto } from "../interfaces/movie/MovieCreateDto";
import { MovieCommentInfo, MovieInfo } from "../interfaces/movie/MovieInfo";
import { MovieOptionType } from "../interfaces/movie/MovieOptionType";
import { MovieResponseDto } from "../interfaces/movie/MovieResponseDto";
import { MoviesResponseDto } from "../interfaces/movie/MoviesResponseDto";
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

const getMoviesBySearch = async (search: string) : Promise<MovieInfo[]>=> {
    const regex = (pattern: string) => new RegExp(`.*${pattern}.*`); //정규표현식을 만들어주는 간단한 함수

    try{
        const titleRegex: RegExp = regex(search); //정규표현식으로 만들기

        const movies = await Movie.find({title: {$regex: titleRegex }}); //데이터베이스에서 정규표현식을 사용해서 찾기
        return movies;

    }catch(error){
        console.log(error);
        throw error;
    }
}

const getMoviesBySearchWithOPtion = async (search: string, option: MovieOptionType, page: number) : Promise<MoviesResponseDto>=> {
    const regex = (pattern: string) => new RegExp(`.*${pattern}.*`); //정규표현식을 만들어주는 간단한 함수

    let movies: MovieInfo[] = [];

    //pagenation
    const perPage: number = 2;

    try{
        const titleRegex: RegExp = regex(search); //정규표현식으로 만들기

        //option 마다 검색 따로
        if(option === 'title'){
            //데이터베이스에서 정규표현식을 사용해서 찾기
            movies = await Movie.find({title: {$regex: titleRegex }})
                        .sort({createdAt: -1}) //최신순정렬
                        .skip(perPage * (page-1)) 
                        .limit(perPage);
        }
        else if (option === 'director'){
            movies = await Movie.find({director: {$regex: titleRegex}})
                        .sort({createdAt: -1}) //최신순정렬
                        .skip(perPage * (page-1)) 
                        .limit(perPage);
        }
        else{
            movies = await Movie.find({
                $or: [
                    {title: {$regex: titleRegex}},
                    {director: {$regex: titleRegex}}
                ]
            })
            .sort({createdAt: -1}) //최신순정렬
            .skip(perPage * (page-1)) 
            .limit(perPage);
        }
        
        const total: number = await Movie.countDocuments({}); //총 갯수 가져오기, 안에 filter 달아도 됨
        const lastPage: number = Math.ceil(total/perPage);
        
        const data = {
             movies, 
             lastPage
        }
        return data;

    }catch(error){
        console.log(error);
        throw error;
    }
}

export default {
    createMovie,
    createMovieComment,
    getMovie,
    updateMovieComment,
    getMoviesBySearch,
    getMoviesBySearchWithOPtion
}