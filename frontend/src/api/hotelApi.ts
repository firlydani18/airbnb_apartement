
import { AvailabilityType, RoomType } from "../../../backend/src/shared/types";
import {API_URL} from "../contants/contant";

export async function addMyRoom(hotelFormData: FormData) {
  const response = await fetch(`${API_URL}/api/v1/my-apartement/create-room`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });

  const responseBody = await response.json();
  if (!response.ok || responseBody.status === "failed") {
    throw new Error(responseBody.message);
  }
  return responseBody;
}

export async function myRoom(): Promise<RoomType[]> {
  const response = await fetch(`${API_URL}/api/v1/my-apartement/`, {
    credentials: "include",
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody.myHotel;
}

export async function roomById(roomId: string): Promise<RoomType> {
  const response = await fetch(`${API_URL}/api/v1/my-hotel/${roomId}`, {
    credentials: "include",
  });

  const responseBody = await response.json();
  if (!response.ok || responseBody.status === "failed") {
    throw new Error(responseBody.message);
  }

  return responseBody.hotel;
}

export const updateMyRoomById = async (hotelFormData: FormData) => {
  const response = await fetch(
    `${API_URL}/api/v1/my-apartement/${hotelFormData.get("roomId")}`,
    {
      method: "PATCH",
      body: hotelFormData,
      credentials: "include",
    }
  );

  const responseBody = await response.json();

  if (!response.ok || responseBody.status === "failed") {
    throw new Error(responseBody.message);
  }

  return responseBody.hotel;
};

export const addStock = async (_roomId: string, newAvailability: 
  { startDate: Date[]; availableRooms: number; price: number; }): Promise<void> => {
  const response = await fetch(`${API_URL}/api/v1/availability/add-stock`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({newAvailability}),
  });

  if (!response.ok) {
    throw new Error('Failed to add stock');
  }
};


//export const addOrUpdateAvailability = async (hotelId: string, availability: { startDate: Date[]; availableRooms: number; price: number; }): Promise<void> => {
  export const addAvailability = async (roomId: string, availability: AvailabilityType[]): Promise<void> => { 
try {
    const response = await fetch(`${API_URL}/api/v1/availability/hotels/${roomId}/availability`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ availability }),
    });

    const responseBody = await response.json();
    if (!response.ok || responseBody.status === 'failed') {
      throw new Error(responseBody.message);
    }

    return responseBody;
  } catch (error) {
    throw new Error(`Failed to add or update availability`);
  }
};

export const updateAvailability = async (roomId: string, availability: AvailabilityType[]): Promise<void> => { 
  try {
      const response = await fetch(`${API_URL}/api/v1/availability/hotels/${roomId}/availability`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ availability }),
      });
  
      const responseBody = await response.json();
      if (!response.ok || responseBody.status === 'failed') {
        throw new Error(responseBody.message);
      }
  
      return responseBody;
    } catch (error) {
      throw new Error(`Failed to add or update availability`);
    }
  };


export const getHotelDetailsAndAvailability = async (roomId: string): Promise<{ hotel: RoomType, availability: AvailabilityType[] }> => {
  const hotelResponse = await fetch(`${API_URL}/api/v1/my-apartement/${roomId}`, {
    credentials: 'include',
  });

  const hotelResponseBody = await hotelResponse.json();
  if (!hotelResponse.ok || hotelResponseBody.status === 'failed') {
    throw new Error(hotelResponseBody.message);
  }

  const availabilityResponse = await fetch(`${API_URL}/api/v1/hotels/${roomId}/availability`, {
    credentials: 'include',
  });

  const availabilityResponseBody = await availabilityResponse.json();
  if (!availabilityResponse.ok || availabilityResponseBody.status === 'failed') {
    throw new Error(availabilityResponseBody.message);
  }

  return {
    hotel: hotelResponseBody.hotel,
    availability: availabilityResponseBody,
  };
};

// export const getHotelAvailability = async (hotelId: string): Promise<Availability[]>  => {
//   try {
//     const response = await fetch(`${API_URL}/api/v1/availability/hotels/${hotelId}/availability`, {
//       credentials: 'include',
//     });

//     const responseBody = await response.json();
//     if (!response.ok || responseBody.status === 'failed') {
//       throw new Error(responseBody.message);
//     }

//     return responseBody.availability;
//   } catch (error) {
//     throw new Error(`Failed to fetch availability`);
//   }
// };

// export const getHotelAvailability = async (hotelId: string): Promise<Availability[]> => {
//   try {
//     const response = await fetch(`${API_URL}/api/v1/availability/hotels/${hotelId}/availability`, {
//       credentials: 'include',
//     });

//     const responseBody = await response.json();
//     if (!response.ok || responseBody.status === 'failed') {
//       throw new Error(responseBody.message);
//     }
    
// // Verify that the response contains the expected data
// if (responseBody.status !== 'success' || !responseBody.hotel?.availability) {
//   throw new Error('Invalid response format');
// }

//     // Flatten the nested availability array
//     const availability = responseBody.hotel.availability.flat();

//     return availability;
//   } catch (error) {
//     throw new Error(`Failed to fetch availability`);
//   }
// };

export const getRoomAvailability = async (roomId: string): Promise<AvailabilityType[]> => {
  try {
    const response = await fetch(`${API_URL}/api/v1/availability/hotels/${roomId}/availability`, {
      credentials: 'include', // Sesuaikan jika perlu
    });

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(`Failed to fetch availability: ${errorBody.message || response.statusText}`);
    }

    const data = await response.json();
    return data.availability || []; // Pastikan data.availability selalu ada
  } catch (error) {
    console.error('Error fetching hotel availability:', error);
    throw new Error('Failed to fetch availability');
  }
};

// // Fungsi untuk menghapus hotel berdasarkan ID
// export const deleteHotelById = async (hotelId: string) => {
//   const response = await fetch( `${API_URL}/api/v1/my-hotel/${hotelId}`,
//     {
//       method: "DELETE",
//       credentials: "include",
//     }
//   );

//   const responseBody = await response.json();

//   if (!response.ok || responseBody.status === "failed") {
//     throw new Error(responseBody.message);
//   }

//   return responseBody.message; // atau sesuaikan dengan respons dari API Anda
// };