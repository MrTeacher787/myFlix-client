// Importing PropTypes library
import PropTypes from "prop-types";

// The MovieCard function component
export const MovieCard = ({ movie, onMovieClick, key }) => {
  console.log(movie)
    return (
      <div 
        className="border"
        onClick={() => {
            onMovieClick(movie);
        }}
        key = { key }
      >
        {movie.Title}
      </div>
    );
};

// All props constraints for the MovieCard defined
MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Director: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};