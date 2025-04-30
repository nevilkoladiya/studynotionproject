import React, { useState, useEffect } from 'react';
import { fetchCourseCategories } from '../../../services/operations/courseDetailsAPI';
import { Link } from 'react-router-dom';

export default function ExploreCatalog() {
  const [categories, setCategories] = useState([]);
  const [fetchingCategories, setFetchingCategories] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setFetchingCategories(true);
    const result = await fetchCourseCategories();
    setCategories(result || []);
    setFetchingCategories(false);
  };

  return (
    <div className="bg-richblack-900 text-richblack-25 w-10/12 mx-auto pb-8 pt-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-yellow-400">Explore Categories</h1>

      {fetchingCategories ? (
        <p className="text-center text-gray-400">Loading categories...</p>
      ) : categories.length === 0 ? (
        <p className="text-center text-gray-400">No categories available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <Link
              to={`/explore/catalogs/${category.name.split(" ").join("-").toLowerCase()}`}
              key={category._id}
              className="border border-richblack-700 bg-richblack-800 rounded-lg p-4 hover:shadow-lg hover:border-yellow-400 transition-all duration-200"
            >
              <h2 className="text-xl font-semibold mb-2 text-yellow-400">{category.name}</h2>
              <p className="text-gray-300">{category.description}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
