import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const DetailCountry = () => {
  const { id } = useParams();
  const [country, setCountry] = useState(null);

  // Fungsi untuk mengambil data negara
  const ambilCountry = async () => {
    try {
      const response = await axios.get(
        `https://freetestapi.com/api/v1/countries/${id}`
      );
      // Jika respons data langsung berisi detail negara, kita gunakan response.data
      setCountry(response.data);
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };

  // Mengambil data ketika komponen dimuat dan ID berubah
  useEffect(() => {
    if (id) {
      ambilCountry();
    }
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      {country ? (
        <div className="card bg-base-100 shadow-xl">
          <figure>
            <img
              src={country.flag}
              alt={country.name}
              className="w-full h-64 object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-3xl font-bold mb-2">
              {country.name}
            </h2>
            <p>
              <strong>Population:</strong> {country.population}
            </p>
            <p>
              <strong>Land Area:</strong> {country.land_area} km²
            </p>
            <p>
              <strong>Density:</strong> {country.density} people/km²
            </p>
            <p>
              <strong>Capital:</strong> {country.capital}
            </p>
            <p>
              <strong>Currency:</strong> {country.currency}
            </p>
            {/* Tombol Kembali */}
            <div className="card-actions justify-end mt-4">
              <Link to="/country">
                <button className="btn btn-primary">Back</button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DetailCountry;
