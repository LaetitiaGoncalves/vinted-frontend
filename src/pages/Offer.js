import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

const Offer = () => {
  const { offerId } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  //   console.log(offerId);

  useEffect(() => {
    const fetchOffer = async () => {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offer/${offerId}`
      );
      //   console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchOffer();
  }, [offerId]);
  return isLoading === true ? (
    <div>En cours de chargement</div>
  ) : (
    <div className="offer-page container">
      <img src={data.product_image.secure_url} alt="" />

      <div className="offer-infos">
        <h2> {data.product_name}</h2>
        <p>{data.product_price} €</p>

        <div>
          {data.product_details.map((item) => {
            //   console.log(Object.keys(item));
            const keys = Object.keys(item);
            return (
              <p>
                {keys[0]} : {item[keys[0]]}
              </p>
            );
          })}
        </div>
        <button>
          <Link
            to="/payment"
            state={{
              title: data.product_name,
              amount: data.product_price,
              image: data.product_image.secure_url,
            }}
          >
            Acheter
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Offer;
