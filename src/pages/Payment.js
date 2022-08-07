import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

function Payment() {
  const location = useLocation();
  const { title, amount, image } = location.state;

  return (
    <div className="container payment-page">
      <h1>Résumé de la commande</h1>
      <div className="image-and-payment">
        <img src={image} alt="" />
        <div className="texts-payment">
          <p>{title}</p>
          <p>{amount} €</p>
          <Elements stripe={stripePromise}>
            <CheckoutForm amount={amount} title={title} image={image} />
          </Elements>
        </div>
      </div>
    </div>
  );
}

export default Payment;
