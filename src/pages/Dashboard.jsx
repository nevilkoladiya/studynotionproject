import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../components/core/Dashboard/Sidebar";

import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";

const Dashboard = () => {

  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  const [burger, setburger] = useState(false);

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  function handleBurger() {
    setburger(!burger);
  }

  function handleOutsideBurger() {
    if (burger) {
      setburger(!burger)
    }
  }
  return (
    <div className="fixed top-14 w-full">
      <div className="relative flex md:flex-row flex-col min-h-[calc(100vh-3.5rem)]">
        {/* handle  mobile sidebar toggle */}
        <div className=" flex md:hidden z-20 opacity-100 ">
          <div className={`min-w-[220px] flex justify-between items-center z-20`}>
            <RxHamburgerMenu
              className="text-white z-10 m-2 w-[25px] h-[25px]"
              onClick={handleBurger}
            />
            {burger ? (
              <RxCross1
                className="text-white z-10 m-2 w-[15px] h-[15px] "
                onClick={handleBurger}
              />
            ) : (
              ""
            )}
          </div>
          <div className={`absolute ${burger ? "block h-full" : "hidden"}`}>
            <Sidebar />
          </div>
        </div>

        <div className="md:block hidden">
          <Sidebar />
        </div>

        {/* This code controls the main content area of your dashboard layout, especially handling the closing of the sidebar on mobile when someone clicks outside it.  */}
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto bg-richblack-900" onClick={handleOutsideBurger}>
          <div
            className={`mx-auto w-full max-w-[2000px] h-full z-10 md:py-10 py-4 ${burger ? "opacity-50" : "opacity-100"
              } md:opacity-100`}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
