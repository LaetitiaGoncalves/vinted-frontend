import { Link, useNavigate } from "react-router-dom";
import logo from "../img/logo.svg";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Header = ({ token, setUser }) => {
  const navigate = useNavigate();
  const { offerSearch } = useParams();
  const [data, setData] = useState();

  const handleSearch = async (event) => {
    try {
      event.preventDefault();

      const response = await axios.post(
        `https://lereacteur-vinted-api.herokuapp.com/offers/${offerSearch}`
      );
      if (response.data) {
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
      if (error) {
        console.log(error.message);
      }
    }
  };
  return (
    <header>
      <div className="top-header">
        <img src={logo} alt="logo Vinted" />
        <input
          type="text"
          placeholder="Rechercher"
          value={data}
          onChange={handleSearch}
          className="search"
        />
        {token === null ? (
          <div className="connect">
            <button>
              <Link to="/login">Se connecter</Link>
            </button>
            <button>
              <Link to="/signup">S'inscrire</Link>
            </button>
          </div>
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
        <Link to={"/publish"}>
          <button className="btn-sell">Vends maintenant</button>
        </Link>
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
