import "./App.css";
import Cookies from "js-cookie";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";

// components
import Header from "./components/Header";

const App = () => {
  const [token, setToken] = useState(Cookies.get("userToken") || null);

  const setUser = (tokenToCheck) => {
    if (tokenToCheck !== null) {
      Cookies.set("userToken", tokenToCheck, { expires: 7 });
    } else {
      Cookies.remove("userToken");
    }
    setToken(tokenToCheck);
  };

  return (
    <div className="container">
      <Router>
        <Header token={token} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offer/:offerId" element={<Offer />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
