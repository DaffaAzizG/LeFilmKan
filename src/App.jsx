import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Beranda } from "./pages/beranda/Beranda";
import Detail from "./pages/Detail";
import { Result } from "postcss";
import SearchResults from "./pages/Result";
import "./assets/stylebaru.scss";
import { ProductPage } from "./pages/Product/ProductPage";
import Produk from "./pages/Produk/Produk";
import Country from "./pages/Country/Country";
import DetailCountry from "./pages/DetailCountry";
import ThemeContex from "./components/context/ThemeContex";

function App() {
  const [count, setCount] = useState(0);
  const theme = useState("light");

  return (
    <>
      <BrowserRouter>
        <ThemeContex.Provider value={theme}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Beranda />} />
            <Route path={"/detail/:id"} element={<Detail />} />
            <Route path={"/detailcountry/:id"} element={<DetailCountry />} />
            <Route path={"/result"} element={<Result />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/produk" element={<Produk />} />
            <Route path="/country" element={<Country />} />
          </Routes>
        </ThemeContex.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
