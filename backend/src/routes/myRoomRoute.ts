import express from "express";
import {upload} from "../helpers/upload";
import {protect, restrictedTo } from "../middleware/middleware";
import { createRoom, deleteRoomById, myRoom, RoomById, updateRoom } from "../controllers/roomControllers";


const roomRouter = express.Router();

roomRouter.post("/create-room", protect, upload.array("images", 6), createRoom);// 

//roomRouter.post("/create-room", restrictedTo("admin"), protect, upload.array("images", 6), createRoom);
//roomRouter.get("/",  protect, restrictedTo("admin"), myRoom);
roomRouter.get("/",  protect, myRoom);
roomRouter.get("/:roomId",  protect, RoomById);
//hotelRouter.patch("/:hotelId",  restrictedTo('admin'), protect, upload.array("images", 6), updateHotel);
//roomRouter.patch("/:roomId", protect, restrictedTo("admin"), upload.array("images", 6), updateRoom);
roomRouter.patch("/:roomId", protect, upload.array("images", 6), updateRoom);
roomRouter.delete('/:roomId',protect, deleteRoomById);

export default roomRouter;
