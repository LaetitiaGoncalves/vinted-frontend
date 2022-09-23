import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signup = ({ setUser }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState({});
  const [preview, setPreview] = useState(null);
  const [newsletter, setNewsletter] = useState(false);

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData();
      formData.append("avatar", avatar);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      setErrorMessage("");

      if (email && username && password && avatar) {
      }
      const response = await axios.post(
        "https://vinted-api-laetitia-goncalves.herokuapp.com/user/signup",
        formData
      );
      if (response.data.token) {
        setUser(response.data.token);
        navigate("/");
      }
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMessage("Cet email a déjà un compte ! ");
      }
    }
  };
  return (
    <div className="container signup-page">
      <h1>S'inscrire</h1>
      <form className="signup-form" onSubmit={handleSignup}>
        <h2>Nom d'utilisateur</h2>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Marie"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
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
        <h2>Confirmer le mot de passe</h2>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="****"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {password === confirmPassword ? (
          ""
        ) : (
          <p
            style={{
              fontSize: "12px",
              color: "#aa0000",
              textAlign: "center",
            }}
          >
            Mots de passe différents
          </p>
        )}

        <div className="checkbox">
          <input
            type="checkbox"
            name="subscribe"
            id="subscribe-news"
            value={newsletter}
            onChange={(event) => setNewsletter(event.target.checked)}
          />
          <label>S'inscrire à notre newsletter</label>
        </div>

        <p>
          En m'inscrivant je confirme avoir lu et accepté les Termes et
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </p>
        <div className="addPhoto">
          {avatar ? (
            <>
              <h2>Choisissez votre avatar</h2>
              <input
                type="file"
                onChange={(event) => {
                  setAvatar(event.target.files[0]);
                  setPreview(URL.createObjectURL(event.target.files[0]));
                }}
              />

              <img src={preview} alt="" style={{ width: "50px" }} />
            </>
          ) : (
            <p>No file selected</p>
          )}
        </div>
        <input type="submit" value="S'inscrire" className="signup-input" />

        <p style={{ color: "red" }}>{errorMessage}</p>
      </form>
    </div>
  );
};

export default Signup;
