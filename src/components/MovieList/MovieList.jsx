// src/components/MovieList/MovieList.jsx
import { Link, useLocation } from "react-router-dom";
import styles from "./MovieList.module.css";
import { getImageUrl } from "../../services/api";

function MovieList({ movies }) {
const location = useLocation();

return (
    <ul className={styles.list}>
    {movies.map(({ id, title, poster_path }) => (
        <li key={id} className={styles.item}>
        <Link to={`/movies/${id}`} state={{ from: location }}>
            <img
            src={getImageUrl(poster_path)}
            alt={title}
            className={styles.poster}
            />
            <p className={styles.title}>{title}</p>
        </Link>
        </li>
    ))}
    </ul>
);
}

export default MovieList;


