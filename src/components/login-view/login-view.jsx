import { useState } from "react";

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
      headres: { "Content-Type": "application/json" },
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
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          minLength={5}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
