import React, { useEffect, useState } from "react";
import { request } from "../api";
import { useSelector } from "react-redux";

const ProductCreate = () => {
  const token = useSelector((s) => s.token.value);
  const [categories, setCategories] = useState(null);
  useEffect(() => {
    request.get("/product-category/get").then((res) => {
      setCategories(res.data);
    });
  }, []);
  const handleCreateProduct = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const product = Object.fromEntries(formData);
    product.price = +product.price;
    product.categoryId = +product.categoryId;
    product.stock = +product.stock;
    product.average_rating = 1;

    request.post("/product/create", product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  return (
    <div>
      <h3>ProductCreate</h3>
      <form
        onSubmit={handleCreateProduct}
        action=""
        className="flex flex-col gap-3 max-w-[500px] mx-auto my-[50px]"
      >
        <input
          className="border py-2 px-4"
          type="text"
          name="name"
          placeholder="Enter product name"
        />
        <textarea
          className="border"
          name="description"
          id=""
          placeholder="Descripe product"
        ></textarea>
        <input
          className="border py-2 px-4"
          type="number"
          name="price"
          placeholder="Enter product price"
        />
        <input
          className="border py-2 px-4"
          type="text"
          name="image"
          placeholder="Enter product image link"
        />
        <select className="border py-2 px-4" name="categoryId" id="">
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          className="border py-2 px-4"
          type="number"
          name="stock"
          placeholder="Enter product stock"
        />
        <button className="border bg-blue-600 text-white py-2 px-4">
          Create
        </button>
      </form>
    </div>
  );
};

export default ProductCreate;
