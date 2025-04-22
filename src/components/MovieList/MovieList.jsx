import { Link, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';

const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';
const DEFAULT_IMG = 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={styles.list}>
      {movies.map(({ id, title, poster_path }) => (
        <li key={id} className={styles.item}>
          <Link to={`/movies/${id}`} state={location}>
            <img
              src={poster_path ? `${BASE_IMG_URL}${poster_path}` : DEFAULT_IMG}
              alt={title}
              width={250}
              height={375}
            />
            <p>{title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
