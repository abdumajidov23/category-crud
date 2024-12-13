import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { request } from "../api";

const Categories = () => {
  const token = useSelector((state) => state.token.value);
  const [categories, setCategories] = useState([]);
  const [statusCreate, setStatusCreate] = useState(true);
  const [editValues, setEditValues] = useState({
    id: 0,
    name: "",
    description: "",
  });

  useEffect(() => {
    request
      .get("/product-category/get")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  const handleCreateCategory = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const category = Object.fromEntries(formData);

    if (statusCreate) {
      request
        .post("/product-category/create", category, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setCategories([...categories, res.data]);
          e.target.reset();
        })
        .catch((err) => console.error("Failed to create category:", err));
    } else {
      request
        .patch(`/product-category/update/${editValues.id}`, category, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setCategories(
            categories.map((cat) =>
              cat.id === editValues.id ? { ...cat, ...category } : cat
            )
          );
          setStatusCreate(true);
          e.target.reset();
        })
        .catch((err) => console.error("Failed to update category:", err));
    }
  };

  const handleDelete = (id) => {
    request
      .delete(`/product-category/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setCategories(categories.filter((category) => category.id !== id));
      })
      .catch((err) =>
        console.error(
          "Cannot delete category because it is still referenced by products:",
          err
        )
      );
  };

  const handleEdit = (category) => {
    setStatusCreate(false);
    setEditValues(category);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h3 className="text-2xl font-bold mb-4">Categories</h3>
      <form
        onSubmit={handleCreateCategory}
        className="bg-white p-4 rounded-lg shadow-md max-w-md mx-auto mb-6"
      >
        <input
          className="w-full border rounded-lg p-2 mb-3"
          type="text"
          name="name"
          placeholder="Enter category name"
          defaultValue={editValues.name}
          required
        />
        <textarea
          className="w-full border rounded-lg p-2 mb-3"
          name="description"
          placeholder="Describe category"
          defaultValue={editValues.description}
          required
        ></textarea>
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          type="submit"
        >
          {statusCreate ? "Create" : "Update"}
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
            <p className="text-gray-600 mb-4">{category.description}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleDelete(category.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
              <button
                onClick={() => handleEdit(category)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
