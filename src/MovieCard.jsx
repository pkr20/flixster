import { useState } from "react";
//import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isWatched, setIsWatched] = useState(false);

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleWatched = (e) => {
    e.stopPropagation();
    setIsWatched(!isWatched);
  };

  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
      ></img>
      <h2>{movie.title}</h2>
      <h3>Vote Average: {movie.vote_average}</h3>
      <button className={`like-button`} onClick={handleLike}>
        {isLiked ? "❤️" : "🤍"}
      </button>
      <button className="watched-button" onClick={handleWatched}>
        {isWatched ? (
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "24px" }}
          >
            visibility
          </span>
        ) : (
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "24px" }}
          >
            visibility_off
          </span>
        )}
      </button>
    </div>
  );
};

export default MovieCard;
