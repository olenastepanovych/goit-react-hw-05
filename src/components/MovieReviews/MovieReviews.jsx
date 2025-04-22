import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../services/api';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    getMovieReviews(movieId)
      .then(data => {
        setReviews(data.results);
        setError(null);
      })
      .catch(() => setError('Failed to fetch reviews.'));
  }, [movieId]);

  return (
    <div className={styles.reviews}>
      {error && <ErrorMessage message={error} />}
      {reviews.length === 0 && !error ? (
        <p>No reviews available.</p>
      ) : (
        <ul className={styles.list}>
          {reviews.map(({ id, author, content }) => (
            <li key={id} className={styles.item}>
              <h4>{author}</h4>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
