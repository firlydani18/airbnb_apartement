
import { useQuery } from "react-query";
import { getAllUsersApi } from "../api/userApi";
import Loader from "../components/ui/Loader";
import UserList from "../components/UserList";



export default function AllUsers() {
  const { data: userData, isLoading } = useQuery("allUsers", getAllUsersApi);

  if (isLoading) return <Loader />;

  return (
    <div id="main-container" className="flex flex-col pt-44 gap-8 font-Poppins">
      <div id="header-info" className="flex flex-col px-20">
        <span id="header-title" className="md:text-3xl text-2xl md:text-left text-center font-Poppins">
          Daftar Users
        </span>
        <span id="header-description" className="text-[#828282] text-xs md:text-base">
          Lihat informasi mengenai users
        </span>
      </div>

      <div id="users-container" className="flex justify-center items-center">
        {/* <div id="users-list" className="flex flex-col lg:h-[60vh] h-[35vh] gap-5 mb-20 border-2 border-slate-50 p-2 md:p-5 overflow-y-scroll w-[90vw]">
          {userData && userData.length > 0 ? (
            <UserList userData={userData} />
          ) : (
            <span>No users found</span>
          )}
        </div> */}
        <div>
        <h2 className="text-lg font-medium text-blue-800 text-center">
          Total Listing: {userData?.length}
        </h2>
      </div>
      {!userData && <span>No Hotel found</span>}
      {userData && !isLoading && <UserList users={userData!} />}
    </div>
      </div>
   
  );
}



// // src/pages/AllUsers.tsx
// import { useQuery } from "react-query";
// import { getAllUsersApi } from "../api/userApi";
// import Loader from "../components/ui/Loader";
// import UserList from "../components/userList";
// //import UserList { UserListProps } from "../components/userList";


// export default function AllUsers() {
//   const { data: userData, isLoading } = useQuery("allUsers", getAllUsersApi);
//  //const dataUser = userData?.slice(2) || [];
//   if (isLoading) return <Loader />;


//   return (
//     <div id="main-container" className="flex flex-col pt-44 gap-8 font-Poppins">
//       <div id="header-info" className="flex flex-col px-20">
//         <span id="header-title" className="md:text-3xl text-2xl md:text-left text-center font-Poppins">
//           Daftar Users
//         </span>
//         <span id="header-description" className="text-[#828282] text-xs md:text-base">
//           Lihat informasi mengenai users
//         </span>
//       </div>

//       <div id="users-container" className="flex justify-center items-center">
//         <div id="users-list" className="flex flex-col lg:h-[60vh] h-[35vh] gap-5 mb-20 border-2 border-slate-50 p-2 md:p-5 overflow-y-scroll w-[90vw]">

//         {userData && userData.map((user,  key) => {
//             return  <UserList
//                     key={key}
//                 id={`user-${key}`}
//                 firstName={user.firstName}
//                 lastName={user.lastName}
//                 email={user.email}
//               />
// })}

//         </div>
//       </div>



//       {/* <div id="users-container" className="flex justify-center items-center">
//         <div id="users-list" className="flex flex-col lg:h-[60vh] h-[35vh] gap-5 mb-20 border-2 border-slate-50 p-2 md:p-5 overflow-y-scroll w-[90vw]">
//         { dataUser.map((userData) => (
//               <UserList
//                 // key={userData._id}
//                 userData={userData!}
//                 // first={userData.firstName}
//                 // last={userData.lastName}
//                 // email={userData.email}
//               />
//             ))}
//         </div>
//       </div> */}


//     </div>
//   );
// }










// // // src/components/UsersList.tsx

// import { useQuery } from 'react-query';
// import { getAllUsersApi } from '../api/userApi';
// import Loader from '../components/ui/Loader';
// import User from 'backend/src/model/userModel';


// export default function AllUsers() {
//   const { data: userData, isLoading } = useQuery("allUsers", getAllUsersApi, {
//     onError: () => {},
//   });

//   if (isLoading) return <Loader />;
  
//   return (
//     <div>
//       <h2>Users List</h2>
//       {Error ? (
//         <div>{Error}</div>
//       ) : (
//       <ul>
//         {User.map((Users: any) => (
//           <li key={Users._id}>
//             {Users.firstName} {Users.lastName} - {Users.email}
//           </li>
//         ))}
//       </ul>
//       )}
//     </div>
//   );
// };

// export default UsersList;




  // return (
  //   <div>
  //     <p
  //       onClick={() => navigate(-1)}
  //       className="hover:underline cursor-pointer text-blue-500 font-semibold text-sm"
  //     >
  //       &#x25c0; Back
  //     </p>

  //     {users.length > 0 ? (
  //       <div className="space-y-3">
  //         {users.map((user) => (
  //           <div key={user._id} className="space-y-3">
  //             <header className="md:space-y-1">
  //               <h1 className="flex text-lg md:text-2xl text-blue-600 font-extrabold capitalize gap-2">
  //                 {user.firstName} {user.lastName}
  //               </h1>
  //             </header>
  //             <section>
  //               <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
  //                 <div className="whitespace-pre-line text-sm">
  //                   {user.email}
  //                 </div>
  //               </div>
  //             </section>
  //             <section className="space-y-2">
  //               <h3 className="text-lg font-bold">User Details</h3>
  //               <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
  //                 <div className="rounded-md bg-green-500 text-white font-semibold shadow-lg text-center p-3">
  //                   Email: {user.email}
  //                 </div>
  //                 {/* Add more user details as needed */}
  //               </div>
  //             </section>
  //           </div>
  //         ))}
  //       </div>
  //     ) : (
  //       <div>No users found.</div>
  //     )}
  //   </div>
  // );
