import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "./pages/Search";
import Navbarr from "./components/Navbar";
import Login from "./pages/Login";
import NoNavbar from "./components/NoNavbar";
import Register from "./pages/Register";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NoNavbar>
          <Navbarr />
        </NoNavbar>

        <Routes>
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
