// src/pages/MoviesPage/MoviesPage.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css";

function MoviesPage() {
const [searchParams, setSearchParams] = useSearchParams();
const [movies, setMovies] = useState([]);
const query = searchParams.get("query") || "";

const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.elements.query.value.trim();
    if (value === "") return;
    setSearchParams({ query: value });
};

useEffect(() => {
    if (!query) return;
    searchMovies(query).then(setMovies).catch(console.error);
}, [query]);

return (
    <div className={styles.container}>
    <form onSubmit={handleSubmit} className={styles.form}>
        <input
        name="query"
        defaultValue={query}
        className={styles.input}
        placeholder="Search movies..."
        autoComplete="off"
        />
        <button type="submit" className={styles.button}>
        Search
        </button>
    </form>
    <MovieList movies={movies} />
    </div>
);
}

export default MoviesPage;



