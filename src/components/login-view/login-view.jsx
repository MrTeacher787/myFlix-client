import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    // prevents default behavior of the form
    event.preventDefault();

    const data = {
      Username: username,
      Password: password
    };

    fetch("https://kickflix-7d36cfc627dc.herokuapp.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user.")
        }
      })
      .catch((e) => {
        alert("Something went wrong!");
      });
    };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          minLength="3"
          required
          placeholder="Enter your username"
        />
      </Form.Group>
      
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength="8"
          required
          placeholder="Must have minimum of 8 characters"
        />
      </Form.Group>    
      <Button className="button" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
