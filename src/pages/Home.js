// import { useState, useEffect } from "react";
// import axios from "axios";

import { Link } from "react-router-dom";

const Home = ({ token, data, isLoading }) => {
  //   const [data, setData] = useState();
  //   const [isLoading, setIsLoading] = useState(true);

  //   useEffect(() => {
  //     try {
  //       const fetchOffers = async () => {
  //         const response = await axios.get(
  //           "https://vinted-api-laetitia-goncalves.herokuapp.com/offers"
  //         );
  //         console.log(response.data);
  //         setData(response.data);
  //         setIsLoading(false);
  //       };
  //       fetchOffers();
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   }, []);
  return isLoading === true ? (
    <div>En cours de chargement</div>
  ) : (
    <div className="page-home">
      <main>
        <section className="main-section">
          <div className="banner">
            <div className="banner-content container">
              <h1>Prêts à faire du tri dans vos placards ?</h1>
              {token === null ? (
                <button>
                  <Link to={"/login"}>Commencer à vendre </Link>
                </button>
              ) : (
                <button>
                  <Link to={"/publish"}>Commencer à vendre </Link>
                </button>
              )}

              <p>Découvrir comment ça marche</p>
            </div>
          </div>
        </section>
        <section className="offers-section container">
          <h2>Articles populaires</h2>
          <div className="offers-container">
            {data.map((offer, index) => {
              return (
                <Link to={`/offer/${offer._id}`} key={index}>
                  <div className="card">
                    <div className="avatar-and-username">
                      <img src={offer.owner.account.avatar.secure_url} alt="" />
                      <p>{offer.owner.account.username}</p>
                    </div>
                    <img src={offer.product_image.secure_url} alt="" />
                    <p className="offer-price">{offer.product_price} €</p>
                    {offer.product_details.map((details, index) => {
                      return (
                        <div key={index} className="details">
                          <p>{details.MARQUE}</p>
                          <p>{details.TAILLE}</p>
                        </div>
                      );
                    })}
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
