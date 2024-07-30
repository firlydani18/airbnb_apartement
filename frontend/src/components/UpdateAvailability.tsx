// // UpdateAvailabilityForm.tsx

// import React, { useState, useEffect } from 'react';
// import { DateRangePicker, RangeKeyDict } from 'react-date-range';
// import { useParams } from 'react-router-dom';
// import { useMutation, useQuery, QueryClient } from 'react-query';
// import { hotelById, updateMyHotelById } from '../api/hotelApi';
// import Loader from './ui/Loader';

// const UpdateAvailabilityForm: React.FC = () => {
//   const { hotelId, availabilityId } = useParams();
//   const queryClient = new QueryClient();

//   const { data: hotel, isLoading: dataLoading } = useQuery('hotelById', () => hotelById(hotelId!));

//   const [selectedDates, setSelectedDates] = useState({
//     startDate: new Date(),
//     endDate: new Date(),
//     key: 'selection'
//   });
//   const [availableRooms, setAvailableRooms] = useState<number>(0);
//   const [price, setPrice] = useState<number>(0);

//   useEffect(() => {
//     if (hotel && hotel.availability) {
//       const selectedAvailability = hotel.availability.find(a => a._id.toString() === availabilityId);
//       if (selectedAvailability) {
//         setSelectedDates({
//           startDate: new Date(selectedAvailability.startDate),
//           endDate: new Date(selectedAvailability.endDate),
//           key: 'selection'
//         });
//         setAvailableRooms(selectedAvailability.availableRooms);
//         setPrice(selectedAvailability.price);
//       }
//     }
//   }, [hotel, availabilityId]);

//   const { mutate, isLoading } = useMutation(updateMyHotelById, {
//     onSuccess: () => {
//       alert('Availability updated successfully');
//       // Navigate to hotel detail page or other page after successful update
//     },
//     onError: () => {
//       alert('Error updating availability');
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ['hotelById'] });
//     }
//   });

//   const handleSubmit = async () => {
//     const formData = new FormData();
//     formData.append('hotelId', hotelId!); // Pastikan hotelId tidak null atau undefined
//     formData.append('availabilityId', availabilityId!); // Pastikan availabilityId tidak null atau undefined
//     formData.append('startDate', selectedDates.startDate.toISOString());
//     formData.append('endDate', selectedDates.endDate.toISOString());
//     formData.append('availableRooms', String(availableRooms));
//     formData.append('price', String(price));
//     // formData.append('roomCode', ''); // Jika diperlukan roomCode
//     await mutate(formData);
//   };


//   if (dataLoading) return <Loader />;

//   if (!hotel) return <div>No hotel found</div>;

//   return (
//     <div>
//       <h2>Update Availability</h2>
//       <DateRangePicker
//         ranges={[selectedDates]}
//         onChange={(ranges: RangeKeyDict) => {
//           const { startDate, endDate } = ranges.selection;
//           setSelectedDates({
//             startDate: startDate || new Date(),
//             endDate: endDate || new Date(),
//             key: 'selection'
//           });
//         }}
//       />
//       <label>
//         Available Rooms:
//         <input type="number" value={availableRooms} onChange={(e) => setAvailableRooms(Number(e.target.value))} />
//       </label>
//       <label>
//         Price:
//         <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
//       </label>
//       <button onClick={handleSubmit} disabled={isLoading}>
//         {isLoading ? 'Updating...' : 'Update Availability'}
//       </button>
//     </div>
//   );
// };

// export default UpdateAvailabilityForm;
