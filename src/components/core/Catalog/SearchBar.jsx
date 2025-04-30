import React, { useState } from "react";
import { fetchCoursesByTag } from "../../../services/operations/homePageAPI";
import { FiSearch } from "react-icons/fi";
import AllCoursesInCategory from "./AllCoursesInCategory"; // Update the path if needed

const SearchBar = () => {
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
    if (!tag.trim()) return;
    setLoading(true);
    setError("");
    setResult(null); // clear previous results
    try {
      const response = await fetchCoursesByTag(tag.trim());
      if (response?.success) {
        setResult(response.data);
        if (response.data.courses.length === 0) {
          setError(`No courses found with tag '${tag}'`);
        }
      } else {
        setError(response.message || "No courses found");
      }
    } catch (err) {
      setError(err.message || "Error fetching courses");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="relative w-full mx-auto mt-6 mb-6">
      <div className="relative max-w-4xl mx-auto">
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search by tag..."
          className="w-full px-5 py-3 rounded-md bg-richblack-800 text-white placeholder:text-richblack-300 border border-richblack-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          onClick={handleSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-400 hover:text-yellow-300 transition-colors"
        >
          <FiSearch size={22} />
        </button>
      </div>

      {loading && <p className="mt-3 ml-6 text-yellow-400">Loading...</p>}
      {error && <p className="mt-3 ml-6 text-red-500">{error}</p>}

      {!loading && result?.courses?.length > 0 && (
        <div className="mt-6">
          <AllCoursesInCategory
            catalogName={tag}
            courses={result.courses}
            ratingArray={result.averageRatingsByCourseId}
            durationArray={result.courseDurationsById}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
