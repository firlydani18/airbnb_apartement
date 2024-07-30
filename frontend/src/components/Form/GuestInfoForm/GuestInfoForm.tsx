import {useForm} from "react-hook-form";
import {formatCurrency} from "../../../utils/helper";
import ReactDatePicker from "react-datepicker";
import {useSearchContext} from "../../../context/SearchContext";
import {useAppContext} from "../../../context/AppContext";
import {useLocation, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { getRoomAvailability } from "../../../api/hotelApi";
import { AvailabilityType } from "../../../../../backend/src/shared/types";

//import { Availability } from "backend/src/shared/types";

type Props = {
  roomId: string;
  availability: AvailabilityType[];
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};


// export default function GuestInfoForm({hotelId}: Props) {
  const GuestInfoForm: React.FC<Props> = ({ roomId, availability }) => {
  const search = useSearchContext();
  const {isLoggedIn} = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [availabilityData, setAvailabilityData] = useState<AvailabilityType[]>([]);
  const [pricePerNight, setPricePerNight] = useState<number>(0); 
  const [error, setError] = useState<string | null>(null); // Error state
  //const [loading, setLoading] = useState<boolean>(true); // Loading state

  // const [totalPrice, setTotalPrice] = useState<number>(0);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: {errors},
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });


  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await getRoomAvailability(roomId); // Update dengan endpoint yang sesuai
        setAvailabilityData(response);
        if (response.length > 0) {
          setPricePerNight(response[0].price);
        } else {
          setError('No availability data found');
        }
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchAvailability();
  }, [roomId]);

  if (error) {
    return <div>Error: {error}</div>;
  }


  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
 
  const getTotalLivingDays = (checkIn: Date, checkOut: Date) => {
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };



  const getTotalPrice = (checkIn: Date, checkOut: Date, availability: AvailabilityType[]) => {
    let totalPrice = 0;
    const currentDate = new Date(checkIn);

    while (currentDate <= checkOut) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const dayAvailability = availability.find(avail =>
        new Date(avail.date).toISOString().split('T')[0] === dateStr
      );

      if (dayAvailability) {
        totalPrice += dayAvailability.price;
      } else {
        // Jika harga tidak ditemukan, gunakan harga default atau tampilkan kesalahan
        totalPrice += pricePerNight || 0; // Misalnya, harga default jika tidak ada data
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return totalPrice;
  };

  const totalLivingDays = checkIn && checkOut ? getTotalLivingDays(checkIn, checkOut) : 0;
  const totalPrice = pricePerNight !== null && checkIn && checkOut ? getTotalPrice(checkIn, checkOut, availability) : 0;

  function onSignInClick(data: GuestInfoFormData) {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );

    navigate("/sign-in", {state: {from: location}});
  }

  function onSubmit(data: GuestInfoFormData) {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );

    navigate(`/hotel/${roomId}/booking`);
  }

  return (
    <div className="flex flex-col p-4 bg-blue-200 gap-4 rounded-md shadow-lg shadow-slate-400">
      {/* {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <> */}
          
      <h3 className="text-md font-bold">
        <span className="text-sm font-medium italic">
          Total Cost for {totalLivingDays} days is{" "}
        </span>
        {/* 💸{formatCurrency(pricePerNight * totalLivingDays)}{" "} */}
        {/* 💸{formatCurrency(totalPrice)}{" "} */}
        {error ? <div className="text-red-500">{error}</div> : <span>💸{formatCurrency(totalPrice)}</span>}
      </h3>

      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
      >
        <div className="grid grid-cols-1 gap-2 items-center">
          <div>
            <p className="text-sm font-medium italic text-violet-900">
              Check-in Date
            </p>
            <ReactDatePicker
              required
              selected={checkIn}
              onChange={(date) => setValue("checkIn", date as Date)}
              dateFormat="MMMM d, yyyy"
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full bg-white p-2 focus:outline-none rounded-md font-medium"
              wrapperClassName="min-w-full"
            />
          </div>
          <div>
            <p className="text-sm font-medium italic text-violet-900">
              Check-out Date
            </p>
            <ReactDatePicker
              required
              selected={checkOut}
              onChange={(date) => setValue("checkOut", date as Date)}
              dateFormat="MMMM d, yyyy"
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full bg-white p-2 focus:outline-none rounded-md font-medium"
              wrapperClassName="min-w-full"
            />
          </div>
          <div className="flex bg-white px-2 py-1 gap-2 rounded-lg h-full font-medium">
            <label className="items-center flex">
              Adults:
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={1}
                max={20}
                {...register("adultCount", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "There must be atleast one Adult",
                  },
                  valueAsNumber: true,
                })}
              />
            </label>
            <label className="items-center flex">
              Children:
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={0}
                max={20}
                {...register("childCount", {
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.adultCount && (
              <span className="text-red-500 font-semibold text-sm">
                {errors.adultCount.message}
              </span>
            )}
          </div>
          <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
            {isLoggedIn ? "Book Now" : "Sign in to Book"}
          </button>
          
        </div>
      </form>
      {/* </>
      )} */}

      <p>Hotel ID: {roomId}</p>
      {availabilityData.length > 0 ? (
        availabilityData.map((item, index) => (
          <div key={index}>
            <p>Date: {new Date(item.date).toDateString()}</p>
            <p>Price: {item.price}</p>
            <p>Available Rooms: {item.availableRooms}</p>
          </div>
        ))
      ) : (
        <p>No availability data available</p>
      )}
    </div>
  );
}
export default GuestInfoForm;