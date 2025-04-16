import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../../App';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';

function HomePage() {
const [movies, setMovies] = useState([]);

useEffect(() => {
    getTrendingMovies().then(setMovies).catch(console.error);
}, []);

return (
    <div className={styles.container}>
    <h1>Trending today</h1>
    <MovieList movies={movies} />
    </div>
);
}

export default HomePage;

