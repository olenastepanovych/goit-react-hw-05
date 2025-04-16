import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast } from '../../App';

function MovieCast() {
const { movieId } = useParams();
const [cast, setCast] = useState([]);

useEffect(() => {
    getMovieCast(movieId).then(setCast).catch(console.error);
}, [movieId]);

return (
    <ul>
    {cast.map(({ id, name, profile_path, character }) => (
        <li key={id}>
        {profile_path && (
            <img
            src={`https://image.tmdb.org/t/p/w200${profile_path}`}
            alt={name}
            width="100"
            />
        )}
        <p>{name}</p>
        <p>Character: {character}</p>
        </li>
    ))}
    </ul>
);
}

export default MovieCast;
