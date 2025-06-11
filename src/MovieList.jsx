import { useState, useEffect } from 'react';
import MovieCard from './MovieCard.jsx';
import { use } from 'react';


const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1); //page state variable
    const [visiblePages, setVisiblePages] = useState(6) // start with 6 visible pages
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
    useEffect(() => {
        //runs when compoenent is rendered
            fetchMovies();

    }, []); //empty array to run only once
    //setMovies(prevMovies) => [...prevMovies, newMovies] //for later updates the state with movie data
    useEffect(() => {
        setHasMorePages(visiblePages < movies.length);
    }, [movies, visiblePages]);

    //show 6 more movies at a time
    const handleLoadMore = async () => {
        console.log("Loading more movies");
        setVisiblePages(visiblePages + 6)
    };

    const visibleMovies = movies.slice(0, visiblePages); //slices the array to show only the first 6 movies


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
