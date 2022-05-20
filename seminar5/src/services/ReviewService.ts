import { ReviewCreateDto } from "../interfaces/review/ReviewCreateDto";
import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto"; 
import Review from "../models/Review";
import { ReviewResponseDto } from "../interfaces/review/ReviewResponseDto";

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

const getReviews = async(movieId: String) : Promise<ReviewResponseDto[]> => { 
    try{
        const reviews = await Review.find({
            movie: movieId
        }).populate('writer', 'name') //write 필드 중에서 name만 가져오자
            .populate('movie'); //movie 필드 다 가져오자

        const data = await Promise.all(reviews.map(async (review: any) => {
            const result = {
                writer: review.writer.name,
                movie: review.movie,
                title: review.title,
                content: review.content
            };
            
            return result;
        })); //배열을 가공해서 새로운 배열 만들기

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