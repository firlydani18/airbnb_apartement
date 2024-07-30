import express from "express";
import { Allhotels, hotelsWithAvailability, searchHotels } from "../controllers/searchHotelController";


const searchRouter = express.Router();
searchRouter.get("/search", searchHotels);
searchRouter.get("/", Allhotels);
//searchRouter.get("/:roomId", hotelDetail);
searchRouter.get('/hotels-with-availability/:date', hotelsWithAvailability);

export default searchRouter;
