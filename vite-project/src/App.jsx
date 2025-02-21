import React from 'react';
import "./App.css";
import _MovieList from"./_components/_MovieList";

function App() {
  return (
    <div className="app">
      <h1>Movie Database</h1>
      <_MovieList/>
    </div>
  );
}

export default App;
