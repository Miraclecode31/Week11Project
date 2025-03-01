// MovieCard.jsx
import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <h3>{movie.original_title}</h3>
      <p>{movie.overview}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.original_title}
      />
    </div>
  );
};

export default MovieCard;
