// src/hooks/useMostSellingCourses.js

import { useEffect, useState } from "react";
import { fetchMostSellingCourses } from "../services/operations/homePageAPI";

export default function useMostSellingCourses() {
  const [mostSellingCourses, setMostSellingCourses] = useState(null);

  const getSellingCourses = async () => {
    try {
      const response = await fetchMostSellingCourses();
      if (response?.success) {
        setMostSellingCourses(response.data);
      } else {
        console.error("Failed to fetch most selling courses:", response.message);
      }
    } catch (error) {
      console.error("Error fetching most selling courses:", error);
    }
  };

  useEffect(() => {
    getSellingCourses();
  }, []);

  return { mostSellingCourses };
}
