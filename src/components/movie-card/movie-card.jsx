// Importing PropTypes library
import PropTypes from "prop-types";

// The MovieCard function component
export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <div
        onClick={() => {
            onMovieClick(movie);
        }}
      >
        {movie.title}
      </div>
    );
};

// All props constraints for the MovieCard defined
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    director: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};