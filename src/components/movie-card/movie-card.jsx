// Importing PropTypes library
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

// The MovieCard function component
export const MovieCard = ({ movie }) => {
  return (
    <Card>
      <Card.Img variant="top" src={movie.ImageURL} />
      <Card.Body style={{ backgroundColor:"white" }}>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button className="button" variant="link">Open</Button>
        </Link>
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
};