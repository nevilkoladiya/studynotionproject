// src/hooks/useMostPopularCourses.js

import { useEffect, useState } from "react"
import { fetchMostPopularCourses } from "../services/operations/homePageAPI"

export default function useMostPopularCourses() {
  const [mostPopularCourses, setMostPopularCourses] = useState(null)

  const getPopularCourses = async () => {
    try {
      const response = await fetchMostPopularCourses()
      if (response?.success) {
        setMostPopularCourses(response.data)
      } else {
        console.error("Failed to fetch popular courses:", response.message)
      }
    } catch (error) {
      console.error("Error fetching most popular courses:", error)
    }
  }

  useEffect(() => {
    getPopularCourses()
  }, [])

  return { mostPopularCourses }
}
