import { useState, useEffect } from 'react';

const Modal = ({movie, onClose, genreMap}) => {
    const [trailerKey, setTrailerKey] = useState(null);
    const genres = movie.genre_ids.map(id => genreMap[id]).join(', ');
    
    //this is a function that formats the runtime of each movie
    const runtime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };
    //this is a function that fetches the trailer video of each movie
    useEffect(() => {
        const fetchTrailer = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${import.meta.env.VITE_API_KEY}`
                );
                const data = await response.json();
                const trailer = data.results.find(video => video.type === "Trailer");
                if (trailer) {
                    setTrailerKey(trailer.key);
                }
            } catch (error) {
                console.error("Couldn't fetch trailer: ", error);
            }
        };
        fetchTrailer();
    }, [movie.id]);

    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <button className='close-modal' onClick={onClose}>X</button>
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />

                <h1>{movie.title}</h1>
                <p>Release Date: {movie.release_date}</p>
                <p>Genre: {genres}</p>
                <p>Runtime: {runtime(movie.runtime)}</p>
                <p>Overview: {movie.overview}</p>

                {trailerKey && (
                    <div className="trailer-container" style={{ marginTop: '20px', width: '100%', position: 'relative', paddingBottom: '70%'}}>
                        <iframe
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%'
                            }}
                            src={`https://www.youtube.com/embed/${trailerKey}`}
                            title="Movie Trailer"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
