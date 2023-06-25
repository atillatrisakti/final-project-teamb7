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
import NoHistory from "./components/NoHistory";
import { Provider } from "react-redux";
import store from "./redux/store";
import Account from "./pages/Account";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NoNavbar>
          <Navbarr />
        </NoNavbar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/search/:departure_airport_id/:destination_airport_id/:departure_date/:number_passenger/:class_id"
            element={<Search />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/history" element={<History />} />
          <Route path="/nohistory" element={<NoHistory />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
