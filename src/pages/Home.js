import { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    try {
      const fetchOffers = async () => {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      };
      fetchOffers();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  return isLoading === true ? (
    <div>En cours de chargement</div>
  ) : (
    <div className="page-home">
      <main>
        <section className="main-section">
          <div className="banner">
            <div className="banner-content">
              <h1>Prêts à faire du tri dans vos placards ?</h1>
              <button>Vends maintenant</button>
              <p>Découvrir comment ça marche</p>
            </div>
          </div>
        </section>
        <section className="offers-section">
          <h2>Articles populaires</h2>
          <div className="offers-container">
            {data.offers.map((offer) => {
              return (
                <Link to={`/offer/${offer._id}`}>
                  <div className="card">
                    <h2>{offer.product_name}</h2>
                    <img src={offer.product_image.secure_url} alt="" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
