import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Navbarr from "./components/Navbar";
import Login from "./pages/Login";
import NoNavbar from "./components/NoNavbar";
import Register from "./pages/Register";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import History from "./pages/History";
import { Provider } from "react-redux";
import store from "./redux/store";
import Account from "./pages/Account";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <NoNavbar>
          <Navbarr isLoggedIn={isLoggedIn} />
        </NoNavbar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/search/:departure_airport_id/:destination_airport_id/:departure_date/:number_passenger/:class_id"
            element={<Search />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/payment/:id" element={<Payment />} />
          <Route path="/history" element={<History />} />
          <Route path="/account" element={<Account isLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
