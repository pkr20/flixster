import { useState, useEffect } from 'react';
import MovieCard from './MovieCard.jsx';

const MovieList = ({ movies: propMovies }) => {
    const [movies, setMovies] = useState([]);
    const [visiblePages, setVisiblePages] = useState(6); // start with 6 visible pages
    const [hasMorePages, setHasMorePages] = useState(true);
    const apiKey = import.meta.env.VITE_API_KEY

    const fetchMovies = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${apiKey}`);
            if (!response.ok) { //error handling
                throw new Error(`HTTP error: ${response.status}`);
            }
            const data = await response.json();

            //updates the state with movie data
            setMovies(data.results);
        } catch (error) {
            console.error("Not fetching movies :(", error);
        }
    }

    //fetch movies if no search results are provided
    useEffect(() => {
        if (!propMovies) {
            fetchMovies();
        }
    }, [propMovies]);

    //use propMovies which are search results if available, otherwise use the fetched movies
    const allMovies = propMovies ? propMovies : movies;

    //get only the visible movies from either search results or fetched movies
    const visibleMovies = allMovies.slice(0, visiblePages);

    //update hasMorePages whenever allMovies or visiblePages changes
    useEffect(() => {
        setHasMorePages(visiblePages < allMovies.length);
    }, [allMovies, visiblePages]);

    //show 6 more movies at a time
    const handleLoadMore = () => {
        console.log("Loading more movies");
        setVisiblePages(visiblePages + 6);
    };

    return (
        <div className='movie-list'>
            <h2>Movie List</h2>
            <ul>
                {visibleMovies.map(movie => (
                    <li key={movie.id}>
                        <MovieCard movie={movie} />
                    </li>
                ))}
            </ul>
            {hasMorePages ? (<button onClick={handleLoadMore}>Load More</button>) : (<p>No more movies to show</p>)}
        </div>
    );
};


export default MovieList
