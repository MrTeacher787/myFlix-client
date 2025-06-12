// Importing UseState
import { useState } from "react";

// Importing MovieCard
import { MovieCard } from "../movie-card/movie-card";

// Importing MovieView
import { MovieView } from "../movie-view/movie-view";


export const MainView = () => {
  const [movies, setMovies] = useState([
    {
        id: 1, 
        title: "Enter the Dragon",
        description: "A Shaolin martial artist travels to an island fortress to spy on an opium lord - who is also a former monk from his temple - under the guise of attending a fighting tournament.", 
        genre: "Action", 
        director: "Robert Clouse", 
        actor: "Bruce Lee",
        image: "https://m.media-amazon.com/images/M/MV5BZDAyYjAwNmMtMjM5OC00NTc5LThmNjAtOTUxODQxOWYwOTE5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
    },
    {
        id: 2, 
        title: "Drunken Master",
        description: "Wong Fei-Hung is a mischievous, yet righteous young man, but after a series of incidents, his frustrated father has him disciplined by a master of drunken martial arts.", 
        genre: "Action", 
        director: "Yuen Woo-ping", 
        actor: "Jackie Chan",
        image: "https://i.ebayimg.com/images/g/OPQAAOSwNSxVTlnE/s-l1200.jpg"
    },
    {
        id: 3, 
        title: "Bloodsport",
        description: '"Bloodsport" follows Frank Dux, an American martial artist serving in the military, who decides to leave the army to compete in a martial arts tournament in Hong Kong where fights to the death can occur.', 
        genre: "Action", 
        director: "Newt Arnold", 
        actor: "Jean Claude Van Damme",
        image: "https://m.media-amazon.com/images/M/MV5BMTQwOTgzNjkzMl5BMl5BanBnXkFtZTcwMjgxNDcyNA@@._V1_.jpg"
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

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