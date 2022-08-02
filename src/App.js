import "./App.css";
import Cookies from "js-cookie";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

// components
import Header from "./components/Header";

const App = () => {
  const [token, setToken] = useState(Cookies.get("userToken") || null);
  const stripePromise = loadStripe(
    "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
  );
  const setUser = (tokenToCheck) => {
    if (tokenToCheck !== null) {
      Cookies.set("userToken", tokenToCheck, { expires: 7 });
    } else {
      Cookies.remove("userToken");
    }
    setToken(tokenToCheck);
  };

  return (
    <div>
      <Router>
        <Header token={token} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home token={token} />} />
          <Route path="/offer/:offerId" element={<Offer />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route
            path="/publish"
            element={<Publish token={token} setUser={setUser} />}
          />
          <Route
            path="/payment"
            element={<Payment stripe={stripePromise} />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
