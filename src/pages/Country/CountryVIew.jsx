import React from "react";
import { Link } from "react-router-dom";

const CountryVIew = ({ dataCari, hasilCari, display, ubahCari }) => {
  return (
    <div>
      <div>
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
        <p>Hasil : {dataCari} ditemukan :</p>
        <div>
          <div className="grid grid-cols-3">
            {display?.map((item) => (
              <div className="card" key={item.id}>
                <div className="card-body">
                  <figure>
                    <img src={item.flag} alt={`${item.name} flag`} />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{item.name}</h2>
                    <p>{item.currency}</p>
                    <div className="card-actions justify-end">
                      <Link to={`/detailcountry/${item.id}`}>
                        <button className="btn btn-primary">Detail</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryVIew;
