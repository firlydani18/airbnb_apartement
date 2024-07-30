// import { HotelType } from 'backend/src/shared/types';
// import React, { useState, useEffect } from 'react';
// import { DateRangePicker, RangeKeyDict } from 'react-date-range';
// import 'react-date-range/dist/styles.css';
// import 'react-date-range/dist/theme/default.css';
// import { myHotel, } from '../api/hotelApi';
// import { useNavigate} from 'react-router-dom';
// import { useAppContext } from '../context/AppContext';

// const SetAvailabilityCalendar: React.FC = () => {
//   // const { hotelId } = useParams();
//   const { showToast } = useAppContext();
//   const navigate = useNavigate();


//   const [rooms, setRooms] = useState<HotelType[]>([]);
//   const [selectedRoom, setSelectedRoom] = useState<string>('');
 
//   const [selectedDates, setSelectedDates] = useState({
//     startDate: new Date(),
//     endDate: new Date(),
//     key: 'selection'
//   });
//   // const [selectedDates, setSelectedDates] = useState<DateRange>({
//   //   startDate: new Date(),
//   //   endDate: new Date(),
//   //   key: 'selection'
//   // });
//   const [availableRooms, setAvailableRooms] = useState<number>(0);
//   const [price, setPrice] = useState<number>(0);
  

//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const fetchedRooms = await myHotel();
//         setRooms(fetchedRooms);
//       } catch (error) {
//         console.error('Error fetching rooms:', error);
//       }
//     };

//     fetchRooms();
//   }, []);

//   const handleRoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedRoom(e.target.value);
//   };

//   // const handleSelect = (ranges: { selection: DateRange }) => {
//   //   setSelectedDates(ranges.selection);
//   // };
//   const handleSelect = (ranges: RangeKeyDict) => {
//     const { startDate, endDate } = ranges.selection;
//     setSelectedDates({
//       startDate: startDate || new Date(),
//       endDate: endDate || new Date(),
//       key: 'selection'
//     });
//   };

//   const handleSubmit = async () => {
//     try {
//       const availabilityData = {
//         startDate: selectedDates.startDate,
//         endDate: selectedDates.endDate,
//         availableRooms,
//         price,
//         // roomCode: generateRoomCode(selectedRoom)
//       };

//       await saveAvailability(selectedRoom, availabilityData);
//       showToast({ message: 'Availability Set Successfully', type: 'SUCCESS' });
//       navigate('/my-hotels');
//     } catch (error) {
//       showToast({ message: 'Error setting availability', type: 'ERROR' });
//       console.error('Error setting availability:', error);
//     }
//   };

//   // const generateRoomCode = (hotelId: string) => {
//   //   // Implementasi logika untuk membuat kode ruangan unik
//   //   return `ROOM-${hotelId}-${new Date().getTime()}`;
//   // };
//   return (
//     <div>
//       <h2>Set Availability</h2>
//       <select onChange={handleRoomChange} value={selectedRoom}>
//         <option value="">Select a room</option>
//         {rooms.map(room => (
//           <option key={room._id} value={room._id}>{room.hotelName}</option>
//         ))}
//       </select>
//       <label>
//         <DateRangePicker
//         ranges={[selectedDates]}
//         onChange={handleSelect}
//       />
//       </label>
//       <div>
//         <label>
//         Available Rooms:
//         <input type="number" value={availableRooms} onChange={(e) => setAvailableRooms(Number(e.target.value))} />
//       </label>
//       <label>
//         Price:
//         <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
//       </label>
//       </div>
//       <button onClick={handleSubmit}>Saves Availability</button>
//     </div>
//   );
// };

// export default SetAvailabilityCalendar;

