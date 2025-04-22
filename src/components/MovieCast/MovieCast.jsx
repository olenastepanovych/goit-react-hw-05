import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast } from '../../services/api';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './MovieCast.module.css';

const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';
const DEFAULT_IMG = 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    getMovieCast(movieId)
      .then(data => {
        setCast(data.cast);
        setError(null);
      })
      .catch(() => setError('Failed to fetch cast.'));
  }, [movieId]);

  return (
    <div className={styles.cast}>
      {error && <ErrorMessage message={error} />}
      {cast.length === 0 && !error ? (
        <p>No cast information available.</p>
      ) : (
        <ul className={styles.list}>
          {cast.map(({ id, profile_path, name, character }) => (
            <li key={id} className={styles.item}>
              <img
                src={profile_path ? `${BASE_IMG_URL}${profile_path}` : DEFAULT_IMG}
                alt={name}
                width={100}
                className={styles.img}
              />
              <h3 className={styles.name}>{name}</h3>
              <p className={styles.character}> Character: {character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
