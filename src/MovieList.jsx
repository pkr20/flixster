import { useState, useEffect } from 'react';
import MovieCard from './MovieCard.jsx';
import './MovieList.css';
import Modal from './Modal.jsx';

const MovieList = ({ movies: propMovies }) => {
    const [movies, setMovies] = useState([]);
    const [visiblePages, setVisiblePages] = useState(9); // start with 6 visible pages
    const [hasMorePages, setHasMorePages] = useState(true); //for loading more movies
    const [currMovie, setCurrMovie] = useState(null); //for current movie modal
    const [genreMap, setGenreMap] = useState({});//for movie genres [
    const apiKey = import.meta.env.VITE_API_KEY

    

    //for movies modal functionality
    const handleMovieClick = async (movie) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`);
            if (!response.ok) { //error handling
                throw new Error(`HTTP error: ${response.status}`);
            }
            const movieData = await response.json();
                        setCurrMovie({...movie, ...movieData});
        } catch (error) {
            console.error("Not fetching movie :(", error);
            // Fallback to basic movie data if there's an error
            setCurrMovie(movie);
        }
    }
    const handleCloseModal = () => {
        setCurrMovie(null);
    }

    //fetching genres
    const fetchGenres = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=${apiKey}`);
            if (!response.ok) { //error handling
                throw new Error(`HTTP error: ${response.status}`);
            }
            const data = await response.json();

            //create a map of genre ids to names
            const genres = {};
            data.genres.forEach(genre => {
                genres[genre.id] = genre.name;
            });
            setGenreMap(genres);
        }  catch (error) {
            console.error("Not fetching genres :(", error);

        }
    };
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

    //fetch movies and genres if no search results are provided
    useEffect(() => {
        fetchGenres(); // Always fetch genres
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
        <div className='movie-list-container'>
            <h2>Movies</h2>
            <ul className='movie-grid'>
                {visibleMovies.map(movie => (
                    <li key={movie.id} className='movie-item' onClick={() => handleMovieClick(movie)}>
                        <MovieCard movie={movie} />
                    </li>
                ))}
            </ul>
            {hasMorePages ? (<button onClick={handleLoadMore}>Load More</button>) : (<p>No more movies to show</p>)}
            {currMovie && <Modal movie={currMovie} onClose={handleCloseModal} genreMap={genreMap}/>}
        </div>
    );
};

export default MovieList
