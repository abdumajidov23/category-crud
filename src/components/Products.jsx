import React from "react";

const Products = ({ data }) => {
  const productItems = data?.map((product) => (
    <div key={product.id} className="w-80 p-3 border">
      <img src={product.image} className="w-full h-60" alt="" />
      <h3>{product.name}</h3>
      <p>{product.price} USD</p>
    </div>
  ));
  return (
    <div className="flex gap-3 flex-wrap container mx-auto">{productItems}</div>
  );
};

export default Products;
