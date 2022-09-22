import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";

const CheckOutForm = ({ amount, title, image }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [completed, setCompleted] = useState(false);

  const handlePayment = async (event) => {
    try {
      event.preventDefault();
      const cardElement = elements.getElement(CardElement);

      const stripeResponse = await stripe.createToken(cardElement, {
        name: "user",
      });
      const stripeToken = stripeResponse.token.id;

      const response = await axios.post(
        "https://vinted-api-laetitia-goncalves.herokuapp.com/payment",
        {
          stripeToken,
          title: title,
          amount: amount,
          image: image,
        }
      );

      if (response.data) {
        console.log("Paiement réussi");
        alert("Paiement accepté");
        setCompleted(true);

        navigate("/");
      } else {
        alert("Erreur de paiement");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {completed ? (
        <div>
          <h1>Payment accepté ! </h1>
        </div>
      ) : (
        <form onSubmit={handlePayment} className="payment-form">
          <CardElement />
          <input type="submit" value="Payer" />
        </form>
      )}
    </div>
  );
};

export default CheckOutForm;
