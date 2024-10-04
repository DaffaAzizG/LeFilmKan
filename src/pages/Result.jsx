import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

// Fungsi untuk mendapatkan query dari URL
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const query = useQuery();
  const searchTerm = query.get("q") || ""; // Ambil nilai query parameter 'q'
  const [restaurant, setRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm) {
        setIsLoading(true);
        try {
          // Panggil API pencarian berdasarkan search term
          const response = await axios.get(
            `https://restaurant-api.dicoding.dev/search?q=${searchTerm}`
          );

          // Jika ditemukan restoran, ambil detail restoran pertama
          if (response.data.restaurants.length > 0) {
            const restaurantId = response.data.restaurants[0].id;
            const detailResponse = await axios.get(
              `https://restaurant-api.dicoding.dev/detail/${restaurantId}`
            );
            setRestaurant(detailResponse.data.restaurant);
          } else {
            setRestaurant(null);
          }
        } catch (error) {
          console.error("Error fetching search data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Hasil Pencarian untuk "{searchTerm}"
      </h1>

      {/* Tampilkan detail restoran */}
      {isLoading ? (
        <p>Loading...</p>
      ) : restaurant ? (
        <div className="card bg-base-100 shadow-xl">
          <figure>
            <img
              src={`https://restaurant-api.dicoding.dev/images/small/${restaurant.pictureId}`}
              alt={restaurant.name}
              className="w-full h-48 object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold">{restaurant.name}</h2>
            <p>{restaurant.description}</p>
            <p>
              Lokasi: {restaurant.city}, {restaurant.address}
            </p>
            <p>Rating: {restaurant.rating}</p>

            {/* Menampilkan kategori */}
            <h3 className="text-xl font-bold mt-4">Kategori:</h3>
            <ul>
              {restaurant.categories.map((category) => (
                <li key={category.name}>{category.name}</li>
              ))}
            </ul>

            {/* Menampilkan menu makanan */}
            <h3 className="text-xl font-bold mt-4">Menu Makanan:</h3>
            <ul>
              {restaurant.menus.foods.map((food) => (
                <li key={food.name}>{food.name}</li>
              ))}
            </ul>

            {/* Menampilkan menu minuman */}
            <h3 className="text-xl font-bold mt-4">Menu Minuman:</h3>
            <ul>
              {restaurant.menus.drinks.map((drink) => (
                <li key={drink.name}>{drink.name}</li>
              ))}
            </ul>

            {/* Menampilkan ulasan pelanggan */}
            <h3 className="text-xl font-bold mt-4">Ulasan Pelanggan:</h3>
            <ul>
              {restaurant.customerReviews.map((review) => (
                <li key={review.date}>
                  <p>
                    <strong>{review.name}</strong> ({review.date}):{" "}
                    {review.review}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          {/* Tombol Kembali */}
          <div className="card-actions justify-end">
            <Link to="/">
              <button className="btn btn-primary">Back</button>
            </Link>
          </div>
        </div>
      ) : (
        <p>Tidak ada hasil ditemukan.</p>
      )}
    </div>
  );
};

export default SearchResults;
