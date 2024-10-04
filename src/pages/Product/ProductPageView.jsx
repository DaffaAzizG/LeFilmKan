import React from "react";
import { Link } from "react-router-dom";

const ProductPageView = ({ ubahCari, dataSearch, hasil, display }) => {
  return (
    <div>
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
      <p>Hasil : {dataSearch} ditemukan :</p>

      {/* Grid untuk menampilkan hasil pencarian atau produk default */}
      <div className="grid grid-cols-3">
        {products.map((item) => (
          <div className="card" key={item.id}>
            <figure>
              <img src="" alt={item.title} />
            </figure>
            <div className="card-body">
              <h2 className="">{item.title}</h2>
              <p>{item.price}</p>
              <p>{item.description}</p>
              <p className="category">Kategori {item.category}</p>
              <p className="rating">Rating {item.rating}</p>
              <div className="buttonn">
                <Link to={`/detail/${item.id}`}>
                  <button className="btn btn-primary">Detail</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPageView;
