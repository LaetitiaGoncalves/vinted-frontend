import { Link, useNavigate } from "react-router-dom";
import logo from "../img/logo.svg";

const Header = ({ token, setUser }) => {
  const navigate = useNavigate();
  return (
    <header>
      <div className="top-header">
        <img src={logo} alt="logo Vinted" />
        {token === null ? (
          <>
            <button>
              <Link to="/login">Se connecter</Link>
            </button>
            <button>
              <Link to="/signup">S'inscrire'</Link>
            </button>
            <button>Vends maintenant</button>
          </>
        ) : (
          <button
            onClick={() => {
              setUser(null);
              navigate("/");
            }}
          >
            Se déconnecter
          </button>
        )}
      </div>
      <div className="bottom-header">
        <ul>
          <li>
            <button>Femmes</button>
          </li>
          <li>
            <button>Hommes</button>
          </li>
          <li>
            <button>Enfants</button>
          </li>
          <li>
            <button>Maison</button>
          </li>
          <li>
            <button>Divertissement</button>
          </li>
          <li>
            <button>Animaux</button>
          </li>
          <li>
            <button>À propos</button>
          </li>
          <li>
            <button>Notre plateforme</button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
