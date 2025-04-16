import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../App';

function MovieReviews() {
const { movieId } = useParams();
const [reviews, setReviews] = useState([]);

useEffect(() => {
    getMovieReviews(movieId).then(setReviews).catch(console.error);
}, [movieId]);

return (
    <ul>
    {reviews.length > 0 ? (
        reviews.map(({ id, author, content }) => (
        <li key={id}>
            <h4>{author}</h4>
            <p>{content}</p>
        </li>
        ))
    ) : (
        <p>No reviews available</p>
    )}
    </ul>
);
}

export default MovieReviews;
