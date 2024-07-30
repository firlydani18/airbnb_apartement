import express from "express";
//import {AllUsers, currentUser, updateUser} from "../controllers/userController";
//import {protect, restrictedTo} from "../middleware/middleware";
//import { AllUsers } from "../controllers/adminController";
import { currentUser, updateUser, getAllUsers } from "../controllers/userController";
import { protect, restrictedTo } from "../middleware/middleware";
//import { getUsers } from '../controllers/userController';



const userRouter = express.Router();
userRouter.get("/getAll", protect, restrictedTo("admin"), getAllUsers);
//userRouter.get("/getUsers", protect, getUsers);
//userRouter.get("/getAllUser", protect, restrictedTo("admin"), AllUsers);
 //userRouter.get("/current-user", protect, currentUser);
userRouter.get("/current-user/:id", currentUser);
userRouter.put("/:id", protect, updateUser);
export default userRouter;
