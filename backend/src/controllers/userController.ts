import {NextFunction, query, Request, Response} from "express";
//import User from "../model/userModel";
import {appError} from "../helpers/appError";
import { UserType } from "../shared/types";
import User from "../models/userModel";



export const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    throw new Error('Error fetching users: ' + { status: "error",
      message: "User error "});
  }
};

export const currentUser = async(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  try {
   
    // const { id } = req.params;
    const id = req.params.id;
    //const userId = req.user && req.user.id;
    const user = await User.findByPk(id,  { attributes: { exclude: ['password']} 
    });
    if (user) {
       res.status(200).json({
        success: true,
        user,
      });
    } else {
       res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user by id:', error);
     res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
   
    const id=req.params.id;

    const user = await User.findOne({where:{
            id:id,
        }})
    if (!user) return;
    user.avatar = req.body.avatar || user.avatar;
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;

    if (req.body.password) {
      user.password = req.body.password;
      user.passwordConfirm = req.body.password;
      await user.save();
    }

    // await user.save({validateBeforeSave: false});
    await user.save();

    res.status(201).json({
      status: "success",
      message: "User updated successfully..",
      user,
    });
  } catch (err) {
    next(err);
  }
};

// Delete user by ID
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({ where: { id } });
    if (deleted) {
      return res.status(204).json({ message: 'User deleted' });
    }
    return res.status(404).json({ error: 'User not found' });
  } catch (error) {
    throw new Error('Error fetching users: ' + { status: "error",
      message: "User error "});
  }
};