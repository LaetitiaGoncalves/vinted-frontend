import { Link } from "react-router-dom";
import logo from "../img/logo.svg";

const Header = () => {
  return (
    <header>
      <div className="top-header">
        <img src={logo} alt="logo Vinted" />

        <button>S'inscrire</button>
        <button>
          <Link to={`/signup`}>Se connecter</Link>
        </button>
        <button>Vends maintenant</button>
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
