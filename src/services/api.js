import axios from 'axios';

const TOKEN = 'Bearer YOUR_API_TOKEN_HERE';

const api = axios.create({
baseURL: 'https://api.themoviedb.org/3',
headers: {
    Authorization: TOKEN,
},
});

export const getTrendingMovies = async () => {
const res = await api.get('/trending/movie/day?language=en-US');
return res.data.results;
};

export const searchMovies = async (query) => {
const res = await api.get(`/search/movie?query=${query}&language=en-US&page=1`);
return res.data.results;
};

export const getMovieDetails = async (movieId) => {
const res = await api.get(`/movie/${movieId}?language=en-US`);
return res.data;
};

export const getMovieCast = async (movieId) => {
const res = await api.get(`/movie/${movieId}/credits?language=en-US`);
return res.data.cast;
};

export const getMovieReviews = async (movieId) => {
const res = await api.get(`/movie/${movieId}/reviews?language=en-US`);
return res.data.results;
};
