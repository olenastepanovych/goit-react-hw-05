import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getTrendingMovies(page).then(data => {
      setMovies(prev => [...prev, ...data.results]);
    });
  }, [page]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <main className={styles.container}>
      <h1>Trending today</h1>
      <MovieList movies={movies} />

      {movies.length > 0 && (
        <button className={styles.loadBtn} onClick={handleLoadMore}>
          Load more
        </button>
      )}
    </main>
  );
};

export default HomePage;

