
const Modal = ({movie, onClose, genreMap}) => {
    console.log(movie)
    const genres = movie.genre_ids.map(id => genreMap[id]).join(', ');
    //this is a function that formats the runtime of each movie
    const runtime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

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

            </div>
        </div>
    );
};

export default Modal;
