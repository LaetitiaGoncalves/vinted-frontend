import "./App.css";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import axios from "axios";

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
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const setUser = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token, { expires: 7 });
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  useEffect(() => {
    try {
      const fetchOffers = async () => {
        const response = await axios.get(
          `https://vinted-api-laetitia-goncalves.herokuapp.com/offers?search=${search}`
        );
        setData(response.data);
        setIsLoading(false);
      };
      fetchOffers();
    } catch (error) {
      console.log(error.message);
    }
  }, [search]);

  return (
    <div>
      <Router>
        <Header token={token} setUser={setUser} setSearch={setSearch} />
        <Routes>
          <Route
            path="/"
            element={<Home token={token} data={data} isLoading={isLoading} />}
          />
          <Route path="/offer/:offerId" element={<Offer />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/publish" element={<Publish token={token} />} />
          <Route path="/payment" element={<Payment token={token} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
