// src/components/HotelCalendar.tsx
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useEffect, useState } from 'react';
import { getRoomAvailability } from '../api/hotelApi';
import { AvailabilityType } from '../../../backend/src/shared/types';
//import { getHotelAvailability } from '../api/hotelApi';

interface roomAvailabilityListProps {
  roomId: string;
}

const roomAvailabilityList: React.FC<roomAvailabilityListProps> = ({ roomId }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks, @typescript-eslint/no-explicit-any
  const [events, setEvents] = useState<any[]>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const getAvailability = async () => {
      try {
        const availabilityData: AvailabilityType[] = await getRoomAvailability(roomId);
        const formattedEvents = availabilityData.map((avail) => ({
          title: `Rooms: ${avail.availableRooms}, Price: $${avail.price}`,
          start: avail.date.toISOString(),
          // If using an end date for multi-day events, include `end` property
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching availability:', error);
      } finally {
        setLoading(false);
      }
    };

    getAvailability();
  }, [roomId]);

  if (loading) return <div>Loading...</div>;

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
    />
  );
};

export default roomAvailabilityList;
