import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import CountryVIew from "./CountryVIew";

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

const Country = () => {
  const [state, dispatch] = useReducer(reducer, nilaiDefault);
  const [cari, setCari] = useSearchParams();
  const dataCari = cari.get("dataCari");

  // Ambil data negara dari API
  const ambilProduct = async () => {
    try {
      const response = await axios.get(
        "https://freetestapi.com/api/v1/countries"
      );
      const data = response.data;
      dispatch({ type: "FETCH_BERHASIL", payload: data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Panggil data negara saat komponen dimuat pertama kali
  useEffect(() => {
    ambilProduct();
  }, []);

  // Fungsi untuk mengubah query parameter
  const ubahCari = (input) => {
    setCari({ dataCari: input });
  };

  // Lakukan pencarian lokal
  useEffect(() => {
    if (dataCari) {
      const hasilFilter = state.data.filter((item) =>
        item.name.toLowerCase().includes(dataCari.toLowerCase())
      );
      dispatch({ type: "SET_FILTER", payload: hasilFilter });
    } else {
      dispatch({ type: "SET_FILTER", payload: state.data });
    }
  }, [dataCari, state.data]);

  // Pilih data yang akan ditampilkan
  const display = state.filterData;

  return (
    <CountryVIew
      dataCari={dataCari}
      hasilCari={state.filterData}
      display={display}
      ubahCari={ubahCari}
    />
  );
};

export default Country;
