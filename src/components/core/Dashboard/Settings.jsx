// import React from 'react'

// const Settings = () => {
//   return (
//     <div>
//       <h1 className="mb-8 text-3xl font-medium text-richblack-5">
//         Edit Profile
//       </h1>

//       {/* Change Profile Picture */}
//       <section className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
//         <div className="flex items-center gap-x-4">
//           <img
//             src={user?.image}
//             alt={`Profile-${user?.firstName}`}
//             className="aspect-square w-[78px] rounded-full object-cover"
//           />
//           <div className="space-y-1">
//             <p className="text-lg font-semibold text-richblack-5">
//               {user?.firstName + " " + user?.lastName}
//             </p>
//             <p className="text-sm text-richblack-300">{user?.email}</p>
//           </div>
//         </div>
//         <IconBtn
//           text="Edit"
//           onclick={() => {
//             navigate("/dashboard/settings");
//           }}
//         >
//         </IconBtn>
//       </section>
//     </div>
//   )
// }

// export default Settings
