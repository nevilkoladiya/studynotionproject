import React from "react";
import { useSelector } from "react-redux";
import IconBtn from "../../common/IconBtn";
import { useNavigate } from "react-router-dom";
import { RiEditBoxLine } from "react-icons/ri";
import { formattedDate } from "../../../utils/dateFormatter";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  // console.log(user?.additionalDetails?.dateOfBirth);
  return (
    <div className="w-10/12 mx-auto pb-6">
      <h1 className="mb-8 text-3xl font-medium text-richblack-5">My Profile</h1>

      {/* Profile photo and name section */}
      <section className="flex sm:items-center sm:flex-row flex-col sm:gap-0 gap-4 justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 sm:p-8 p-5 sm:px-12">
        <div className="flex flex-row items-center gap-x-2 sm:gap-x-4">
          <img
            src={user?.image}
            alt={`Profile-${user?.firstName}`}
            className="aspect-square w-[50px] sm:w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-richblack-5">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>
        <div className="sm:block flex justify-end sm:w-fit w-full">
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
      </section>

      {/* about sections */}
      <section className="sm:my-10 my-6 flex flex-col gap-y-5 rounded-md border-[1px] border-richblack-700 bg-richblack-800 sm:p-8 p-5 pl-0 sm:px-12">
        <div className="flex w-full flex-col sm:flex-row sm:gap-0 sm:items-start gap-4 items-center justify-between">
          <div className="w-[80%] flex flex-col sm:gap-6">
            <p className="text-lg font-semibold text-richblack-5">About</p>
            <p
              className={`${
                user?.additionalDetails?.about
                  ? "text-richblack-5"
                  : "text-richblack-400"
              } text-sm font-medium break-words w-[80%]`}
            >
              {user?.additionalDetails?.about ??
                "Write Something About Yourself"}
            </p>
          </div>
          <div className="sm:block flex justify-end sm:w-fit w-full">
            <IconBtn
              text="Edit"
              onclick={() => {
                navigate("/dashboard/settings");
              }}
            >
              <RiEditBoxLine />
            </IconBtn>
          </div>
        </div>
      </section>

      {/* sections for other details */}
      <section className="flex sm:flex-row flex-col sm:gap-0 gap-4 items-start justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 sm:p-8 p-5 sm:px-12">
        <div className="flex w-full flex-col">
          <p className="text-lg font-semibold text-richblack-5 mb-8">
            Personal Details
          </p>
          <div className="flex sm:flex-row flex-col max-w-[500px] gap-5 justify-between">
            <div className="flex flex-col gap-y-4">
              <div>
                <p className="mb-2 text-sm text-richblack-600">First Name</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.firstName}
                </p>
              </div>
              <div>
                <p className="mb-2 text-sm text-richblack-600">Email</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.email}
                </p>
              </div>
              <div>
                <p className="mb-2 text-sm text-richblack-600">Gender</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.additionalDetails?.gender ?? "Please Add Gender"}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-5">
              <div>
                <p className="mb-2 text-sm text-richblack-600">Last Name</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.lastName}
                </p>
              </div>
              <div>
                <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.additionalDetails?.contactNumber ??
                    "Add Contact Number"}
                </p>
              </div>
              <div>
                <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.additionalDetails?.dateOfBirth
                    ? formattedDate(user?.additionalDetails?.dateOfBirth)
                    : "Add Date Of Birth"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:block flex justify-end sm:w-fit w-full">
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
      </section>
    </div>
  );
};

export default MyProfile;
