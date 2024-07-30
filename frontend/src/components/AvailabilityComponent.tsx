// src/components/AvailabilityCalendar.tsx
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AvailabilityType } from '../../../backend/src/shared/types';
//import { Availability } from 'backend/src/shared/types';

// export type AvailabilityType = {
//   date: Date;
//   availableRooms: number;
//   price: number;
// };

interface AvailabilityCalendarProps {
  roomId: string;
  initialAvailability: AvailabilityType[];
  onSave: (roomId: string, availability: AvailabilityType[]) => void;
}

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({ roomId, initialAvailability, onSave }) => {
  // const [availability, setAvailability] = useState<Availability[]>(initialAvailability);
  const [availability, setAvailability] = useState<AvailabilityType[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [availableRooms, setAvailableRooms] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  // useEffect(() => {
  //   setAvailability(initialAvailability);
  // }, [initialAvailability]);

  useEffect(() => {
    const parsedAvailability = initialAvailability.map(item => ({
      ...item,
      dates: new Date(item.date) // Convert dates to Date object
    }));
    setAvailability(parsedAvailability);
  }, [initialAvailability]);



  const addAvailability = () => {
    if (startDate && endDate) {
      const datesArray = generateDatesArray(startDate, endDate);
      const newAvailability = datesArray.map(date => ({
        // id: id,
        date: date,
        availableRooms,
        price,
      }));
      console.log('Adding availability:', newAvailability);
      setAvailability([...availability, ...newAvailability]);
      clearForm();
    }
  };

 

  const clearForm = () => {
    setStartDate(null);
    setEndDate(null);
    setAvailableRooms(0);
    setPrice(0);
  };

  const generateDatesArray = (start: Date, end: Date): Date[] => {
    const date = [];
    const currentDate = new Date(start);
    while (currentDate <= end) {
      date.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return date;
  };

 const handleSave = () => {
    console.log('Saving availability:', availability); 
    onSave(roomId,availability);
  };
  return (
    <div>
      <h3>Add Availability</h3>
      
      <div>
        <label>Select Dates:</label>
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
        />
        <DatePicker
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="End Date"
        />
      </div>
      <div>
      <label>Available Rooms:</label>
      <input
        type="number"
        placeholder="Available Rooms"
        value={availableRooms}
        onChange={(e) => setAvailableRooms(Number(e.target.value))}
      />
      </div>
      <div>
      <label>Price:</label>
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      </div>

      <section>
  <div className="flex">
    <button
      onClick={addAvailability}
      className="bg-blue-600 text-white text-base sm:text-lg font-bold p-2 hover:bg-blue-700 rounded-md"
    >
      Add
    </button>
    <button
      onClick={handleSave}
      className="bg-blue-600 text-white text-base sm:text-lg font-bold p-2 hover:bg-blue-700 rounded-md ml-2"
    >
      Save
    </button>
  </div>
</section>  
      
      <ul>
        {availability.map((avail, index) => (
          <li key={index}>
            {/* {avail.dates.toDateString()} - Rooms: {avail.availableRooms} - Price: ${avail.price} */}
            {avail.date ? avail.date.toDateString() : 'Invalid Date'} - Available Rooms: {avail.availableRooms} - Price: ${avail.price}
          </li>
        ))}
      </ul>

    </div>
  );
};

export default AvailabilityCalendar;


