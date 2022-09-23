import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://vinted-api-laetitia-goncalves.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      if (response.data.token) {
        setUser(response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="container login-page">
      <h1>Se connecter</h1>
      <form onSubmit={handleLogin}>
        <h2>Email</h2>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="marie@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <h2>Mot de passe</h2>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="****"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="submit"
          value="Se connecter"
          className="submitinput-login"
        />
      </form>
    </div>
  );
};

export default Login;
