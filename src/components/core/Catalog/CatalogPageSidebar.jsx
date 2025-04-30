import React, { useState } from "react";
import { CoursesPageSidebarLinks } from "../../../data/dashboard-links";
import SidebarLink from "../Dashboard/SidebarLink";

const CatalogSidebar = () => {

  return (
    <>
      <div className="flex md:h-[calc(100vh-3.5rem)] h-full min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
        <div className="flex flex-col">
          {CoursesPageSidebarLinks.map((link) => (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CatalogSidebar;
