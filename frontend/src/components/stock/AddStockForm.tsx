// import React, { useEffect, useState } from 'react';
// import CalendarComponent from './CalendarComponent';
// import { addStock, myHotel } from '../../api/hotelApi';
// import { HotelType } from 'backend/src/shared/types';
// import Loader from '../ui/Loader';

// //import {API_URL} from "../contants/contant";

// interface AddStockFormProps {
//   hotelId?: string;
//   onSave: (formData: FormData) => void;
//   // onSave: (formData: FormData) => void; 
// }

// const AddStockForm: React.FC<AddStockFormProps> = ({ hotelId, onSave  }) => {
//   const [dates, setDates] = useState<Date[]>([]);
//   const [availableRooms, setAvailableRooms] = useState<number>(0);
//   const [price, setPrice] = useState<number>(0);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [rooms, setRooms] = useState<HotelType[]>([]);
//   const [selectedRoom, setSelectedRoom] = useState<string>('');
//   //const [availability, setAvailability] = useState<Availability[]>([]);

  
//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const fetchedRooms = await myHotel();
//         console.log('Fetched rooms:', fetchedRooms);
//         setRooms(fetchedRooms);
//       } catch (error) {
//         console.error('Error fetching rooms:', error);
//       }
//     };

//     if (!rooms.length) { // Pastikan hanya panggil fetchRooms jika rooms kosong
//       fetchRooms();
//     }
//   }, [rooms.length]);
 
//   const handleRoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedHotelId = e.target.value;
//     setSelectedRoom(selectedHotelId);
//     //setHotelId(selectedHotelId);
//     console.log('Selected room:', selectedHotelId);
//   };

//   const handleDatesSelected = (selectedDates: Date[]) => {
//     console.log('Dates selected:', selectedDates);
//     setDates(selectedDates);
//   };



//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault(); // Prevent default form submission

//     // Validation
//     if (dates.length === 0) {
//       alert('Please select dates.');
//       return;
//     }

//     if (!hotelId) {
//       alert('Hotel ID is missing.');
//       return;
//     }

//     if (!selectedRoom) {
//       alert('Please select a room.');
//       return;
//     }

//     console.log('Form data:', {
//       hotelId,
//       dates,
//       availableRooms,
//       price,
//     });
//     const formData = new FormData();
//     formData.append('hotelId', hotelId);
//     formData.append('startDate', JSON.stringify(dates.map(date => date.toISOString())));
//     formData.append('availableRooms', availableRooms.toString());
//     formData.append('price', price.toString());

//     setIsLoading(true);

//     try {
//       console.log('Submitting data:', formData);
//       await addStock(hotelId, {
//         startDate: dates,
//         availableRooms,
//         price,
       
//       });
//       onSave(formData); // Panggil onSave dengan formData setelah berhasil
//       alert('Stock updated successfully');
//     } catch (error) {
//       console.error('Error adding stock:', error);
//       alert('Failed to add stock');
//     } finally {
//       setIsLoading(false);
//     }
//   };

 
//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//       <h2>Set Availability</h2>
//       <select onChange={handleRoomChange} value={selectedRoom} style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}>
//       <option>Select a room</option>
//       {rooms.map(room => (
//           <option key={room._id} value={room._id}>{room.hotelName}</option>
//         ))}
//         </select>
//       </div>
//       <div>
//         <label>Select Dates:</label>
//         <CalendarComponent onDatesSelected={handleDatesSelected} />
//       </div>
//       <div>
//         <label>Available Rooms:</label>
//         <input type="number" 
//                 value={availableRooms} 
//                 onChange={e => setAvailableRooms(parseInt(e.target.value))} />
//       </div>
//       <div>
//         <label>Price:</label>
//         <input type="number" 
//                 value={price} 
//                 onChange={e => setPrice(parseInt(e.target.value))} />
//       </div>
//       <button
//             type="submit"
//             disabled={isLoading}
//             className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500 rounded-md w-full sm:w-60 ring-blue-700 ring-offset-2 ring disabled:opacity-55"
//           >
//             {isLoading ? "Saving..." : "Save"}
//           </button>
//       {/* <button type="submit">Add Stock</button> */}
//       {isLoading && <Loader />}
//     </form>
    
//   );
// };


// export default AddStockForm;