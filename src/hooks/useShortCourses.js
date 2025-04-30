// src/hooks/useShortCourses.js

import { useEffect, useState } from "react"
import { fetchShortCourses } from "../services/operations/homePageAPI"

export default function useShortCourses() {
  const [shortCourses, setShortCourses] = useState(null)

  const getShortCourses = async () => {
    try {
      const response = await fetchShortCourses()
      if (response?.success) {
        setShortCourses(response.data)
      } else {
        console.error("Failed to fetch short courses:", response.message)
      }
    } catch (error) {
      console.error("Error fetching short courses:", error)
    }
  }

  useEffect(() => {
    getShortCourses()
  }, [])

  return { shortCourses }
}
