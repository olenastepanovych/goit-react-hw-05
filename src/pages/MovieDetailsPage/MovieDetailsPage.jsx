import { Suspense, useEffect, useRef, useState } from 'react';
import {
Link,
Outlet,
useParams,
useNavigate,
useLocation,
} from 'react-router-dom';
import { getMovieDetails } from '../../App';
import styles from './MovieDetailsPage.module.css';

function MovieDetailsPage() {
const { movieId } = useParams();
const [movie, setMovie] = useState(null);
const location = useLocation();
const backLinkRef = useRef(location.state?.from || '/movies');
const navigate = useNavigate();

useEffect(() => {
    getMovieDetails(movieId).then(setMovie).catch(console.error);
}, [movieId]);

if (!movie) return <div>Loading...</div>;

const { title, overview, poster_path, genres, vote_average } = movie;

return (
    <div className={styles.container}>
    <button onClick={() => navigate(backLinkRef.current)} className={styles.back}>
        Go back
    </button>
    <div className={styles.details}>
        {poster_path && (
        <img
            src={`https://image.tmdb.org/t/p/w300${poster_path}`}
            alt={title}
            className={styles.poster}
        />
        )}
        <div>
        <h2>{title}</h2>
          <p>User score: {Math.round(vote_average * 10)}%</p>
        <h3>Overview</h3>
        <p>{overview}</p>
        <h3>Genres</h3>
        <p>{genres.map(g => g.name).join(', ')}</p>
        </div>
    </div>

    <div className={styles.links}>
        <h3>Additional information</h3>
        <ul>
        <li><Link to="cast">Cast</Link></li>
        <li><Link to="reviews">Reviews</Link></li>
        </ul>
    </div>

    <Suspense fallback={<div>Loading nested route...</div>}>
        <Outlet />
    </Suspense>
    </div>
);
}

export default MovieDetailsPage;

