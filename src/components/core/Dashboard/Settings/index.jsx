import ChangeProfilePicture from "./ChangeProfilePicture"
import EditProfile from "./EditProfile"
import DeleteAccount from "./DeleteAccount"
import UpdatePassword from "./UpdatePassword"

export default function Settings() {
  return (
    <div className="w-10/12 mx-auto pb-4">
      <h1 className="mb-8 text-3xl font-medium text-richblack-5">
        Edit Profile
      </h1>
      {/* Change Profile Picture */}
      <ChangeProfilePicture />
      {/* Profile */}
      <EditProfile />
      {/* Password */}
      <UpdatePassword />
      {/* Delete Account */}
      <DeleteAccount />
    </div>
  )
}