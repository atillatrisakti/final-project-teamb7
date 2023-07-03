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
import SendEmailReset from "./pages/SendEmailReset";
import ResetPass from "./pages/ResetPass";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Protected from "./components/Protected";
import NoTokenAccess from "./components/NoTokenAccess";

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
          <Route path="/search" element={<Search />} />
          <Route
            path="/login"
            element={
              <NoTokenAccess>
                <Login />
              </NoTokenAccess>
            }
          />
          <Route
            path="/register"
            element={
              <NoTokenAccess>
                <Register />
              </NoTokenAccess>
            }
          />
          <Route
            path="/booking/:departure_id/:number_passenger"
            element={
              <Protected>
                <Booking />
              </Protected>
            }
          />
          <Route
            path="/payment/:id/:number_passenger"
            element={
              <Protected>
                <Payment />
              </Protected>
            }
          />
          <Route
            path="/history"
            element={
              <Protected>
                <History />
              </Protected>
            }
          />
          <Route
            path="/account"
            element={<Account isLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/email-reset"
            element={
              <NoTokenAccess>
                <SendEmailReset />
              </NoTokenAccess>
            }
          />
          <Route
            path="/reset-password"
            element={
              <NoTokenAccess>
                <ResetPass />
              </NoTokenAccess>
            }
          />
        </Routes>

        <ToastContainer theme="colored" />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
