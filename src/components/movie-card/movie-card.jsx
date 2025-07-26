// Importing PropTypes library
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

// The MovieCard function component
export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <Card onClick={() => onMovieClick(movie)} className="h-100">
        <Card.Img variant="top" src={movie.ImageURL} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
        </Card.Body>
      </Card>
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