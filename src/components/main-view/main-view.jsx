// Importing UseState
import { useState, useEffect } from "react";
// Importing MovieCard
import { MovieCard } from "../movie-card/movie-card";
// Importing MovieView
import { MovieView } from "../movie-view/movie-view";
// Importing LoginView
import { LoginView } from "../login-view/login-view";
// Importing SignupView
import { SignupView } from "../signup-view/signup-view";
// Importing Row from Bootstrap
import Row from "react-bootstrap/Row";
// Importing Col fromn Bootstrap
import Col from "react-bootstrap/Col";


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);  
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) return;

    fetch("https://kickflix-7d36cfc627dc.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);

      });
  }, [token]);
  
  return(
    <Row className="justify-content-md-center">
      {!user ? (
        <Col md={4}>
          <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
          }} />
          or
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col md={8}>
          <MovieView 
            style={{ border: "1px solid green "}}
            movie={selectedMovie} 
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          <button 
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          >
            Logout
          </button>
          {movies.map((movie) => (
            <Col className="mb-5" key={movie._id} md={3}>
              <MovieCard 
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>            
          ))}
        </>
      )}
    </Row>
  );
};