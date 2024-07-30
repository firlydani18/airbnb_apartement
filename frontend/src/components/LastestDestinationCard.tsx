import {Link} from "react-router-dom";
import {RoomType} from "../../../backend/src/shared/types";

type Props = {
  room: RoomType;
  latest?: boolean;
};

const LatestDestinationCard = ({room, latest}: Props) => {
  return (
    <Link
      to={`/search/detail/${room.id}`}
      className="relative cursor-pointer overflow-hidden rounded-md shadow-lg shadow-slate-500 hover:shadow-xl"
    >
      <div className={`${latest ? "h-[500px]" : "h-[300px]"} `}>
        <img
          src={room.imageUrls[0]}
          className="w-full h-full object-cover object-center"
        ></img>
        
      </div>

      <div className="absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md">
        <span className="text-white font-bold tracking-tight text-2xl rounded-md  line-clamp-1">
          {room.name}
        </span>
        <p className="text-white italic text-sm">
          {room.city}
        </p>
      </div>
    </Link>
  );
};

export default LatestDestinationCard;
