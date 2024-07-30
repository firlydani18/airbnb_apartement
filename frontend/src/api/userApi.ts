
import { UserType } from "../../../backend/src/shared/types";
import {API_URL} from "../contants/contant";
import {UpdateProfileForm} from "../pages/Profile";



export async function currentUserApi(): Promise<UserType> {
  const response = await fetch(`${API_URL}/api/v1/user/current-user`, {
    credentials: "include",
  });
  const responseBody = await response.json();
  if (!response.ok || responseBody.status === "failed") {
    throw new Error(responseBody.message);
  }
  return responseBody.user;
}

export async function updateUserApi(formData: UpdateProfileForm) {
  const response = await fetch(`${API_URL}/api/v1/user/`, {
    credentials: "include",
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();
  console.log(responseBody);
  if (!response.ok || responseBody.status === "failed") {
    throw new Error(responseBody.message);
  }
  return responseBody.user;
}

// export const getAllUsersApi = async ({ token }: { token: string }): Promise<UserType[]> => {
// // export async function getAllUsersApi(token: string): Promise<UserType[]> {
//   const response = await fetch(`${API_URL}/api/v1/user/getAll`, {
//     credentials: "include",
//     headers: {
//       Authorization: `Bearer ${token}`, // Menggunakan token dalam header Authorization
//       "Content-Type": "application/json",
//     },
//   });
//   const responseBody = await response.json();
//   if (!response.ok || responseBody.status === "failed") {
//     throw new Error(responseBody.message);
//   }
//   return responseBody.users; // Assuming the API returns an array of users
// }


export async function getAllUsersApi(): Promise<UserType[]> {
//export const getAllUsersApi = async(): Promise<UserType[]> => {
  const response = await fetch(`${API_URL}/api/v1/user/getAll`, {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming the token is stored in localStorage
    },
  });
  const responseBody = await response.json();
  if (!response.ok || responseBody.status === "failed") {
    throw new Error(responseBody.message);
  }
  return responseBody.allUser;
}