import {Request, Response, NextFunction} from "express";
import {appError} from "../helpers/appError";
import jwt from "jsonwebtoken";
//import User from "../model/userModel";
 import {UserType} from "../shared/types";
import { error } from "console";
import User from "../models/userModel";
//import { User } from "../model/userModel";

declare global {
  namespace Express {
    interface Request {
      user?: UserType;
    }
  }
}


export async function protect(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.token  || req.headers.authorization?.split(' ')[1];
    if (!token) {
      console.log("Token not found in cookies");
      return next(appError(401, "🙅🏻🙅🏻 You are not logged-in, Please login to access"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    console.log("Decoded token:", decoded);

    const currentUser = await User.findByPk(decoded.id);

    if (!currentUser) {
      console.log("User not found with ID:", decoded.id);
      return next(appError(401, "The user belonging to this token does not exist."));
    }

    console.log("Current user found:", currentUser);

    // Inisialisasi req.user dengan semua properti yang diperlukan oleh UserType
    req.user = {
      id: currentUser.id,
      email: currentUser.email,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      avatar: currentUser.avatar,
      role: currentUser.role || 'user',
      // tambahkan properti lain jika ada
    };

    next();
  } catch (err) {
    console.error("Error in protect middleware:", err);
    next(err);
  }
}
// // Restrict to admin
// export const restrictedTo =
//   (...role: ("admin" | "user")[]) =>
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       if (!req.user || !req.user.id || !req.user.role) {
//         return next(appError(401, "User not authenticated"));
//       }

//       //const user = await User.findByPk(req.user.id, { attributes: ["role"] });

//       // if (!user) {
//       //   return next(appError(404, "User not found"));
//       // }

//       // if (!role.includes(user.role!)) {
//       //   return next(appError(403, "You don't have the required permission"));
//       // }
//       if (!role.includes(req.user.role)) {
//         return next(appError(403, "You don't have the required permission"));
//       }

//       next();
//     } catch (err) {
//       next(err);
//     }
//   };



export const restrictedTo = (role: "admin") => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || req.user.role !== role) {
        return next(appError(403, "You don't have the required permission"));
      }
      next();
    } catch (err) {
      next(appError(500, "Server error"));
    }
  };
};

// export const restrictedTo = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     if (!req.user || !req.user.id || !req.user.role) {
//       return next(appError(401, "User not authenticated"));
//     }
//    // Ensure user is authenticated and role is available
//    const user = await User.findByPk(req.user.id, { attributes: ["role"] });
//    if (!user) {
//      return next(appError(404, "User not found"));
//    }

//    // Check if user has admin role
//    if (req.user.role !== "admin") {
//      return next(appError(403, "You are not authorized to perform this action"));
//    }

//    // If user has admin role, proceed to the next middleware/handler
//    next();
//  } catch (err) {
//    next(err);
//  }
// };