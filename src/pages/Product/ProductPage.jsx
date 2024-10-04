import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import ProductPageView from "./ProductPageView";

export const ProductPage = () => {
  const [product, setProduct] = useState();
  const [hasil, setHasil] = useState();
  const [cari, setCari] = useSearchParams();
  const dataSearch = cari.get("dataCari");

  // Ambil data list restoran
  const ambilProduct = async () => {
    const response = await axios.get("https://fakestoreapi.com/docs/products");
    const data = await response.data;
    setProduct(data);
  };

  // Ambil hasil pencarian jika ada query 'dataCari' di URL
  const ambilHasilSearch = async () => {
    if (dataSearch) {
      const response = await axios.get(
        "https://fakestoreapi.com/search?q=" + dataSearch
      );
      const data = await response.data;
      setHasil(data);
    }
  };

  // Panggil data produk saat komponen dimuat pertama kali
  useEffect(() => {
    ambilProduct();
  }, []);

  // Panggil pencarian saat URL memiliki query 'dataCari'
  useEffect(() => {
    ambilHasilSearch();
  }, [dataSearch]);

  // Fungsi untuk mengubah query parameter
  const ubahCari = (input) => {
    setCari({ dataSearch: input });
  };

  // Pilih data yang akan ditampilkan, prioritas ke hasil pencarian
  const display = dataSearch ? hasil : product;

  return (
    <ProductPageView
      dataCari={dataSearch}
      hasilCari={hasil}
      display={display}
      ubahCari={ubahCari}
    />
  );
};
