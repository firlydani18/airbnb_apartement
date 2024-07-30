import {NextFunction, Request, Response} from "express";

import {HotelSearchResponse, RoomType, RoomWithAvailability, RoomAvailabilityType} from "../shared/types";
import {constructSearchQuery} from "../helpers/searchQuery";
import {appError} from "../helpers/appError";
import Room from "../models/roomModel";
import RoomAvailability from "../models/roomAvailabilityModel";
import { Op, QueryTypes } from "sequelize";
import Availability from "../models/Availability";
import sequelize from "sequelize";


// export async function searchHotels(req: Request, res: Response, next: NextFunction) {
//   try {
//     const query = constructSearchQuery(req.query);
//     let sortOptions: Array<any> = [];
//     switch (req.query.sortOptions) {
//       case 'starRating':
//         sortOptions.push(['starRating', 'DESC']);
//         break;
//       case 'pricePerNightAsc':
//         sortOptions.push([{ model: RoomAvailability, as: 'roomAvailabilitys' }, 'price', 'ASC']);
//         break;
//       case 'pricePerNightDesc':
//         sortOptions.push([{ model: RoomAvailability, as: 'roomAvailabilitys' }, 'price', 'DESC']);
//         break;
//       case 'latest':
//         sortOptions.push(['lastUpdated', 'DESC']);
//         break;
//     }

//     const pageSize = 5;
//     const pageNumber = parseInt(req.query.page ? req.query.page.toString() : '1');
//     const skip = (pageNumber - 1) * pageSize;

//     const { count, rows } = await Room.findAndCountAll({
//       where: query,
//       include: [
//         {
//           model: RoomAvailability,
//           as: 'roomAvailabilitys',
//           include: [
//             {
//               model: Availability,
//               as: 'availabilities',
//             }
//           ]
//         },
//       ],
//       order: sortOptions.length ? sortOptions : undefined,
//       offset: skip,
//       limit: pageSize,
//     });

//     if (req.query.date) {
//       const date = new Date(req.query.date.toString());
//       const roomIds = rows.map(room => room.id);

//       const roomAvailabilities = await RoomAvailability.findAll({
//         where: {
//           roomId: { [Op.in]: roomIds },
//           // availability: {
//           //   [Op.contains]: [{ date }],
//           // },
//         },
//       });

//       rows.forEach(room => {
//         const availabilities = (room as any).roomAvailabilities.flatMap((ra: any) => 
//           ra.availabilities.filter((avail: any) => new Date(avail.date).getTime() === date.getTime())
//         );

//         (room as any).roomAvailabilities = availabilities.length > 0
//           ? [{ roomName: room.name, availabilities }]
//           : [];
//       });
//     }
    
//     const response = {
//       rooms: rows,
//       pagination: {
//         totalDocument: count,
//         page: pageNumber,
//         pages: Math.ceil(count / pageSize),
//       },
//     };

//     res.status(200).json({
//       status: 'success',
//       response,
//     });
//   } catch (err) {
//     next(err);
//   }
// }






// export async function hotelDetail(req: Request, res: Response, next: NextFunction) {
//   try {
//     const { roomId } = req.params;
//     const { selectedDate } = req.query;

//     if (!roomId) {
//       return next(appError(400, 'Room ID is required'));
//     }

// //     const selectedDateObj = selectedDate ? new Date(selectedDate.toString()) : null;

// //  // Temukan ruangan berdasarkan ID
// //     const room = await Room.findByPk(roomId
// //       , {
// //         include: [
// //           {
// //             model: RoomAvailability,
// //             as: 'roomAvailabilities',
// //             include: [
// //               {
// //                 model: Availability,
// //                 as: 'availabilities',
// //                 where: selectedDateObj
// //                   ? { date: selectedDateObj }
// //                   : undefined
// //               }
// //             ]
// //           }
// //         ]
// //       });

// //     if (!room) {
// //       return next(appError(404, 'Room not found'));
// //     }

// //       // Jika tanggal dipilih, filter ketersediaan
// //       if (selectedDateObj) {
// //         const availabilities = room.roomAvailabilities?.flatMap((ra) =>
// //           ra.availabilities?.filter((avail) => new Date(avail.date).getTime() === selectedDateObj.getTime())
// //         ) || [];
  
// //         // Tambahkan harga ketersediaan pada tanggal yang dipilih ke data room
// //         room.dataValues.availabilities = availabilities;

// //         room.roomAvailabilities.
// //       }
// //       res.status(200).json({
// //         status: 'success',
// //         room
// //       });
  


// if (!selectedDate) {
//   return next(appError(400, 'Selected date is required'));
// }

// const selectedDateStr = new Date(selectedDate.toString()).toISOString().split('T')[0]; // Format YYYY-MM-DD

// // Jalankan query untuk mendapatkan harga dan ketersediaan
// const query = `
//   SELECT
//     r.id AS roomId,
//     r.name AS roomName,
//     a.date,
//     a.availableRooms,
//     a.price
//   FROM
//     rooms r
//   JOIN
//     room_availabilities ra ON r.id = ra.roomId
//   JOIN
//     availabilities a ON ra.id = a.roomAvailabilityId
//   WHERE
//     a.date = :selectedDate
//     AND r.id = :roomId;
// `;

// const result = await sequelize.query(query, {
//   replacements: { selectedDate: selectedDateStr, roomId },
//   type: QueryTypes.SELECT,
// });

