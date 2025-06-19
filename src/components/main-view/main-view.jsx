// Importing UseState
import { useState, useEffect } from "react";
// Importing MovieCard
import { MovieCard } from "../movie-card/movie-card";
// Importing MovieView
import { MovieView } from "../movie-view/movie-view";

const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://kickflix-7d36cfc627dc.herokuapp.com/movies")
    .then((response) => response.json())
    .then((data) => {
      const moviesFromApi = data.map((movie) => {
        return {
          id: movie._id,
          title: movie.Title,
          actor: movie.Actor[0].Name,
          genre: movie.Genre.Name,
          director: movie.Director.Name,
          description: movie.Description,
          image: movie.ImageURL,
        };
      });

      setMovies(moviesFromApi);
    });
  }, []);

  if (selectedMovie) {
        return (
          <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

  if (movies.length === 0) {
    return <div>The list is empty!</div>
  }
  
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard 
          key={movie.id} 
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};

export default MainView;