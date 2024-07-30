import { useQuery} from "react-query";
import {useNavigate, useParams} from "react-router-dom";
import {fetchHotelById} from "../api/searchApi";
import {AiFillStar} from "react-icons/ai";
import {MdLocationOn} from "react-icons/md";
import {useState} from "react";
import {BuildingOffice2Icon} from "@heroicons/react/24/solid";
import GuestInfoForm  from "../components/Form/GuestInfoForm/GuestInfoForm";
import Loader from "../components/ui/Loader";
import { AvailabilityType } from "../../../backend/src/shared/types";

//import HotelAvailabilityForm from "../components/AvailabilityComponent";
//import { deleteHotelById } from "../api/hotelApi";

export default function HotelDetail() {
  const {roomId} = useParams();
  const [displayImage, setDisplayImage] = useState("");
  const {data: room, isLoading} = useQuery(
    "fetchRoomById",
    () => fetchHotelById(roomId as string),
    {
      enabled: !!roomId,
    }
  );
  const navigate = useNavigate();



  // const queryClient = useQueryClient(); // Untuk mengupdate cache setelah delete

  // const { mutate, isLoading: isDeleting } = useMutation(deleteHotelById, {
  //   onSuccess: () => {
  //     alert('Hotel deleted successfully');
  //     queryClient.invalidateQueries('fetchHotelById'); // Mengupdate cache setelah delete
  //     navigate('/my-hotels'); // Redirect ke halaman setelah delete berhasil
  //   },
  //   onError: () => {
  //     alert('Error deleting hotel');
  //   }
  // });

  // const handleDelete = async () => {
  //   if (window.confirm('Are you sure you want to delete this hotel?')) {
  //     try {
  //       await mutate(hotelId!); // Mengirim hotelId sebagai parameter ke deleteHotelById
  //     } catch (error) {
  //       console.error('Error deleting hotel:', error);
  //     }
  //   }
  // };

  if (isLoading) return <Loader />;
  if (!room) return <p>No hotel data available</p>;

  // Format data availability untuk dikirim ke GuestInfoForm
  //const availability: AvailabilityType[] = room.Availability.flat();
  const availability: AvailabilityType[] = room.roomAvailabilitys.flatMap((ra) => ra.availability);

  return (
    <div>
      <p
        onClick={() => navigate(-1)}
        className="hover:underline cursor-pointer text-blue-500 font-semibold text-sm"
      >
        &#x25c0; Back to Search
      </p>
      {!isLoading && room && (
        <div className="space-y-3">
          <header className="md:space-y-1">
            <h1 className="flex text-lg md:text-2xl  text-blue-600 font-extrabold  capitalize gap-2">
              {room.name}
              <span className="flex items-center">
                {Array.from({length: room.starRating}).map((_, i) => (
                  <AiFillStar key={i} className="fill-yellow-500 h-4" />
                ))}
              </span>
            </h1>
            <article className="flex gap-2">
              <p className="text-sm font-bold italic text-blue-600 flex items-center">
                <MdLocationOn className="h-4 w-4 text-green-600" />
                {room.city}, 
                
                {/* {hotel.country} */}
              </p>
              <p className="text-sm font-bold italic text-blue-600 flex items-center gap-1">
                <BuildingOffice2Icon className="h-4 w-4 text-green-600" />
                {room.type}
              </p>
            </article>
          </header>

          <section className="">
            {/* <div className="flex flex-col md:flex-row gap-2"> */}
            <div className="grid md:grid-cols-[5fr_1fr] gap-2">
              <div className="h-[550px]">
                <img
                  src={displayImage || room.imageUrls[0]}
                  alt="thumbPic"
                  className={`w-full h-full object-fill md:object-cover object-center rounded-md transition-all duration-200 `}
                />
              </div>
              <div className="flex md:flex-col gap-2">
                {room.imageUrls.map((image) => (
                  <div className="h-[100px]" key={image}>
                    <img
                      src={image}
                      alt="hotelImage"
                      className={`w-full h-full object-fill md:object-cover cursor-pointer transition-all duration-700 ${
                        displayImage === image && "grayscale opacity-70"
                      } rounded-md`}
                      onClick={() => setDisplayImage(image)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
              <div className="whitespace-pre-line text-sm">
                {room.description}
              </div>
              <div className="h-fit ml-3">
                <GuestInfoForm
                  // pricePerNight={room.pricePerNight}
                  availability={availability}
                  //pricePerNight={hotel.availability[0]?.price || 0}
                  roomId={room.id}
                />
              </div>
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-bold">Most popular facilities</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {room.facilities.map((facility) => (
                <div
                  key={facility}
                  className=" rounded-md bg-green-500 text-white font-semibold shadow-lg text-center p-3"
                >
                  {facility}
                </div>
              ))}
              {room.breakfast === "Yes" && (
                <div className="rounded-md bg-green-500 text-white font-semibold shadow-lg text-center p-3">
                  Breakfast Included
                </div>
              )}
            </div>
          </section>  
        </div>
      )}
    </div>
  );
}