// if (result.length === 0) {
//   return res.status(404).json({ message: 'No availability found for the given date' });
// }

// res.status(200).json({
//   status: 'success',
//   data: result
// });
  
//   } catch (err) {
//     next(err);
//   }
// }


export async function hotelsWithAvailability(req: Request, res: Response, next: NextFunction) {
  try {
    const { date } = req.params;
    const targetDate = new Date(date);

    // Validate date
    if (isNaN(targetDate.getTime())) {
      return next(appError(400, 'Invalid date format'));
    }

    const rooms = await Room.findAll({
      include: [
        {
          model: RoomAvailability,
          as: 'availability',
          where: {
            date: targetDate,
            availableRooms: {
              [Op.gt]: 0,
            },
          },
        },
      ],
    });

    if (rooms.length === 0) {
      return res.status(404).json({ message: 'No rooms available for the specified date' });
    }

    res.status(200).json({
      status: 'success',
      rooms,
    });
  } catch (err) {
    next(err);
  }
};



export async function Allhotels(req: Request, res: Response, next: NextFunction) {
  try {
    const rooms = await Room.findAll({
      order: [['lastUpdated', 'DESC']],
    });
    res.json(rooms);
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ message: 'Error fetching hotels' });
  }
};

export async function searchAvailability(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { roomId, date } = req.query; // Assuming date is a query parameter

    if (!roomId || !date) {
      return next(appError(400, "Room ID and date are required"));
    }

    const availabilityDate = new Date(date as string);

    // Fetch room availability
    const roomAvailability = await RoomAvailability.findOne({
      where: { id: roomId as string },
      include: [{ model: Availability, as: 'availabilities' }]
    });

    if (!roomAvailability) {
      return next(appError(404, "Room Availability not found"));
    }

   // Find availability for the specified date
   const availableRoom = roomAvailability.availabilities?.find((avail: Availability) => new Date(avail.date).getTime() === availabilityDate.getTime());


    if (!availableRoom) {
      return next(appError(404, "No availability found for the given date"));
    }

    res.status(200).json({
      status: "success",
      availableRoom
    });
  } catch (err) {
    next(err);
  }
}

export async function searchHotels(req: Request, res: Response, next: NextFunction) {
  try {
    const query = constructSearchQuery(req.query);

    // Mengatur opsi pengurutan
    let sortOptions: Array<any> = [];
    switch (req.query.sortOptions) {
      case 'starRating':
        sortOptions.push(['starRating', 'DESC']);
        break;
      case 'pricePerNightAsc':
        sortOptions.push([{ model: RoomAvailability, as: 'roomAvailabilities' }, 'price', 'ASC']);
        break;
      case 'pricePerNightDesc':
        sortOptions.push([{ model: RoomAvailability, as: 'roomAvailabilities' }, 'price', 'DESC']);
        break;
      case 'latest':
        sortOptions.push(['lastUpdated', 'DESC']);
        break;
    }

    // Mengatur pagination
    const pageSize = 5;
    const pageNumber = parseInt(req.query.page ? req.query.page.toString() : '1');
    const skip = (pageNumber - 1) * pageSize;

    // Mencari ruangan dengan ketersediaan
    const { count, rows } = await Room.findAndCountAll({
      where: query,
      include: [
        {
          model: RoomAvailability,
          as: 'roomAvailabilities',
          include: [
            {
              model: Availability,
              as: 'availabilities',
            }
          ]
        },
      ],
      order: sortOptions.length ? sortOptions : undefined,
      offset: skip,
      limit: pageSize,
    });

    // Memfilter berdasarkan tanggal jika ada
    if (req.query.date) {
      const date = new Date(req.query.date.toString());

      // Mengambil ID ruangan yang ditemukan
      const roomIds = rows.map(room => room.id);

      // Mencari ketersediaan ruangan untuk tanggal yang diberikan
      const roomAvailabilities = await RoomAvailability.findAll({
        where: {
          id: { [Op.in]: roomIds }
        },
        include: [
          {
            model: RoomAvailability,
            as: 'roomAvailabilities',
            include: [
              {
                model: Availability,
                as: 'availabilities',
                where: { date: date }
              }
            ]
          }
        ]
      });

      // Memperbarui data ruangan dengan ketersediaan dan harga yang sesuai
      rows.forEach(room => {
        const availabilities = (room as any).roomAvailabilities.flatMap((ra: any) => 
          ra.availabilities.filter((avail: any) => new Date(avail.date).getTime() === date.getTime())
        );

        (room as any).roomAvailabilities = availabilities.length > 0
          ? [{ roomName: room.name, availabilities }]
          : [];
      });

      // Menambahkan harga yang relevan ke respons
      rows.forEach(room => {
        const roomAvailability = (room as any).roomAvailabilities.find((ra: any) => 
          ra.availabilities.length > 0
        );

        if (roomAvailability) {
          const price = roomAvailability.availabilities[0].price;
          (room as any).price = price;
        }
      });
    }
    
    // Membuat respons dengan data ruangan, harga, dan pagination
    const response = {
      rooms: rows,
      pagination: {
        totalDocument: count,
        page: pageNumber,
        pages: Math.ceil(count / pageSize),
      },
    };

    res.status(200).json({
      status: 'success',
      response,
    });
  } catch (err) {
    next(err);
  }
}
