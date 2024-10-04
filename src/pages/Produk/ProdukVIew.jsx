import React from "react";

const ProdukVIew = ({ product }) => {
  return (
    <div>
      <div>
        <div className="grid grid-cols-3">
          {product?.map((item) => (
            <div className="card" key={item.id}>
              <div className="card-body">
                <figure>
                  <img src={item.image} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{item.title}</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProdukVIew;
