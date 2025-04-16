import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../App';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

function MoviesPage() {
const [movies, setMovies] = useState([]);
const [searchParams, setSearchParams] = useSearchParams();
const query = searchParams.get('query') || '';

useEffect(() => {
    if (query) {
    searchMovies(query).then(setMovies).catch(console.error);
    }
}, [query]);

const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const value = form.elements.query.value.trim();
    setSearchParams({ query: value });
};

return (
    <div className={styles.container}>
    <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" name="query" defaultValue={query} />
        <button type="submit">Search</button>
    </form>
    <MovieList movies={movies} />
    </div>
);
}

export default MoviesPage;

