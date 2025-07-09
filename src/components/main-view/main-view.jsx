// Importing UseState
import { useState, useEffect } from "react";
// Importing MovieCard
import { MovieCard } from "../movie-card/movie-card";
// Importing MovieView
import { MovieView } from "../movie-view/movie-view";
// Importing LoginView
import { LoginView } from "../login-view/login-view";

const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://kickflix-7d36cfc627dc.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, [token]);

  if (!user) {
    return (
      <LoginView 
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} 
      />
    );
  }

  if (selectedMovie) {
        return (
          <>
            <button 
              onClick={() => {
                setUser(null);
                setToken(null);
              }}
            >
              Logout
            </button>
            <MovieView 
              movie={selectedMovie} 
              onBackClick={() => setSelectedMovie(null)}
             />
          </>
        );
    }

  if (movies.length === 0) {
    return (
      <>
            <button 
              onClick={() => {
                setUser(null);
                setToken(null);
              }}
            >
              Logout
            </button>
            <div>The list is empty!</div>
      </>
    );
  }
  
  return (
    <div className="name-container">
      <button 
        onClick={() => {
          setUser(null);
          setToken(null);
        }}
      >
        Logout
      </button>
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