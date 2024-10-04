import React from "react";
import { Link } from "react-router-dom";

const BerandaView = ({ ubahCari, dataCari, filterData, display }) => {
  return (
    <div className="dark:bg-black">
      {/* Input Pencarian */}
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Search"
          onChange={(input) => ubahCari(input.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      <p>
        Hasil : {dataCari} ditemukan : {filterData?.founded}
      </p>

      {/* Grid untuk menampilkan hasil pencarian atau produk default */}
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {display?.restaurants?.map((item) => (
          <div
            className="card bg-base-100 dark:bg-black dark:text-white w-auto shadow-xl"
            key={item.id}
          >
            <div className="">
              <figure>
                <img
                  src={`https://restaurant-api.dicoding.dev/images/small/${item.pictureId}`}
                  alt={item.name}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.name}</h2>
                <p>{item.description}</p>
                <p>Lokasi {item.city}</p>
                <p>Rating {item.rating}</p>
                <div className="card-actions justify-end">
                  <Link to={`/detail/${item.id}`}>
                    <button className="buttonn btn btn-primary dark:bg-gray-800 text-white">
                      Detail
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BerandaView;
