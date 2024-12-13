import React, { useEffect, useState } from "react";
import { request } from "@/api";
import Products from "@/components/Products";

const Home = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    request
      .get("/product/get")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch products:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Welcome</h1>
      {loading ? (
        <p className="text-lg text-gray-600">Loading...</p>
      ) : products ? (
        <Products data={products} />
      ) : (
        <p className="text-lg text-red-600">No products found</p>
      )}
    </div>
  );
};

export default Home;
