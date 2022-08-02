import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";

const CheckOutForm = ({ productName, totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const handlePayment = async (event) => {
    event.preventDefault();
    try {
      const cardElement = elements.getElement(CardElement);

      const stripeResponse = await stripe.createToken(cardElement);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeResponse.token.id,
          title: cardElement.productName,
          amount: cardElement.totalPrice,
        }
      );
      console.log(response.data);
      if (response.data.status === "succeeded") {
        console.log("Paiement réussi");
        setCompleted(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {completed ? (
        <h1>Payment confirmé ! ? </h1>
      ) : (
        <form onSubmit={handlePayment}>
          <CardElement />
          <input type="submit" value="Payer" />
        </form>
      )}
    </div>
  );
};

export default CheckOutForm;
