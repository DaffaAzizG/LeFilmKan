import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  // Fungsi untuk mengambil data restoran
  const ambilRestaurant = async () => {
    try {
      const response = await axios.get(
        `https://restaurant-api.dicoding.dev/detail/${id}`
      );
      setRestaurant(response.data.restaurant);
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    }
  };

  // Mengambil data ketika komponen dimount dan ID berubah
  useEffect(() => {
    if (id) {
      ambilRestaurant();
    }
  }, [id]);

  // Log URL untuk memastikan ID yang benar digunakan
  console.log(`https://restaurant-api.dicoding.dev/detail/${id}`);

  return (
    <div className="container mx-auto p-4">
      {restaurant ? (
        <div className="card bg-base-100 dark:bg-gray-800 text-white shadow-xl">
          <figure>
            <img
              src={`https://restaurant-api.dicoding.dev/images/small/${restaurant.pictureId}`}
              alt={restaurant.name}
              className="w-full h-64 object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-3xl font-bold mb-2">
              {restaurant.name}
            </h2>
            <p className="text-lg mb-4">{restaurant.description}</p>
            <p className="text-md mb-4">
              <strong>Lokasi:</strong> {restaurant.city}, {restaurant.address}
            </p>
            <p className="text-md mb-4">
              <strong>Kategori:</strong>{" "}
              {restaurant.categories
                .map((category) => category.name)
                .join(", ")}
            </p>

            {/* Bagian Menu Makanan */}
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-2">Menu Makanan</h3>
              <ul className="list-disc pl-6">
                {restaurant.menus.foods.map((food, index) => (
                  <li key={index}>{food.name}</li>
                ))}
              </ul>
            </div>

            {/* Bagian Menu Minuman */}
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-2">Menu Minuman</h3>
              <ul className="list-disc pl-6">
                {restaurant.menus.drinks.map((drink, index) => (
                  <li key={index}>{drink.name}</li>
                ))}
              </ul>
            </div>

            {/* Rating */}
            <p className="text-md mb-4">
              <strong>Rating:</strong> {restaurant.rating}
            </p>

            {/* Bagian Ulasan Pelanggan */}
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-2">Ulasan Pelanggan</h3>
              {restaurant.customerReviews.length > 0 ? (
                <ul className="list-disc pl-6">
                  {restaurant.customerReviews.map((review, index) => (
                    <li key={index} className="mb-2">
                      <strong>{review.name}</strong> ({review.date}): <br />
                      <span>{review.review}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Tidak ada ulasan pelanggan.</p>
              )}
            </div>

            {/* Tombol Kembali */}
            <div className="card-actions justify-end">
              <Link to="/">
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

export default Detail;
