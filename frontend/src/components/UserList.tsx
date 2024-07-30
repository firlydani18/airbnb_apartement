// import { UserType } from "backend/src/shared/types";

// export interface UserListProps {
//   userData: UserType[];
// }

// const UserList: React.FC<UserListProps> = ({ userData }) => {
//   return (
//     <div className="flex flex-col gap-5 bg-[#E5F3FF] md:p-5 p-2 rounded-md w-full">
//       {userData.map((user) => (
//         <div key={user._id} className="flex flex-col mb-2">
//           <span id="firstName" className="font-semibold">
//             {user.firstName}
//           </span>
//           <span id="firstName" className="text-[#999999] text-xs md:text-base">
//             Nama depan: {user.firstName}
//           </span>
//           <span id="lastName" className="text-[#999999] text-xs md:text-base">
//             Nama belakang: {user.lastName}
//           </span>
//           <span id="email" className="text-[#999999] text-xs md:text-base">
//             Email: {user.email}
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default UserList;



import React from 'react';
import { UserType } from '../../../backend/src/shared/types';
// Pastikan path sesuai dengan definisi UserType

type UserListProps = {
  users: UserType[];
};

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div className="grid gap-4 rounded-lg border border-slate-300 p-5">
      <h2 className="text-xl font-bold">List of Users</h2>
      {users.map((user) => (
        <div key={user.id} className="border-b py-2">
          Name:
          <div className="font-bold">{`${user.firstName} ${user.lastName}`}</div>
          <div>Email: {user.email}</div>
          {/* Add more user details as needed */}
        </div>
      ))}
    </div>
  );
};

export default UserList;
