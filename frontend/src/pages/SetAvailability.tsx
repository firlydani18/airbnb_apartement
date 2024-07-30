// src/pages/HotelAvailabilityPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import { roomById, updateAvailability} from '../api/hotelApi';
import AvailabilityCalendar from '../components/AvailabilityComponent';

import { useMutation, useQuery, useQueryClient } from 'react-query';
import Loader from '../components/ui/Loader';
import { AvailabilityType, RoomType } from '../../../backend/src/shared/types';



interface HotelAvailabilityPageProps{
 roomId?: string;

}
const HotelAvailabilityPage: React.FC <HotelAvailabilityPageProps>= () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  
  const queryClient = useQueryClient();

  const { data, isLoading: dataLoading, isError: dataError } = useQuery<RoomType>(
    ['roomById', roomId],
    () => roomById(roomId!),
    {
      enabled: !!roomId,
      onError: (error) => {
        console.error('Error fetching hotel data:', error);
        navigate('/my-hotels');
      }
    }
  );

  const mutation = useMutation(
    ({ roomId, availability }: { roomId: string; availability: AvailabilityType[] }) => 
      updateAvailability(roomId, availability), 
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['roomById', roomId]);
        alert('Availability updated successfully');
      },
      onError: (error) => {
        console.error('Error updating availability:', error);
      }
    }
  );


  const [initialAvailability, setInitialAvailability] = useState<AvailabilityType[]>([]);

  // useEffect(() => {
  //   if (data) {
  //     setInitialAvailability(data.availability);
  //   }
  // }, [data]);

  useEffect(() => {
    if (data?.roomAvailabilitys) {
      // Flatten the nested arrays if necessary
      const flattenedAvailability = data.roomAvailabilitys.flatMap(r => r.availability);
      setInitialAvailability(flattenedAvailability);
    }
  }, [data]);


  // useEffect(() => {
  //   if (data) {
  //     // Flatten the nested arrays if necessary
  //     const flattenedAvailability = data.availability.flat();
  //     setInitialAvailability(flattenedAvailability);
  //   }
  // }, [data]);

  const handleSave = async (roomId: string, availability: AvailabilityType[]) => {
    try {
      if (!roomId) {
        throw new Error('Hotel ID is required');
      }
      mutation.mutate({ roomId, availability });
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  };

  if (dataLoading) return <Loader />;
  if (dataError) return <div className="text-center font-bold text-2xl">🙅🏻‍♂️ Error loading hotel data.</div>;
  if (!roomId) return <div className="text-center font-bold text-2xl">🙅🏻‍♂️ No Hotel ID provided.</div>;

  return (
    <div>
       <div>
       <p
        onClick={() => navigate(-1)}
        className="hover:underline cursor-pointer mb-3 text-blue-500 font-semibold"
      >
        &#x25c0; Back to My Apartement
      </p>
    </div>
      <h1>Manage Availability for {data?.name} </h1>
      <AvailabilityCalendar roomId={roomId} initialAvailability={initialAvailability} onSave={handleSave} />
      <h3>Current Availability</h3>
      <ul>
        {initialAvailability.map((avail, index) => (
          <li key={index}>
            {avail.date ? new Date(avail.date).toDateString() : 'Invalid Date'} - Available Rooms: {avail.availableRooms} - Price: ${avail.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HotelAvailabilityPage;
