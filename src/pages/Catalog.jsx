import React, { useEffect, useState } from "react";
import Footer from "../components/common/Footer";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import { categories } from "../services/api";
import { getCatalogaPageData } from "../services/operations/PageAndComponentData";
import Course_Card from "../components/core/Catalog/Course_Card";
import HorizontalCourseCard from "../components/core/Catalog/HorizontalCourseCard";
import AllCoursesInCategory from "../components/core/Catalog/AllCoursesInCategory";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Error from "./Error";

const Catalog = () => {

  const { loading } = useSelector((state) => state.profile);
  const { catalogName } = useParams();
  const [active, setActive] = useState(1);
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  //Fetch all categories
  useEffect(() => {
    const getCategories = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      const category_id = res?.data?.data?.filter(
        (ct) =>
          ct.name.split(" ").join("-").split("/").join("-").toLowerCase() ===
          catalogName
      )[0]._id;
      setCategoryId(category_id);
    };
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogaPageData(categoryId);
        // console.log("PRinting res: ", res);
        setCatalogPageData(res);
      } catch (error) {
        console.log(error);
      }
    };
    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }
  if (!loading && !catalogPageData.success) {
    return <Error />;
  }

  return (
    <>
      {/* Hero Section */}
      <div className=" box-content bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
          <p className="text-sm text-richblack-300">
            <Link to="/" className="hover:text-yellow-25 transition-all">
              Home
            </Link>
            {" / "}
            <Link to="/explore/home" className="hover:text-yellow-25 transition-all">
              Explore
            </Link>
            {" / "}
            <Link to="/explore/catalogs" className="hover:text-yellow-25 transition-all">
              Catalog
            </Link>
            {" / "}
            <span className="text-yellow-25">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl text-richblack-5">
            {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-richblack-200">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1 */}
      <div className="bg-slate-700 mx-auto box-content w-full max-w-maxContentTab px-0 md:px-4 py-6 lg:max-w-maxContent">
        <div className="section_heading md:pl-0 pl-4">Courses to get you started</div>
        <div className="my-4 flex border-b border-b-richblack-600 text-sm">
          <p
            className={`px-4 py-2 ${active === 1
              ? "border-b border-b-yellow-25 text-yellow-25"
              : "text-richblack-50"
              } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Populer
          </p>
          <p
            className={`px-4 py-2 ${active === 2
              ? "border-b border-b-yellow-25 text-yellow-25"
              : "text-richblack-50"
              } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <div className="px-6">
          <CourseSlider
            Courses={
              active === 1
                ? catalogPageData?.data?.mostPopularCourses
                : catalogPageData?.data?.newestCourses
            }
          />
        </div>
      </div>

      {/* Section 2 */}
      <div className=" bg-slate-600 mx-auto box-content w-full max-w-maxContentTab md:px-4 pt-4 lg:max-w-maxContent">
        <div className="section_heading md:pl-0 pl-4">Frequently Bought</div>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {catalogPageData?.data?.mostSellingCourses
              ?.slice(0, 10)
              .map((course, i) => (
                <Course_Card course={course} key={i} Height={"]"} />
              ))}
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className="bg-slate-700 mx-auto box-content w-full max-w-maxContentTab px-0 md:px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading md:pl-0 pl-4">
          What to learn Next?
        </div>
        <div className="text-white md:pl-0 pl-4">
          Top courses in {catalogPageData?.data?.differentCategory?.name}
        </div>
        <div className="p-4">
          <CourseSlider
            Courses={catalogPageData?.data?.differentCategory?.courses}
          />
        </div>
      </div>
      {/* section 4 */}
      <div className=" bg-slate-600 mx-auto box-content w-full max-w-maxContentTab px-2 pr-4 md:pr-4 pb-6 lg:max-w-maxContent">
        <AllCoursesInCategory
          catalogName={catalogName}
          courses={catalogPageData?.data?.selectedCategory?.courses}
          ratingArray={catalogPageData?.data?.averageRatingsByCourseId}
          durationArray={catalogPageData?.data?.courseDurationsById}
        />
      </div>
      <footer className="bg-richblack-800 w-full">
        <Footer />
      </footer>
    </>
  );
};

export default Catalog;
