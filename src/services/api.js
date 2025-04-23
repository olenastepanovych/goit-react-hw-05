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
