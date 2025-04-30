// src/hooks/useEnrolledCourses.js
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getUserEnrolledCourses } from "../services/operations/profileAPI"

export default function useEnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const [enrolledCourses, setEnrolledCourses] = useState(null)

  const fetchEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token)
      setEnrolledCourses(res)
    } catch (error) {
      console.error("Could not fetch enrolled courses.", error)
    }
  }

  useEffect(() => {
    fetchEnrolledCourses()
  }, [])

  return { enrolledCourses }
}
