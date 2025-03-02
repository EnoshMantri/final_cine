import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.imdbID}`}>
        <img src={movie.Poster} alt={movie.Title} />
      </Link>
      <h3>{movie.Title}</h3>
    </div>
  );
};

export default MovieCard;
