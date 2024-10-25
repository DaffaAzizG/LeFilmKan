import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/stylebaru.scss";
import Beranda from "./pages/Beranda";
import Detail from "./pages/Detail";
import ThemeContex from "./context/ThemeContex";
import { Provider } from "react-redux";
import store from "./store/store";
import { useState } from "react";
import Search from "./pages/Search";
import DaftarUlas from "./pages/DaftarUlas";
import Footer from "./components/Footer";

function App() {
  const [count, setCount] = useState(0);
  const theme = useState("light");
  return (
    <div className="">
      <BrowserRouter>
        <ThemeContex.Provider value={theme}>
          <Provider store={store}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Beranda />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/search" element={<Search />} />
              <Route path="/rated" element={<DaftarUlas />} />
            </Routes>
            <Footer />
          </Provider>
        </ThemeContex.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
