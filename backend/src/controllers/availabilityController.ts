// controllers/availabilityController.ts
import { NextFunction, Request, Response } from 'express';
import { appError } from '../helpers/appError';
import RoomAvailability from '../models/roomAvailabilityModel';
import Availability from '../models/Availability';




export const getAvailability = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    // Temukan ruangan berdasarkan ID
    const room = await RoomAvailability.findByPk(id, { include: [{ model: Availability, as: 'availabilities' }] });
    if (!room) {
      return next(appError(404, 'Room not found'));
    }

    // Kembalikan ketersediaan ruangan
    res.status(200).json({
      message: 'Availability retrieved successfully',
      availability: room.availabilities,
    });
  } catch (error) {
    next(error);
  }
};

// Fungsi untuk membuat Room
export const createRoomAvail = async (req: Request, res: Response, next: NextFunction) => {
  const { roomId, roomName } = req.body;

  try {
    const newRoom = new RoomAvailability({
      roomId,
      roomName,
      // availabilities: [] // Inisialisasi dengan array kosong
    });

    await newRoom.save();
    res.status(201).json({ message: 'Room created successfully', newRoom });
  } catch (error) {
    next(error);
  }
};

export const updateRoomAvail = async (req: Request, res: Response, next: NextFunction) => {
  const { roomId } = req.params;
  const { roomName } = req.body;

  try {
    const [updated] = await RoomAvailability.update({ roomName }, { where: { id: roomId }, returning: true });
    if (!updated) {
      return next(appError(404, 'Room not found'));
    }

    const updatedRoom = await RoomAvailability.findByPk(roomId, { include: [{ model: Availability, as: 'availabilities' }] });
    res.status(200).json({ message: 'Room updated successfully', updatedRoom });
  } catch (error) {
    next(error);
  }

//   try {
//     const updatedRoom = await RoomAvailability.findByIdAndUpdate(roomId, { roomName }, { new: true });
//     if (!updatedRoom) {
//       return next(appError(404, 'Room not found'));
//     }
//     res.status(200).json({ message: 'Room updated successfully', updatedRoom });
//   } catch (error) {
//     next(error);
//   }
};

export const deleteRoomAvail = async (req: Request, res: Response, next: NextFunction) => {
  const { roomId } = req.params;

  // try {
  //   const deletedRoom = await RoomAvailability.findByIdAndDelete(roomId);
  //   if (!deletedRoom) {
  //     return next(appError(404, 'Room not found'));
  //   }
  //   res.status(200).json({ message: 'Room deleted successfully' });
  // } catch (error) {
  //   next(error);
  // }
  try {
  const deletedRoom = await RoomAvailability.destroy({ where: { id: roomId } });
  if (!deletedRoom) {
    return next(appError(404, 'Room not found'));
  }

  res.status(200).json({ message: 'Room deleted successfully' });
} catch (error) {
  next(error);
}
};

// Create availability for a specific room
export const createAvailability = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { availability  } = req.body;

  try {
    const roomAvailability = await RoomAvailability.findOne({ where: { id } });
    if (!roomAvailability) {
      return next(appError(404, 'Room not found'));
    }

    const newAvailabilities = availability.map((item: any) => ({
      roomAvailabilityId: roomAvailability.id,
      date: new Date(item.date),
      availableRooms: item.availableRooms,
      price: item.price
    }));

    await Availability.bulkCreate(newAvailabilities);

    res.status(201).json({ message: 'Availability added successfully' });
  } catch (error) {
    next(error);
  }
};

// Update availability for a specific room
export const updateAvailability = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { availability } = req.body;

  try {
    const roomAvailability = await RoomAvailability.findOne({ where: { id } });
    if (!roomAvailability) {
      return next(appError(404, 'Room not found'));
    }

    const existingAvailabilities = await Availability.findAll({ where: { roomAvailabilityId: roomAvailability.id } });

    const updates = availability.map((item: any) => {
      const existing = existingAvailabilities.find((avail: any) => 
        new Date(item.date).toISOString() === new Date(avail.date).toISOString());
      if (existing) {
        return Availability.update({ 
          availableRooms: item.availableRooms, 
          price: item.price }, 
          { where: { id: existing.id } });
      } else {
        return Availability.create({ 
          roomAvailabilityId: roomAvailability.id, 
          date: new Date(item.date), 
          availableRooms: item.availableRooms, 
          price: item.price });
      }
    });

    await Promise.all(updates);

    res.status(200).json({ message: 'Availability updated successfully' });
  } catch (error) {
    next(error);
  }
};

// Delete availability for a specific room
export const deleteAvailability = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { date } = req.body;

  try {
    const roomAvailability = await RoomAvailability.findByPk(id);
    if (!roomAvailability) {
      return next(appError(404, 'Room not found'));
    }

    await Availability.destroy({
      where: {
        roomAvailabilityId: roomAvailability.id,
        date: new Date(date)
      }
    });

    res.status(200).json({ message: 'Availability deleted successfully' });
  } catch (error) {
    next(error);
  }
};
