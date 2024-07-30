import { where } from 'sequelize';
import {NextFunction, Request, Response} from "express";
import {appError} from "../helpers/appError";
import { RoomType } from "../shared/types";
import Room from "../models/roomModel";
import { upload } from '../helpers/upload';
import RoomAvailability from '../models/roomAvailabilityModel';
import Availability from '../models/Availability';


export const uploadFiles = upload.array("images", 10);

// Middleware to check if the user is an admin
// function isAdmin(req: Request, res: Response, next: NextFunction) {
//   if (req.user && req.user.role === 'admin') {
//     next();
//   } else {
//     next(appError(403, "You are not authorized to perform this action"));
//   }
// }

export async function createRoom(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.files) return next(appError(400, "Upload atleast one image"));

    const imagesFile = req.files as Express.MulterS3.File[];
    const imageURLs = imagesFile.map((image) => image.location);
    const roomData: RoomType = req.body;
    roomData.imageUrls = imageURLs;
    roomData.lastUpdated = new Date();

    if (!req.user || !req.user.id) {
      return next(appError(401, "you User not authenticated"));
    }

    roomData.userId = req.user.id;

     // Optional fields: roomAvailabilitys and bookings
    //  roomData.roomAvailabilitys = roomData.roomAvailabilitys || [];
    //  roomData.bookings = roomData.bookings || [];
     
    //const room = await Room.create(roomData);
    const room = new Room(roomData);
    await room.save();
    res.status(200).json({
      status: "success",
      room,
    });
  } catch (err) {
    next(err);
  }
}

export async function myRoom(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      return next(appError(400, "Please login to access your listing"));
    }
    const myRoom = await Room.findAll({where: {userId: req.user.id}});
    res.status(200).json({
      status: "success",
      results: myRoom.length,
      myRoom,
    });
  } catch (err) {
    next(err);
  }
}

export async function RoomById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //const roomId = req.params.roomId.toString();
  const roomId = req.params.roomId.toString();
  try {
    // const room = await Room.findOne({where: {id: roomId, userId: req.user?.id},
    //   include: [
    //     {
    //       model: RoomAvailability,
    //       as: 'roomAvailabilities', // Make sure this alias matches the one defined in the model
    //     },
    //   ],
    
    // });
    const room = await Room.findOne({
      where: { id: roomId, userId: req.user?.id },
      include: [
        {
          model: RoomAvailability,
          as: 'roomAvailabilities', // Make sure this alias matches the one defined in the model
          include: [{
            model: Availability,
            as: 'availabilities',
          }]
        },
      ],
    });
    if (!room) {
      return next(appError(404, "Room not found"));
    }
    
    
    res.status(200).json({
      status: "success",
      room,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateRoom(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const roomId = req.params.roomId;
    const updatedRoomData: Partial<RoomType> = req.body;
    updatedRoomData.lastUpdated = new Date();

    // Cari kamar berdasarkan ID dan userId
    const room = await Room.findOne({
      where: {
        id: roomId,
        userId: req.user?.id
      }
    });

    if (!room) return next(appError(404, "Kamar tidak ditemukan"));

    if (req.user?.id !== room.userId) {
      return next(appError(401, "Anda tidak memiliki hak akses untuk mengedit kamar ini"));
    }

    // Perbarui informasi kamar
    await room.update(updatedRoomData);

    // Tangani gambar jika ada
    if (req.files) {
      const imagesFile = req.files as Express.MulterS3.File[];
      const imageURLs = imagesFile.map((image) => image.location);
      room.imageUrls = [...imageURLs, ...(updatedRoomData.imageUrls || [])];
    }

    await room.save();

    res.status(200).json({
      status: "success",
      room,
    });
  } catch (err) {
    next(err);
  }
}
export const deleteRoomById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const roomId = req.params.roomId;

  try {
    const room = await Room.findOne({
      where: {
        id: roomId,
        userId: req.user?.id
      }
    });

    if (!room) {
      return next(appError(404, "Kamar tidak ditemukan"));
    }

    await room.destroy();

    res.status(200).json({
      status: 'success',
      message: 'Kamar berhasil dihapus',
      room,
    });
  } catch (error) {
    console.error('Error deleting room:', error);
    next(appError(500, 'Terjadi kesalahan internal server'));
  }
};
// export const createHotelHandler = [isAdmin, createHotel];
// export const updateHotelHandler = [isAdmin, updateHotel];