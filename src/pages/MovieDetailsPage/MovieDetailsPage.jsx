import { useEffect, useState, useRef } from 'react';
import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import { getMovieDetails } from '../../services/api';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import styles from './MovieDetailsPage.module.css';

const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';
const DEFAULT_IMG = 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = useRef(location.state ?? '/movies');
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    getMovieDetails(movieId)
      .then(data => {
        setMovie(data);
        setError(null);
      })
      .catch(() => setError('Failed to fetch movie details.'));
  }, [movieId]);

  if (error) return <ErrorMessage message={error} />;
  if (!movie) return null;

  return (
    <main className={styles.container}>
      <Link to={backLink.current}>← Go back</Link>

      <div className={styles.details}>
        <img
          src={movie.poster_path ? `${BASE_IMG_URL}${movie.poster_path}` : DEFAULT_IMG}
          alt={movie.title}
          width={250}
        />
        <div>
          <h2>{movie.title}</h2>
          <p>User score: {Math.round(movie.vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{movie.genres.map(g => g.name).join(', ')}</p>
        </div>
      </div>

      <hr />
      <div>
        <p>Additional information</p>
        <ul>
          <li><Link to="cast">Cast</Link></li>
          <li><Link to="reviews">Reviews</Link></li>
        </ul>
      </div>
      <hr />
      <Outlet />
    </main>
  );
};

export default MovieDetailsPage;