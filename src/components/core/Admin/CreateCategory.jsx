import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  createCategoryAPI,
  fetchCourseCategories,
} from "../../../services/operations/courseDetailsAPI";

const CreateCategory = () => {
  const { token } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState("create");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [fetchingCategories, setFetchingCategories] = useState(false);

  useEffect(() => {
    if (activeTab === "categories") {
      fetchCategories();
    }
  }, [activeTab]);

  const fetchCategories = async () => {
    setFetchingCategories(true);
    const result = await fetchCourseCategories();
    setCategories(result || []);
    setFetchingCategories(false);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description) {
      return alert("Please fill out all fields.");
    }
    setLoading(true);
    const result = await createCategoryAPI(formData, token);

    if (result) {
      setFormData({ name: "", description: "" });
    }
    setLoading(false);
  };

  return (
    <div className="w-10/12 mx-auto py-10 text-richblack-5">
      {/* Navbar */}
      <div className="flex justify-center gap-4 mb-6 border-b border-richblack-600">
        <button
          className={`relative px-4 py-2 font-semibold transition-all ${
            activeTab === "create"
              ? "text-yellow-400 after:absolute after:left-0 after:right-0 after:-bottom-[1px] after:h-[3px] after:bg-yellow-400"
              : "text-richblack-300"
          }`}
          onClick={() => setActiveTab("create")}
        >
          Create Category
        </button>

        <button
          className={`relative px-4 py-2 font-semibold transition-all ${
            activeTab === "categories"
              ? "text-yellow-400 after:absolute after:left-0 after:right-0 after:-bottom-[1px] after:h-[3px] after:bg-yellow-400"
              : "text-richblack-300"
          }`}
          onClick={() => setActiveTab("categories")}
        >
          All Categories
        </button>
      </div>

      {/* Content */}
      {activeTab === "create" ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-9/12 mx-auto gap-4 bg-richblack-800 p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Create New Category</h2>

          <div>
            <label className="block text-richblack-300 mb-2">Category Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter category name"
              className="w-full border border-richblack-600 rounded-md p-2 bg-richblack-700 text-richblack-5 focus:outline-none focus:ring-1 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-richblack-300 mb-2">Category Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter category description"
              className="w-full border border-richblack-600 rounded-md p-2 bg-richblack-700 text-richblack-5 focus:outline-none focus:ring-1 focus:ring-yellow-400"
              rows="4"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-400 hover:bg-yellow-300 text-richblack-900 font-semibold py-2 rounded-md transition-all"
          >
            {loading ? "Creating..." : "Create Category"}
          </button>
        </form>
      ) : (
        <div className="bg-richblack-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center">All Categories</h2>

          {fetchingCategories ? (
            <p className="text-center text-richblack-300">Loading categories...</p>
          ) : categories.length === 0 ? (
            <p className="text-center text-richblack-300">No categories found.</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {categories.map((category) => (
                <li key={category._id} className="border-b border-richblack-600 pb-2">
                  <h3 className="text-lg font-semibold text-richblack-5">{category.name}</h3>
                  <p className="text-richblack-300">{category.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default CreateCategory;
