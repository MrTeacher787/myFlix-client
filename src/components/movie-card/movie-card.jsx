// Import PropTypes
import PropTypes from "prop-types";

// BookCard function component
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

// Defined all props constraints for the BookCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    director: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};