import { Link, useNavigate } from "react-router-dom";
import logo from "../img/logo.svg";

import { useState } from "react";

import MenuBurger from "../components/MenuBurger";

const Header = ({ token, setUser, setSearch }) => {
  const navigate = useNavigate();
  //   const { offerSearch } = useParams();

  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  //   const handleSearch = async (event) => {
  //     try {
  //       event.preventDefault();

  //       const response = await axios.post(
  //         `https://vinted-api-laetitia-goncalves.herokuapp.com/offers/${offerSearch}`
  //       );
  //       if (response.data) {
  //         setData(response.data);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       if (error) {
  //         console.log(error.message);
  //       }
  //     }
  //   };

  const handleToggle = () => {
    setHamburgerOpen(!hamburgerOpen);
  };
  return (
    <header className="container">
      <div className="top-header">
        <Link to="/">
          <img src={logo} alt="logo Vinted" />
        </Link>

        <input
          type="text"
          placeholder="Rechercher un article..."
          onChange={(event) => setSearch(event.target.value)}
          className="search"
        />
        <div className="menu-burger" onClick={handleToggle}>
          <MenuBurger />
        </div>

        {hamburgerOpen && (
          <div className="responsive-menu">
            <>
              {token === null ? (
                <>
                  <button style={{ display: "block" }}>
                    <Link to="/login" onClick={handleToggle}>
                      Se connecter
                    </Link>
                  </button>
                  <button>
                    <Link to="/signup" onClick={handleToggle}>
                      S'inscrire
                    </Link>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setUser(null);
                    navigate("/");
                  }}
                  className="deconnexion-button"
                >
                  Se déconnecter
                </button>
              )}

              <button
                style={{
                  backgroundColor: "#0CB0BA",
                  width: "100",
                }}
              >
                <Link
                  to={"/login"}
                  style={{ color: "white" }}
                  onClick={handleToggle}
                >
                  Vends maintenant
                </Link>
              </button>
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
            </>
          </div>
        )}
        <div className="nav">
          {token === null ? (
            <div className="connect">
              <button>
                <Link to="/login">Se connecter</Link>
              </button>
              <button>
                <Link to="/signup">S'inscrire</Link>
              </button>

              <button className="btn-sell">
                <Link to={"/login"}>Vends maintenant</Link>
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => {
                  setUser(null);
                  navigate("/");
                }}
                className="deconnexion-button"
              >
                Se déconnecter
              </button>
              <button className="btn-sell">
                <Link to={"/publish"}>Vends maintenant</Link>
              </button>
            </>
          )}
        </div>
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
