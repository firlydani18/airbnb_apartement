import {FormProvider, useForm} from "react-hook-form";
import HotelDetailsSection from "./HotelDetailsSection";
import HotelTypes from "./HotelTypes";
import HotelFacilites from "./HotelFacilites";
import HotelGuests from "./HotelGuests";
import HotelImage from "./HotelImage";
import HotelBreakfast from "./HotelBreakfast";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { RoomType } from "../../../../../backend/src/shared/types";


export type RoomFormData = {
 // id: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  starRating: number;
  facilities: string[];
  images: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
  breakfast: string;
  availability: Availability[]; 
};
export type Availability = {
  date: Date;
  availableRooms: number;
  price: number;
};


interface Props {
  room?: RoomType;
  onSave: (roomFormData: FormData) => void;
  isLoading: boolean;
}

export default function ManageHotelForm({onSave, isLoading, room}: Props) {
  const navigate = useNavigate();
  const formMethods = useForm<RoomFormData>();
  const {handleSubmit, reset} = formMethods;
  const editPage = room ? true : false;
  //const editPage = Boolean(hotel);

  useEffect(() => {
    reset(room);
  }, [room, reset]);

  const onSubmit = handleSubmit((roomInput: RoomFormData) => {
    const formData = new FormData();
    if (room) {
      formData.append("id", room.id);
    }
    formData.append("name", roomInput.name);
    formData.append("city", roomInput.city);
    formData.append("country", roomInput.country);
    formData.append("description", roomInput.description);
    formData.append("type", roomInput.type);
    formData.append("starRating", roomInput.starRating.toString());
    formData.append("adultCount", roomInput.adultCount.toString());
    formData.append("childCount", roomInput.childCount.toString());
    formData.append("breakfast", roomInput.breakfast);

    roomInput.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    //This override the existing image in backend
    if (roomInput.imageUrls) {
      roomInput.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(roomInput.images).forEach((image) => {
      formData.append(`images`, image);
    });
    onSave(formData);
    // reset();
  });

  return (
    <FormProvider {...formMethods}>
      <p
        onClick={() => navigate(-1)}
        className="hover:underline cursor-pointer mb-3 text-blue-500 font-semibold"
      >
        &#x25c0; Back to My Apartement
      </p>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <HotelDetailsSection editPage={editPage} />
        <HotelTypes />
        <HotelBreakfast />
        <HotelFacilites />
        <HotelGuests />
        <HotelImage />
        <span className="flex justify-end">
          <button
            // type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500 rounded-md w-full sm:w-60 ring-blue-700 ring-offset-2 ring disabled:opacity-55"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
       
      </form>
    </FormProvider>
  );
}
