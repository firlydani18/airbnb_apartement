import {useQuery} from "react-query";
import {Link} from "react-router-dom";
import HotelList from "../components/Hotel/HotelList";
import Loader from "../components/ui/Loader";

import { myRoom } from "../api/hotelApi";
import { RoomType } from "../../../backend/src/shared/types";

export default function MyRoom() {
  const {data: hotelData, isLoading} = useQuery<RoomType[]>(
    "myRooms", 
    myRoom, 
    {
    onError: () => {},
  });
  if (isLoading) return <Loader />;

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Apartement</h1>
        <Link
          to="/my-apartement/create-room"
          className="flex bg-blue-600 text-white text-md font-bold p-2 hover:bg-blue-500 rounded-lg hover:opacity-90 shadow-md shadow-slate-400 hover:shadow-lg"
        >
          Add My Apartement
        </Link>
        {/* <Link
          to="/availability/add-stock"
          className="flex bg-blue-600 text-white text-md font-bold p-2 hover:bg-blue-500 rounded-lg hover:opacity-90 shadow-md shadow-slate-400 hover:shadow-lg"
        >
          Set Avalability
        </Link> */}
      </span>
      <div>
        <h2 className="text-lg font-medium text-blue-800 text-center">
          Total Listing: {hotelData?.length || 0}
        </h2>
      </div>
      {!hotelData?.length && <span>No Hotel found</span>}
      {/* {hotelData && !isLoading && <HotelList hotelData={hotelData!} />} */}
      {hotelData && <HotelList hotelData={hotelData} />}
    </div>
  );
}
