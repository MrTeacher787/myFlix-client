import{ useState } from "react";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {};

  return (
    <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
    </form>
  );
};