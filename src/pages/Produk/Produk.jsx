import React, { useEffect, useState } from "react";
import axios from "axios";
import ProdukVIew from "./ProdukVIew";

const Produk = () => {
  const [product, setProduct] = useState();
  const ambilProduct = async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    const data = await response.data;
    setProduct(data);
  };

  useEffect(() => {
    ambilProduct();
  }, []);
  return <ProdukVIew product={product} />;
};

export default Produk;
