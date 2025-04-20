// src/components/MovieReviews/MovieReviews.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../services/api";
import styles from "./MovieReviews.module.css";

function MovieReviews() {
const { movieId } = useParams();
const [reviews, setReviews] = useState([]);

useEffect(() => {
    getMovieReviews(movieId).then(setReviews).catch(console.error);
}, [movieId]);

if (!reviews.length) return <p>No reviews found.</p>;

return (
    <ul className={styles.list}>
    {reviews.map(({ id, author, content }) => (
        <li key={id} className={styles.item}>
        <h4 className={styles.author}>Author: {author}</h4>
        <p className={styles.content}>{content}</p>
        </li>
    ))}
    </ul>
);
}

export default MovieReviews;


