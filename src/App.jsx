import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import Protect from "./components/core/Auth/Protect";

import Dashboard from "./pages/Dashboard";

import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute";

import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";

// Admin routes
import AdminMessages from "./components/core/Admin/AdminMessages";
import CreateAdmin from "./components/core/Admin/CreateAdmin";
import CreateCategory from "./components/core/Admin/CreateCategory";
import ApprovalList from "./components/core/Admin/ApprovalList";
import VerifyEmailAdmin from "./components/core/Admin/VerifyEmailAdmin";

import Error from "./pages/Error";

import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/Settings/index";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import { ACCOUNT_TYPE } from "./utils/constants";
import Cart from "./components/core/Dashboard/Cart/index";
import { useSelector } from "react-redux";
import MyCourses from "./components/core/Dashboard/MyCourses";
import AddCourse from "./components/core/Dashboard/AddCourse";
import EditCourse from "./components/core/Dashboard/EditCourse";

import Catalog from "./pages/Catalog";
import ExplorePage from "./pages/ExplorePage";
import CourseDetails from "./pages/CourseDetails";
import ExploreHome from "./components/core/Catalog/ExploreHome";
import ExploreCatalog from "./components/core/Catalog/ExploreCatalog";

import VideoDetails from "./components/core/ViewCourse/VideoDetails";

import ViewCourse from "./pages/ViewCourse";

import Instructor from "./components/core/InstructorDashboard/Instructor";
import UpArrow from "./components/common/UpArrow";

function App() {
  const { user } = useSelector((state) => state.profile);
  return (
    <div className="min-h-screen w-screen bg-richblack-900 flex flex-col" id="section">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="about"
          element={
            // <OpenRoute>
            <About />
            // </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        <Route
          path="explore"
          element={
            <Protect>
              <ExplorePage />
            </Protect>
          }
        />
        <Route
          element={
            <ExplorePage />
          }
        >
          <Route path="explore/home" element={<ExploreHome />} />
          <Route path="explore/catalogs" element={<ExploreCatalog />} />
        </Route>
        <Route path="explore/catalogs/:catalogName" element={<Catalog />} />
        <Route path="explore/:courseId" element={<CourseDetails />} />

        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="contact"
          element={
            // <OpenRoute>
            <ContactUs />
            // </OpenRoute>
          }
        />
        <Route
          path="dashboard"
          element={
            <Protect>
              <Dashboard />
            </Protect>
          }
        />
        <Route
          element={
            <Protect>
              <Dashboard />
            </Protect>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/settings" element={<Settings />} />
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="dashboard/cart" element={<Cart />} />
              <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
            </>
          )}
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/instructor" element={<Instructor />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
            </>
          )}
          {user?.accountType === ACCOUNT_TYPE.ADMIN && (
            <>
              <Route path="dashboard/support" element={<AdminMessages />} />
              <Route path="dashboard/createAdmin" element={<CreateAdmin />} />
              <Route path="dashboard/verifyemail" element={<VerifyEmailAdmin />} />
              <Route path="dashboard/createCategory" element={<CreateCategory />} />
              <Route path="dashboard/instructorApproval" element={<ApprovalList />} />
            </>
          )}
        </Route>

        <Route
          path="viewcource"
          element={
            <Protect>
              <ViewCourse />
            </Protect>
          }
        />
        <Route
          element={
            <Protect>
              <ViewCourse />
            </Protect>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
      <UpArrow />
    </div>
  );
}

export default App;
