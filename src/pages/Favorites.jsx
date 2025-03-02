import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
  }, []);

  return (
    <div className="favorites-container">
      <h2>Your Favorite Movies</h2>
      <div className="carousel">
        {favorites.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)}
      </div> 
    </div>
  );
};

export default Favorites;
