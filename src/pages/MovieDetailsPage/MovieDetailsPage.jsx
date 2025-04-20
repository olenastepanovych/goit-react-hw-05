// src/pages/MovieDetailsPage/MovieDetailsPage.jsx
import { useEffect, useRef, useState } from "react";
import {
Link,
Outlet,
useLocation,
useNavigate,
useParams,
NavLink,
} from "react-router-dom";
import {
getMovieDetails,
getImageUrl,
} from "../../services/api";
import styles from "./MovieDetailsPage.module.css";

function MovieDetailsPage() {
const { movieId } = useParams();
const [movie, setMovie] = useState(null);
const location = useLocation();
const navigate = useNavigate();
const backLink = useRef(location.state?.from ?? "/movies");

useEffect(() => {
    getMovieDetails(movieId).then(setMovie).catch(console.error);
}, [movieId]);

if (!movie) return <p>Loading movie...</p>;

const {
    title,
    overview,
    genres,
    poster_path,
    vote_average,
    release_date,
} = movie;

return (
    <div className={styles.container}>
    <button className={styles.back} onClick={() => navigate(backLink.current)}>
        ← Go back
    </button>

    <div className={styles.details}>
        <img
        src={getImageUrl(poster_path)}
        alt={title}
        className={styles.poster}
        />
        <div>
        <h1>{title} ({release_date?.slice(0, 4)})</h1>
          <p>User Score: {Math.round(vote_average * 10)}%</p>
        <h2>Overview</h2>
        <p>{overview}</p>
        <h3>Genres</h3>
        <p>{genres.map((g) => g.name).join(", ")}</p>
        </div>
    </div>

    <div className={styles.links}>
        <NavLink to="cast" className={({ isActive }) => isActive ? styles.active : styles.link}>
        Cast
        </NavLink>
        <NavLink to="reviews" className={({ isActive }) => isActive ? styles.active : styles.link}>
        Reviews
        </NavLink>
    </div>

    <div className={styles.nested}>
        <Outlet />
    </div>
    </div>
);
}

export default MovieDetailsPage;





