// import axios from "axios";

// const BASE_URL = "https://api.themoviedb.org/3";
// const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
// const TOKEN =
// "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OWQxMmU2Yzk4M2ZkNWUwMzdkNjUzNmUwNDE4NzQ1NiIsIm5iZiI6MTc0NDkxNjM5Ni4zNTUsInN1YiI6IjY4MDE0ZmFjMmU4OTU4ZjBmOTk5NTJhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S5cPSMWX2ziD3Xf3Sc3rX5WHE7NmD8ydNzv_3MTwwU4";

// const axiosInstance = axios.create({
// baseURL: BASE_URL,
// headers: {
//     Authorization: TOKEN,
// },
// });

// export const getTrendingMovies = async () => {
// const { data } = await axiosInstance.get("/trending/movie/day");
// return data.results;
// };

// export const searchMovies = async (query) => {
// const { data } = await axiosInstance.get("/search/movie", {
//     params: {
//     query,
//     include_adult: false,
//     language: "en-US",
//     page: 1,
//     },
// });
// return data.results;
// };

// export const getMovieDetails = async (movieId) => {
// const { data } = await axiosInstance.get(`/movie/${movieId}`);
// return data;
// };

// export const getMovieCredits = async (movieId) => {
// const { data } = await axiosInstance.get(`/movie/${movieId}/credits`);
// return data.cast;
// };

// export const getMovieReviews = async (movieId) => {
// const { data } = await axiosInstance.get(`/movie/${movieId}/reviews`);
// return data.results;
// };

// export const getImageUrl = (path) =>
// path ? `${IMAGE_BASE_URL}${path}` : null;


// src/api.js
// import axios from 'axios';

// const API = axios.create({
// baseURL: 'https://api.themoviedb.org/3',
// headers: {
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OWQxMmU2Yzk4M2ZkNWUwMzdkNjUzNmUwNDE4NzQ1NiIsIm5iZiI6MTc0NDkxNjM5Ni4zNTUsInN1YiI6IjY4MDE0ZmFjMmU4OTU4ZjBmOTk5NTJhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S5cPSMWX2ziD3Xf3Sc3rX5WHE7NmD8ydNzv_3MTwwU4',
// },
// });

// export const getTrendingMovies = () => API.get('/trending/movie/day');
// export const searchMovies = (query) => API.get(`/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);
// export const getMovieDetails = (id) => API.get(`/movie/${id}`);
// export const getMovieCast = (id) => API.get(`/movie/${id}/credits`);
// export const getMovieReviews = (id) => API.get(`/movie/${id}/reviews`);

import axios from 'axios';

const fetchMoviesData = async (endpoint, params = {}) => {
    const url = `https://api.themoviedb.org/3${endpoint}`;

    const options = {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OWQxMmU2Yzk4M2ZkNWUwMzdkNjUzNmUwNDE4NzQ1NiIsIm5iZiI6MTc0NDkxNjM5Ni4zNTUsInN1YiI6IjY4MDE0ZmFjMmU4OTU4ZjBmOTk5NTJhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S5cPSMWX2ziD3Xf3Sc3rX5WHE7NmD8ydNzv_3MTwwU4',
        },
        params: { language: 'en-US', ...params },
    };

    try {
        const response = await axios.get(url, options);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const getTrendingMovies = (page) => {
    return fetchMoviesData('/trending/movie/day', { page });
};

export const searchMovies = (query, page = 1) => {
    return fetchMoviesData('/search/movie', { query, page });
};

export const getMovieDetails = (movie_id) => {
    return fetchMoviesData(`/movie/${movie_id}`);
};

export const getMovieCast = (movie_id) => {
    return fetchMoviesData(`/movie/${movie_id}/credits`);
};

export const getMovieReviews = (movie_id) => {
    return fetchMoviesData(`/movie/${movie_id}/reviews`);
};
