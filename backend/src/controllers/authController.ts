// import {NextFunction, Request, Response} from "express";
// //import User from "../model/userModel";
// import {appError} from "../helpers/appError";
// import bcrypt from "bcryptjs";
// import {createJWTandCookie} from "../helpers/JWTandCookie";
// //import { User } from "../model/userModel";
// import { where } from "sequelize";
import {Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt';
import { createJWTandCookie } from "../helpers/JWTandCookie";
import User from "../models/userModel";
import { appError } from "../helpers/appError";

//import  User  from "../model/userModel";
// //import User from "../model/userModel";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {

  try {
    const user = await User.findOne({where : { email: req.body.email }});

    if (user) {
      return next(appError(400, "User already exists"));
    }

    if (req.body.password !== req.body.passwordConfirm) {
      return next(appError(400, "Both password should be matching"));
   }

    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
     // email, password, passwordConfirm, firstName, lastName
    });

    const token = createJWTandCookie(res, newUser.id);

    res.status(201).json({
      status: "success",
      user: newUser,
      token,
    });
  } catch (err) {
    next(err);
  }
}

//Login
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const {email, password} = req.body;
    if (!email || !password) {
      return next(appError(400, "Email and Password are required"));
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(appError(404, "User not found"));
    }

    const isMatch = await bcrypt.compare(password, user.password as string);
  
    if (!isMatch) {
      return next(appError(400, "Incorrect Password or Email"));
    }

    const token = createJWTandCookie(res, user.id);
    res.status(302).json({
      status: "success",
      user,
      token,
    });
  } catch (err) {
    next(err);
  }
}

export async function logout(req: Request, res: Response) {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  res.status(200).json({
    status: "success",
    message: "Logout successfully",
  });
}

export function validateToken(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).send({status: "success", users: req.userId});
  } catch (err) {
    next(err);
  }
}

// // export const google = async (
// //   req: Request,
// //   res: Response,
// //   next: NextFunction
// // ) => {
// //   try {
// //     const user = await User.findOne({email: req.body.email});
// //     if (user) {
// //       //if user exist signIn directly
// //       req.user = user;
// //       const token = createJWTandCookie(res, user._id);
// //       user.password = undefined;
// //       res.status(200).json({
// //         status: "success",
// //         user,
// //         token,
// //       });
// //     } else {
// //       //if user donot exist generate the password and create the user in database
// //       const generatedPassword =
// //         Math.random().toString(36).slice(-8) +
// //         Math.random().toString(36).slice(-8);
// //       const hashedPassword = await bcrypt.hash(generatedPassword, 12);
// //       const generatedUsername = req.body.name.split(" ");
// //       const firstName = generatedUsername[0];
// //       const lastName = generatedUsername[1];
// //       const newUser = new User({
// //         firstName: firstName,
// //         lastName: lastName,
// //         email: req.body.email,
// //         password: hashedPassword,
// //         passwordConfirm: hashedPassword,
// //         avatar: req.body.avatar,
// //       });
// //       console.log(newUser);
// //       await newUser.save();
// //       req.user = newUser;
// //       const token = createJWTandCookie(res, newUser._id);
// //       newUser.password = undefined;
// //       res.status(200).json({
// //         status: "success",
// //         user: newUser,
// //         token,
// //       });
// //     }
// //   } catch (err) {
// //     next(err);
// //   }
// // };
