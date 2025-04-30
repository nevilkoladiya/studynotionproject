import { apiConnector } from "../apiconnector";// adjust path as needed
import { topCourcesEndpoints } from "../api";

const { 
    MOST_POPULAR_COURSES,
    NEWLY_CREATED_COURCES,
    MOST_SELLING_COURCES,
    TOP_SHORT_COURCES
} = topCourcesEndpoints;

export const fetchMostPopularCourses = async () => {
    try {
      const response = await apiConnector(
        "GET",
        topCourcesEndpoints.MOST_POPULAR_COURCES
      );
      return response.data; // Return only the data, not the whole response
    } catch (error) {
      console.error("Error in fetchMostPopularCourses:", error);
      return { success: false, message: error.message };
    }
  };

  export const fetchNewlyCreatedCourses = async () => {
    try {
      const response = await apiConnector(
        "GET",
        topCourcesEndpoints.NEWLY_CREATED_COURCES
      );
      return response.data; // Return only the data, not the whole response
    } catch (error) {
      console.error("Error in fetchNewlyCreatedCourses:", error);
      return { success: false, message: error.message };
    }
  };

  export const fetchMostSellingCourses = async () => {
    try {
      const response = await apiConnector(
        "GET",
        topCourcesEndpoints.MOST_SELLING_COURCES
      );
      return response.data; // Return only the data, not the whole response
    } catch (error) {
      console.error("Error in fetchMostSellingCourses:", error);
      return { success: false, message: error.message };
    }
  };

  export const fetchShortCourses = async () => {
    try {
      const response = await apiConnector(
        "GET",
        topCourcesEndpoints.TOP_SHORT_COURCES
      );
      return response.data; // Return only the data, not the whole response
    } catch (error) {
      console.error("Error in fetchShortCourses:", error);
      return { success: false, message: error.message };
    }
  };

  export const fetchCoursesByTag = async (tag) => {
    try {
      const response = await apiConnector(
        "POST", // use POST since you're sending data in the body
        topCourcesEndpoints.GET_COURCES_BY_TAG,
        { tag } // request body
      );
      return response.data; // return only the data
    } catch (error) {
      console.error("Error in fetchCoursesByTag:", error);
      return { success: false, message: error.message };
    }
  };

