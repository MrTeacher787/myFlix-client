import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div className="name-container">
                <img className="w-100" src={movie.ImageURL} />                
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre.Name}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director.Name}</span>
            </div>
            <div>
                <span>Actor: </span>
                <span>{movie.Actor[0].Name}</span>
            </div>
            <Button 
              onClick={onBackClick}
              className="back-button"
              style={{ cursor: "pointer" }}
            >
              Back
            </Button>
        </div>
    );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Actor: PropTypes.string.isRequired,
    Genre: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Director: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};