import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${BASE_URL}&i=${id}&plot=full`);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMovie();
  }, [id]);

  const isFavorite = favorites.some((fav) => fav.imdbID === id);

  const addToFavorites = () => {
    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = () => {
    const updatedFavorites = favorites.filter((fav) => fav.imdbID !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (!movie) return <div className="loading">Loading...</div>;

  return (
    <div className="movie-detail-container">
      <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
      <div className="movie-info">
        <h1>{movie.Title} ({movie.Year})</h1>
        <p><strong>IMDb Rating:</strong> ⭐ {movie.imdbRating}</p>
        <p><strong>Director:</strong> {movie.Director}</p>
        <p><strong>Cast:</strong> {movie.Actors}</p>
        <p><strong>Genre:</strong> {movie.Genre}</p>
        <p><strong>Box Office:</strong> {movie.BoxOffice || "N/A"}</p>
        <p><strong>Runtime:</strong> {movie.Runtime}</p>
        <p><strong>Plot:</strong> {movie.Plot}</p>

        {isFavorite ? (
          <button className="fav-button remove" onClick={removeFromFavorites}>
            ❌ Remove from Favorites
          </button>
        ) : (
          <button className="fav-button add" onClick={addToFavorites}>
            ⭐ Add to Favorites
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;