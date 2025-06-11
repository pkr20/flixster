const MovieCard = ({movie}) => {
    return(
        <div className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title}></img>
            <h2>{movie.title}</h2>
            <h3>{movie.vote_average}</h3>
        </div>
    )
}
export default MovieCard
