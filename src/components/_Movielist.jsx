import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";

const apiKey = "fd3311ecfd2af752b2fea9aad18cbd0b";
const trendingUrl = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`;
const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

const _MovieList = () => {
  const [movies, setMovies] = useState([]); // Store fetched movies
  const [filteredMovies, setFilteredMovies] = useState([]); // Store filtered movies
  const [genres, setGenres] = useState([]); // Store movie genres
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [selectedGenre, setSelectedGenre] = useState(""); // Selected genre
  const [selectedYear, setSelectedYear] = useState(""); // Selected year

  // Fetch trending movies & genres on page load
  useEffect(() => {
    fetch(trendingUrl)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results || []);
        setFilteredMovies(data.results || []);
      })
      .catch((error) => console.error("Error fetching movies:", error));

    fetch(genreUrl)
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.genres || []);
      })
      .catch((error) => console.error("Error fetching genres:", error));
  }, []);

  // Fetch movies based on search, genre, or year
  const searchMovies = async () => {
    let searchUrl;

    if (searchQuery) {
      // If searching by title
      searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`;
      if (selectedYear) {
        searchUrl += `&primary_release_year=${selectedYear}`;
      }
    } else if (selectedGenre) {
      // If searching only by genre
      searchUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenre}`;
      if (selectedYear) {
        searchUrl += `&primary_release_year=${selectedYear}`;
      }
    } else {
      // If nothing is entered, fetch trending again
      searchUrl = trendingUrl;
    }

    try {
      const response = await fetch(searchUrl);
      const data = await response.json();
      setFilteredMovies(data.results || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSearch = (query) => {
    const filtered = movies.filter((movie) => {
      const movieTitle = movie.title || ""; // Default to empty string if title is undefined
      const searchQuery = query || ""; // Default to empty string if query is undefined

      return movieTitle.toLowerCase().includes(searchQuery.toLowerCase());
    });

    setFilteredMovies(filtered);
  };

  return (
    <div>
      <h2>Search Movies</h2>
      <div>
        <input
          type="text"
          placeholder="Search by title (optional)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select onChange={(e) => setSelectedGenre(e.target.value)}>
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Year (optional)"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        />
        <button onClick={searchMovies}>Search</button>
      </div>

      {filteredMovies.length === 0 ? (
        <p>No movies found</p>
      ) : (
        filteredMovies.map((movie) => (
          <div key={movie.id}>
            <h3>{movie.title}</h3>
            <p>Release Date: {movie.release_date || "N/A"}</p>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default _MovieList;
