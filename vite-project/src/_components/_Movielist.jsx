import React, { useEffect, useState } from "react";
import SearchBar from './SearchBar'; 
import MovieCard from './MovieCard';

const _MovieList = () => {
  const [movies, setMovies] = useState([]); // Store fetched movies
  const [filteredMovies, setFilteredMovies] = useState([]); // Store filtered movies
  const [query, setQuery] = useState(''); // Store the search query
  const [selectedMovie, setSelectedMovie] = useState(null); // Store selected movie details

  // Fetch movies from OMDB API based on the query
  useEffect(() => {
    if (query.trim() === '') return; // Don't fetch if query is empty

    const url = `https://www.omdbapi.com/?apikey=fc85b922&s=${encodeURIComponent(query)}&r=json&type=movie&page=1`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched movies:", data);
        setMovies(data.Search || []); // Set movies
        setFilteredMovies(data.Search || []); // Set filtered movies
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, [query]); // Run when query changes

  // Handle search functionality
  const handleSearch = (newQuery) => {
    setQuery(newQuery); // Update the query with user input
  };

  // Handle movie click to fetch detailed information
  const handleMovieClick = (imdbID) => {
    const url = `https://www.omdbapi.com/?apikey=fc85b922&i=${imdbID}&r=json`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("Selected Movie:", data);
        setSelectedMovie(data); // Set the selected movie details
      })
      .catch((error) => console.error("Error fetching movie details:", error));
  };

  return (
    <div>
      <h2>Movie List</h2>
      <SearchBar onSearch={handleSearch} /> {/* Pass the handleSearch function to the SearchBar */}
      
      {filteredMovies.length === 0 ? (
        <p>No movies found</p> // Display message if no movies match the search
      ) : (
        <div className="movie-list">
          {filteredMovies.map((movie) => (
            <div key={movie.imdbID} className="movie-item">
              <MovieCard 
                movie={movie} 
                onClick={() => handleMovieClick(movie.imdbID)} // Trigger handleMovieClick with imdbID
              />
              
              {/* If a movie is selected, display the detailed information next to the movie */}
              {selectedMovie && selectedMovie.imdbID === movie.imdbID && (
                <div className="movie-details">
                  <h2>{selectedMovie.Title}</h2>
                  <p><strong>Year:</strong> {selectedMovie.Year}</p>
                  <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
                  <p><strong>Director:</strong> {selectedMovie.Director}</p>
                  <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
                  <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
                  <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default _MovieList;
