import React from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg shadow-lg transition"
          onClick={() => navigate("/create/product")}
        >
          Manage Products
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg shadow-lg transition"
          onClick={() => navigate("/create/category")}
        >
          Manage Categories
        </button>
      </div>
    </div>
  );
};

export default Admin;
