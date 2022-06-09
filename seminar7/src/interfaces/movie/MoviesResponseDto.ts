import { MovieInfo } from "./MovieInfo";

export interface MoviesResponseDto{
    movies: MovieInfo[];
    lastPage: number;
}