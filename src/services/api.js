// src/services/api.js
import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const TOKEN =
"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OWQxMmU2Yzk4M2ZkNWUwMzdkNjUzNmUwNDE4NzQ1NiIsIm5iZiI6MTc0NDkxNjM5Ni4zNTUsInN1YiI6IjY4MDE0ZmFjMmU4OTU4ZjBmOTk5NTJhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S5cPSMWX2ziD3Xf3Sc3rX5WHE7NmD8ydNzv_3MTwwU4";

const axiosInstance = axios.create({
baseURL: BASE_URL,
headers: {
    Authorization: TOKEN,
},
});

export const getTrendingMovies = async () => {
const { data } = await axiosInstance.get("/trending/movie/day");
return data.results;
};

export const searchMovies = async (query) => {
const { data } = await axiosInstance.get("/search/movie", {
    params: {
    query,
    include_adult: false,
    language: "en-US",
    page: 1,
    },
});
return data.results;
};

export const getMovieDetails = async (movieId) => {
const { data } = await axiosInstance.get(`/movie/${movieId}`);
return data;
};

export const getMovieCredits = async (movieId) => {
const { data } = await axiosInstance.get(`/movie/${movieId}/credits`);
return data.cast;
};

export const getMovieReviews = async (movieId) => {
const { data } = await axiosInstance.get(`/movie/${movieId}/reviews`);
return data.results;
};

export const getImageUrl = (path) =>
path ? `${IMAGE_BASE_URL}${path}` : null;
