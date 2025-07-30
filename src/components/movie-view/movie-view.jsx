import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const { movie_id } = useParams();

  const movie = movies.find((m) => m._id === movie_id);
    
  return (
    <div className="name-container">
      <img className="img" src={movie.ImageURL} />                
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
      <Link to={`/`}>
        <button className="button">Back</button>
      </Link>
    </div>
  );
};