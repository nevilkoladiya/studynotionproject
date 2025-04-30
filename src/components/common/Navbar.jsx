import React, { useEffect, useState } from "react";
import Logo_Full_Light from "../../assets/Logo/Logo_Full_Light.png";
import { NavbarLinks } from "../../data/navbar-link";
import { useSelector } from "react-redux";
import { NavLink, matchPath, useLocation } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector.js";
import { IoIosArrowDown } from "react-icons/io";
import { categories } from "../../services/api.js";
import Logo_Small_Light from "../../assets/Logo/Logo_Small_Light.png";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [burger, setburger] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(res.data.data);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    })();
  }, []);

  const location = useLocation();
  const matchRoute = (route) => {
    if (route === "/") {
      // Only match exactly "/"
      return matchPath({ path: route, end: true }, location.pathname);
    }
    if (route === "/explore/home") {
      return matchPath({ path: "/explore", end: false }, location.pathname);
    }
    return matchPath({ path: route, end: false }, location.pathname);
  };
  
  function handleBurger() {
    setburger(!burger);
  }
  return (
    <>
      <div
        className={`${
          location.pathname !== "/" ? "bg-richblack-800" : ""
        } transition-all md:hidden duration-200 w-full flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700`}
        // name="section"
      >
        <div className="flex  w-11/12 max-w-maxContent justify-between items-center">
          {/* Image */}
          <div className="relative cursor-pointer group h-full">

            <div className="flex gap-1 items-center">
              <img
                src={Logo_Small_Light}
                alt="logo"
                className="w-[32px] h-[32px] cursor-pointer"
              />
            </div>

            <div
              className={` invisible absolute top-[60%] z-10 flex w-[200px] -translate-x-[5%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px] group-hover:z-30`}
            >
              {/* Nav Link  */}
              <nav>
                <ul className="flex flex-col gap-y-3 text-[17px] font-inter">
                  {NavbarLinks.map((item, i) => {
                    return (
                      <li className="" key={i}>
                        {item.title === "Catalog" ? (
                          <div
                            className={`relative cursor-pointer h-full ${
                              matchRoute("/catalog/:catalogName")
                                ? "text-red-500"
                                : "text-richblack-900"
                            }`}
                          >
                            <div
                              className="flex gap-1 items-center cursor-pointer"
                              onClick={handleBurger}
                            >
                              <p>{item.title}</p>
                              <IoIosArrowDown />
                            </div>
                            {burger && (
                              <div className="text-black flex flex-col ml-2 bg-red-25 rounded-lg">
                                {loading ? (
                                  <p className="text-center">Loading...</p>
                                ) : subLinks && subLinks.length ? (
                                  <>
                                    {subLinks.map((link, index) => (
                                      <NavLink
                                        className="rounded-lg bg-transparent py-1 pl-2 hover:bg-richblack-25"
                                        key={index}
                                        to={`/catalog/${link.name
                                          .split(" ")
                                          .join("-")
                                          .split("/")
                                          .join("-")
                                          .toLowerCase()}`}
                                      >
                                        {link.name}
                                      </NavLink>
                                    ))}
                                  </>
                                ) : (
                                  <p className="text-center">
                                    No Courses Found
                                  </p>
                                )}
                                <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <NavLink
                            className={`${
                              matchRoute(item?.path)
                                ? "text-red-500"
                                : "text-richblack-900"
                            }`}
                            to={item?.path}
                          >
                            {item.title}
                          </NavLink>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <div className="absolute left-[2%] top-0 -z-10 h-4 w-4 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
            </div>
          </div>
          {/* signup login dashboard */}
          <div className="flex sm:gap-x-5 gap-x-2 items-center">
            {user && user?.accountType !== "Instructor" && (
              <NavLink to="/dashboard/cart" className="relative sm:mr-0 mr-1">
                <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                {totalItems > 0 && (
                  <span className="animate-bounce absolute bottom-[11px] -right-[7px] grid h-4 w-4 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-[10px] font-bold text-yellow-100 ">
                    {totalItems}
                  </span>
                )}
              </NavLink>
            )}

            {token === null && (
              <NavLink to="/login">
                <button className="border border-richblack-700 bg-richblack-800 sm:px-[12px] px-[8px] py-[4px] sm:py-[8px] text-richblack-100 rounded-md font-inter">
                  Log in
                </button>
              </NavLink>
            )}

            {token === null && (
              <NavLink to="/signup">
                <button className="border border-richblack-700 bg-richblack-800 sm:px-[12px] px-[8px] py-[4px] sm:py-[8px] text-richblack-100 rounded-md font-inter">
                  Sign up
                </button>
              </NavLink>
            )}

            {token !== null && <ProfileDropDown />}
          </div>
        </div>
      </div>
      <div
        className={`${
          location.pathname !== "/" ? "bg-richblack-600" : "bg-richblack-900"
        } transition-all hidden duration-200 w-full md:flex h-14 items-center justify-center fixed top-0 z-50 border-b-[1px] border-b-richblack-700`}
      >
        <div className="flex justify-between w-11/12 max-w-maxContent items-center">
          {/* Image */}
          <NavLink to="/">
            <img
              className="cursor-pointer"
              src={Logo_Full_Light}
              alt="logo"
              width={160}
              height={42}
              loading="lazy"
            />
          </NavLink>
          {/* Nav Link  */}
          <nav>
            <ul className="flex gap-x-6 text-richblack-25 text-[17px] font-inter">
              {NavbarLinks.map((item, i) => {
                return (
                  <li className="" key={i}>
                      <NavLink
                        className={`${
                          matchRoute(item?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                        to={item?.path}
                      >
                        {item.title}
                      </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* signup login dashboard */}
          <div className="flex gap-x-5 items-center">
            {user && user?.accountType !== "Instructor" &&user?.accountType !== "Admin" && (
              <NavLink to="/dashboard/cart" className="relative">
                <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                {totalItems > 0 && (
                  <span className="animate-bounce absolute bottom-[11px] -right-[7px] grid h-4 w-4 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-[10px] font-bold text-yellow-100 ">
                    {totalItems}
                  </span>
                )}
              </NavLink>
            )}

            {token === null && (
              <NavLink to="/login">
                <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md font-inter">
                  Log in
                </button>
              </NavLink>
            )}

            {token === null && (
              <NavLink to="/signup">
                <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md font-inter">
                  Sign up
                </button>
              </NavLink>
            )}

            {token !== null && <ProfileDropDown />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
