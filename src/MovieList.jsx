import { useState, useEffect } from 'react';
import MovieCard from './MovieCard.jsx';


const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const apiKey = import.meta.env.VITE_API_KEY

    useEffect(() => {
        //runs when compoenent is rendered
        const fetchMovies = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${apiKey}`);

                //check if the response is ok
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                const data = await response.json();

                //updates the state with movie data
                setMovies(data.results);
            } catch (error) {
                console.error("Not fetching movies :(", error);
            }
        };
        fetchMovies();

    }, []); //empty array to run only once

    return (
        <div className='movie-list'>
            <h2>Movie List</h2>
            <ul>
                {movies.map(movie => (
                    <li key={movie.id}>
                        <MovieCard movie={movie} />
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default MovieList
