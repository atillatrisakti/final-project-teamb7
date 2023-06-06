import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "./pages/Search";
import Navbarr from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbarr />
      <Routes>
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
