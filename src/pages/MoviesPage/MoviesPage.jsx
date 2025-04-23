import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../services/api';
import SearchForm from '../../components/SearchForm/SearchForm';
import MovieList from '../../components/MovieList/MovieList';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);

  const query = searchParams.get('query') || '';

  const handleSubmit = (value) => {
    setSearchParams({ query: value });
  };

  useEffect(() => {
    if (!query) return;

    searchMovies(query)
      .then(data => {
        setMovies(data.results);
        setError(null);
      })
      .catch(() => setError('Failed to fetch movies.'));
  }, [query]);

  return (
    <main className={styles.container}>
      <SearchForm onSubmit={handleSubmit} />
      {error && <ErrorMessage message={error} />}
      <MovieList movies={movies} />
    </main>
  );
};

export default MoviesPage;
