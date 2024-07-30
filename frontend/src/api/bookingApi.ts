
import {API_URL} from "../contants/contant";
import {BookingFormData} from "../components/Form/BookingForm";
import { PaymentIntentResponse, RoomType } from "../../../backend/src/shared/types";


export async function createMidtransTransaction(
  roomId: string,
  numberOfNights: string,
  
): Promise<PaymentIntentResponse> {

 // const apiKey = process.env.VITE_MIDTRANS_SERVER_KEY || "";
const apiKey = import.meta.env.VITE_MIDTRANS_CLIENtT_KEY || "";

  const response = await fetch(
    `${API_URL}/api/v1/booking/${roomId}/bookings/payment-intent`,
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({numberOfNights}),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
    }
  );

  const responseBody = await response.json();
  if (!response.ok || responseBody.status === "failed") {
    throw new Error("Error in payment-intent");
  }
  return responseBody.response;
}

export async function createRoomBooking(formData: BookingFormData) {
  const response = await fetch(
    `${API_URL}/api/v1/booking/${formData.hotelId}/bookings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    }
  );

  const responseBody = await response.json();
  console.log(responseBody);
  if (!response.ok || responseBody.status === "failed") {
    throw new Error("Unable to book the room.");
  }

  return responseBody.message;
}

export async function fetchMyBooking(): Promise<RoomType[]> {
  const response = await fetch(`${API_URL}/api/v1/my-booking`, {
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok || responseBody.status === "failed") {
    throw new Error("Unable to fetch booking details");
  }

  return responseBody.results;
}
