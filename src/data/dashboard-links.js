import { ACCOUNT_TYPE } from "../utils/constants";
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/instructor",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscDashboard",
  },
  {
    id: 3,
    name: "My Courses",
    path: "/dashboard/my-courses",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscVm",
  },
  {
    id: 4,
    name: "Add Course",
    path: "/dashboard/add-course",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscAdd",
  },
  {
    id: 5,
    name: "Enrolled Courses",
    path: "/dashboard/enrolled-courses",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscMortarBoard",
  },
  {
    id: 6,
    name: "Your Cart",
    path: "/dashboard/cart",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscHistory",
  },
  {
    id: 7,
    name: "Cource Categories",
    path: "/dashboard/createCategory",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscNewFile",
  },
  {
    id: 8,
    name: "Support",
    path: "/dashboard/support",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscComment",
  },
  {
    id: 9,
    name: "Create Admin",
    path: "/dashboard/createAdmin",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscAdd",
  },
];

export const CoursesPageSidebarLinks = [
  {
    id: 1,
    name: "Home",
    path: "/explore/home",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Catalogs",
    path: "/explore/catalogs",
    icon: "VscAccount",
  },
];