import { useQuery } from "react-query";
import BookingForm from "../components/Form/BookingForm";
import { useSearchContext } from "../context/SearchContext";
import { useParams } from "react-router-dom";
import { fetchHotelById } from "../api/searchApi";
import { useEffect, useState } from "react";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
import { createMidtransTransaction } from "../api/bookingApi"; // Assuming you have an API function for Midtrans
//import { useAppContext } from "../context/AppContext";
import Loader from "../components/ui/Loader";
import { currentUserApi } from "../api/userApi";

export default function Booking() {
  //const { stripePromise } = useAppContext();
  const search = useSearchContext();
  const { hotelId } = useParams();
  const [numberOfNights, setNumberOfNights] = useState<number>(0);

const [pricePerNight, totalCost] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkIn.getDate() - search.checkOut.getDate()) + 1;

      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  useEffect(() => {
    if (numberOfNights && pricePerNight) {
      const calculatedTotalCost = numberOfNights * pricePerNight;
      totalCost(calculatedTotalCost);
    }
  }, [numberOfNights, pricePerNight]);

  const { data: paymentIntentData, isLoading: paymentLoading } = useQuery(
    "createMidtransTransaction",
    () => createMidtransTransaction(hotelId as string, numberOfNights.toString()), // Call Midtrans transaction creation API
    {
      enabled: !!hotelId && numberOfNights > 0,
    }
  );

  const { data: hotel, isLoading: hotelLoading } = useQuery(
    "fetchHotelById",
    () => fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );
  const { data: user, isLoading } = useQuery("currentUser", currentUserApi);

  if (isLoading || hotelLoading || paymentLoading) return <Loader />;
  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-3">
      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        // totalCost={totalCost}
        hotel={hotel!}
      />
      {paymentIntentData && (
        <div>
          <BookingForm currentUser={user!} paymentIntent={paymentIntentData} />
          <a href={paymentIntentData.paymentIntentId} target="_blank" rel="noopener noreferrer">
            Proceed to Payment
          </a>
        </div>
      )}
    </div>
  );
}


// // import {useQuery} from "react-query";
// // import {currentUserApi} from "../api/userApi";
// // import BookingForm from "../components/Form/BookingForm";
// // import {useSearchContext} from "../context/SearchContext";
// // import {useParams} from "react-router-dom";
// // import {fetchHotelById} from "../api/searchApi";
// // import {useEffect, useState} from "react";
// // import BookingDetailsSummary from "../components/BookingDetailsSummary";
// // import {createPaymentIntent} from "../api/bookingApi";
// // import {Elements} from "@stripe/react-stripe-js";
// // import {useAppContext} from "../context/AppContext";
// // import Loader from "../components/ui/Loader";

// // export default function Booking() {
// //   const {stripePromise} = useAppContext();
// //   const search = useSearchContext();
// //   const {hotelId} = useParams();
// //   const [numberOfNights, setNumberOfNights] = useState<number>(0);

// //   useEffect(() => {
// //     if (search.checkIn && search.checkOut) {
// //       const nights =
// //         Math.abs(search.checkIn.getDate() - search.checkOut.getDate()) + 1;

// //       setNumberOfNights(Math.ceil(nights));
// //     }
// //   }, [search.checkIn, search.checkOut]);

// //   const {data: paymentIntentData, isLoading: paymentLoading} = useQuery(
// //     "createPaymentIntent",
// //     () => createPaymentIntent(hotelId as string, numberOfNights.toString()),
// //     {
// //       enabled: !!hotelId && numberOfNights > 0, //this will retry only these condition mets
// //     }
// //   );

// //   const {data: hotel, isLoading: hotelLoading} = useQuery(
// //     "fetchHotelById",
// //     () => fetchHotelById(hotelId as string),
// //     {
// //       enabled: !!hotelId,
// //     }
// //   );
// //   const {data: user, isLoading} = useQuery("currentUser", currentUserApi);

// //   if (isLoading || hotelLoading || paymentLoading) return <Loader />;
// //   return (
// //     <div className="grid md:grid-cols-[1fr_2fr] gap-3">
// //       <BookingDetailsSummary
// //         checkIn={search.checkIn}
// //         checkOut={search.checkOut}
// //         adultCount={search.adultCount}
// //         childCount={search.childCount}
// //         numberOfNights={numberOfNights}
// //         hotel={hotel!}
// //       />
// //       {paymentIntentData && (
// //         <Elements
// //           stripe={stripePromise}
// //           options={{
// //             clientSecret: paymentIntentData.clientSecret,
// //           }}
// //         >
// //           <BookingForm currentUser={user!} paymentIntent={paymentIntentData} />
// //         </Elements>
// //       )}
// //     </div>
// //   );
// // }
