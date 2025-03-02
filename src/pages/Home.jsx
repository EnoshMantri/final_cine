import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const API_KEY = "f519f527";
const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [theMovies, setTheMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [randomMovies, setRandomMovies] = useState([]);

  useEffect(() => {
    fetchMovies("The", setTheMovies);
    fetchMovies("Avengers", setTrendingMovies);
    fetchMovies("Batman", setRandomMovies);
  }, []);

  const fetchMovies = async (query, setter) => {
    try {
      const response = await axios.get(`${BASE_URL}&s=${query}`);
      if (response.data.Search) {
        setter(response.data.Search);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    fetchMovies(searchQuery, setSearchResults);
  };

  return (
    <div className="home-container">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
        <button type="submit" className="search-button">🔍</button>
      </form>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div>
          <h2>Search Results</h2>
          <div className="carousel">
            {searchResults.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        </div>
      )}

      {/* "The" Movies */}
      <h2></h2>
      <div className="carousel">
        {theMovies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

      {/* Trending Movies */}
      <h2>Trending Now</h2>
      <div className="carousel">
        {trendingMovies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

      {/* Random Movies */}
      <h2>Random Picks</h2>
      <div className="carousel">
        {randomMovies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
