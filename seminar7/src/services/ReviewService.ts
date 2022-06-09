import { ReviewCreateDto } from "../interfaces/review/ReviewCreateDto";
import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto"; 
import Review from "../models/Review";
import { ReviewResponseDto } from "../interfaces/review/ReviewResponseDto";
import { ReviewInfo } from "../interfaces/review/ReviewInfo";
import Movie from "../models/Movie";
import { ReviewsResponseDto } from "../interfaces/review/ReviewsResponseDto";

const createReview = async(movieId: String, reviewCreateDto: ReviewCreateDto): Promise<PostBaseResponseDto> => {
    try{
        const review = new Review({
            title: reviewCreateDto.title,
            content: reviewCreateDto.content,
            writer: reviewCreateDto.writer,
            movie: movieId
        });

        await review.save();

        const data = {
            _id: review._id
        };

        return data;

    }catch(error){
        console.log(error);
        throw error;
    }
}

const getReviews = async(movieId: String, search: string, page:number) : Promise<ReviewsResponseDto> => { 
    const regex = (pattern: string) => new RegExp(`.*${pattern}.*`); //정규표현식을 만들어주는 간단한 함수

    let reviews: ReviewInfo[] = [];
    const perPage: number = 2;

    try{
        const searchRegex: RegExp = regex(search); //정규표현식으로 만들기
        reviews = await Review.find({title: {$regex: searchRegex}})
                            .where('movie').equals(movieId)
                            //.populate('movie').equals(movieId)
                            .populate(['movie','writer']) //POPULATE
                            .sort({createdAt : -1})
                            .skip(perPage * (page-1))
                            .limit(perPage);

        // const reviews = await Review.find({
        //     movie: movieId
        // }).populate('writer', 'name') //write 필드 중에서 name만 가져오자
        //     .populate('movie'); //movie 필드 다 가져오자

        // const data = await Promise.all(reviews.map(async (review: any) => {
        //     const result = {
        //         writer: review.writer.name,
        //         movie: review.movie,
        //         title: review.title,
        //         content: review.content
        //     };
            
        //     return result;
        // })); //배열을 가공해서 새로운 배열 만들기

        // return data;

        const total: number = await Review.countDocuments({movie: movieId}); //필터링하기
        const lastPage: number = Math.ceil(total/perPage);

        const data = {
            reviews,
            lastPage
        }         

        return data;

    }catch(error){ 
        console.log(error);
        throw error;
    }
}


export default {
    createReview,
    getReviews
}