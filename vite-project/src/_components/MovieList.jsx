import { useState, useEffect } from "react";
import MovieCard from "./_MovieList"; // Import MovieCard

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=fc85b922"; // Replace with your real key

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []); // Runs once when the component mounts

  const fetchMovies = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (data.Search) {
        setMovies(data.Search);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Movie List</h2>
      {loading ? (
        <p>Loading movies...</p>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieList;
