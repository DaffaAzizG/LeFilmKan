import React, { useCallback, useEffect, useReducer, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import BerandaView from "./BerandaView";

const nilaiDefault = {
  data: [],
  filterData: [],
  loading: true,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_BERHASIL":
      return {
        ...state,
        data: action.payload,
        filterData: action.payload,
        loading: false,
      };
    case "SET_FILTER":
      return {
        ...state,
        filterData: action.payload,
      };
    default:
      throw new Error("Error di case");
  }
};
export const Beranda = () => {
  const [state, dispatch] = useReducer(reducer, nilaiDefault);

  // const [product, setProduct] = useState();
  // const [hasilCari, setHasilCari] = useState();
  const [cari, setCari] = useSearchParams();
  const dataCari = cari.get("dataCari");

  // Ambil data list restoran
  const ambilProduct = async () => {
    const response = await axios.get(
      "https://restaurant-api.dicoding.dev/list"
    );
    const data = await response.data;
    // setProduct(data);
    dispatch({ type: "FETCH_BERHASIL", payload: data });
  };

  // Ambil hasil pencarian jika ada query 'dataCari' di URL
  const ambilHasilCari = useCallback(async () => {
    if (dataCari) {
      const response = await axios.get(
        "https://restaurant-api.dicoding.dev/search?q=" + dataCari
      );
      const data = await response.data;
      // setHasilCari(data);
      dispatch({ type: "SET_FILTER", payload: data });
    }
  }, [dataCari]);

  // Panggil data produk saat komponen dimuat pertama kali
  useEffect(() => {
    ambilProduct();
  }, []);

  // Panggil pencarian saat URL memiliki query 'dataCari'
  useEffect(() => {
    ambilHasilCari();
  }, [dataCari]);

  // Fungsi untuk mengubah query parameter
  const ubahCari = (input) => {
    setCari({ dataCari: input });
  };

  // Pilih data yang akan ditampilkan, prioritas ke hasil pencarian
  const display = dataCari ? state.filterData : state.data;
  console.log(state);
  return (
    <BerandaView
      dataCari={dataCari}
      hasilCari={state.filterData}
      display={display}
      ubahCari={ubahCari}
    />
  );
};
