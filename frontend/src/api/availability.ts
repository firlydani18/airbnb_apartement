import axios from 'axios';

const API_URL = '/api/availabilities';

export const getAvailabilities = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addAvailabilityToHotel = async (roomId: string, availability: any) => {
  const response = await axios.post(`${API_URL}/${roomId}/availabilities`, availability);
  return response.data;
};

