// src/components/MovieCast/MovieCast.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits, getImageUrl } from "../../services/api";
import styles from "./MovieCast.module.css";

function MovieCast() {
const { movieId } = useParams();
const [cast, setCast] = useState([]);

useEffect(() => {
    getMovieCredits(movieId).then(setCast).catch(console.error);
}, [movieId]);

if (!cast.length) return <p>No cast info available.</p>;

return (
    <ul className={styles.list}>
    {cast.map(({ cast_id, profile_path, name, character }) => (
        <li key={cast_id} className={styles.item}>
        <img
            src={getImageUrl(profile_path) || "/no-avatar.png"}
            alt={name}
            className={styles.photo}
        />
        <p className={styles.name}>{name}</p>
        <p className={styles.char}>as {character}</p>
        </li>
    ))}
    </ul>
);
}

export default MovieCast;


