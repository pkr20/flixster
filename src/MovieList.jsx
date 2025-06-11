import { useState, useEffect } from 'react';
import MovieCard from './MovieCard.jsx';


const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1); //page state variable
    const [hasMore, setHasMore] = useState(true); //boolean to check if there are more pages to load
    const apiKey = import.meta.env.VITE_API_KEY

    useEffect(() => {
        //runs when compoenent is rendered
        const fetchMovies = async (pageNum) => {
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
        };
        fetchMovies(page); //loading first page on load

    }, []); //empty array to run only once


    const handleLoadMore = async () => {
        const nextPage = page + 1;
        setHasMore(nextPage)
        fetchMovies(nextPage);
    };

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
            {hasMore ? (<button onClick={handleLoadMore}>Load More</button>) : (<p>No more movies to show</p>)}
        </div>
    );
};


export default MovieList
