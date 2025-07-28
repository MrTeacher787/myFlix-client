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
// Importing NavigationBar 
import { NavigationBar } from "../navigation-bar/navigation-bar";
// Importing Row from Bootstrap
import Row from "react-bootstrap/Row";
// Importing Col fromn Bootstrap
import Col from "react-bootstrap/Col";
// Importing app routing from React Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);  
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://kickflix-7d36cfc627dc.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((movies) => {
        const moviesFromApi = movies.map((movie) => {
          return {
            Image: movie.ImageURL ,
            Title: movie.Title,
            Description: movie.Description
          };
        });

        setMovies(moviesFromApi);
      });
  }, []);
  
  return(
    <BrowserRouter>
      <NavigationBar 
        user={user}
        onLoggedOut={() =>{
          setUser(null);
          setToken(null);
          localStorage.clear()
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/users"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
              </>

            }
          />
          <Route
            path="/movies/:movie_id"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The List is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : useBootstrapBreakpoints.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie._id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};