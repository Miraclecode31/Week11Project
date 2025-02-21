import React, { useEffect, useState } from "react";

const MovieList = () => {
  const [movies, setMovies] = useState([]); // ✅ Ensure movies is at least an empty array

  useEffect(() => {
    fetch("http://www.omdbapi.com/?i=tt3896198&apikey=fc85b922")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched movies:", data);
        setMovies(data.results || []); // ✅ Ensure we always set an array
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  return (
    <div>
      <h2>Movie List</h2>
      {movies.length === 0 ? ( // ✅ Handle empty state
        <p>Loading movies...</p>
      ) : (
        movies.map((movie) => <div key={movie.id}>{movie.title}</div>)
      )}
    </div>
  );
};

export default MovieList;
