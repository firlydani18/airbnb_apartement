
// const app = express();

import sequelize from "./config/db";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import express, {NextFunction, Request, Response} from "express";
import path from "path";
import authRouter from "./routes/authRoute";
import { myRoom } from "./controllers/roomControllers";
import roomRouter from "./routes/myRoomRoute";
import uploadRouter from "./routes/uploadRoute";
import searchRouter from "./routes/searchHotelRoute";
import availability from "./routes/availability";
import userRouter from "./routes/userRoute";
import User from "./models/userModel";
import Booking from "./models/bookingModel";
import Availability from "./models/Availability";
import RoomAvailability from "./models/roomAvailabilityModel";
import Room from './models/roomModel';

const app = express();

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log("Server is running on localhost:7000");
});
//For render deployment
app.use(express.static(path.join(process.cwd(), "../frontend/dist")));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: process.env.FRONTEND_URL, credentials: true}));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/my-apartement", roomRouter);
app.use("/api/v1/hotel", searchRouter);
app.use("/api/v1/upload", uploadRouter);
//app.use("/api/v1/booking", bookingRouter);
//app.use("/api/v1/my-booking", myBookingRouter);
// app.use('/api/v1/set-availability', setAvailabilityRoutes);
// app.use('/api/v1/rooms/availability', setAvailabilityRoutes);

app.use('/api/v1/availability', availability);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// // Menginisialisasi asosiasi
// User.associate({ Room, Booking });
// Room.associate({ RoomAvailability });
// RoomAvailability.associate({ Availability });
// Availability.associate({ RoomAvailability });
// Booking.associate({ User });

const startServer = async () => {
  try {
    await sequelize.authenticate();
    //await sequelize.sync();
    await sequelize.sync({ alter: true });
    console.log('Database connected and synced');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();

//This should be after all api routes
//This will solve manual refresh issue
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend", "dist", "index.html"));
});

//Error
interface Error {
  statusCode?: number;
  message?: string;
}
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";
  if (err.message!.startsWith("E110")) {
    message = "Name already exist";
  }

  return res.status(statusCode).json({
    status: "failed",
    message,
  });
});
// export { User, Room, RoomAvailability, Availability, Booking };