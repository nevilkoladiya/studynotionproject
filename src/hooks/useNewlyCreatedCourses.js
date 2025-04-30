// src/hooks/useNewlyCreatedCourses.js

import { useEffect, useState } from "react";
import { fetchNewlyCreatedCourses } from "../services/operations/homePageAPI";

export default function useNewlyCreatedCourses() {
  const [newlyCreatedCourses, setNewlyCreatedCourses] = useState(null);

  const fetchNewCourses = async () => {
    try {
      const response = await fetchNewlyCreatedCourses();
      console.log(response);
      if (response?.success) {
        setNewlyCreatedCourses(response.data);
      } else {
        console.error("Failed to fetch newly created courses:", response.message);
      }
    } catch (error) {
      console.error("Error fetching newly created courses:", error);
    }
  };

  useEffect(() => {
    fetchNewCourses();
  }, []);

  return { newlyCreatedCourses };
}
