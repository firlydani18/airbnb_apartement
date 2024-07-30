// import React, { useEffect, useState } from 'react';
// import { getAvailabilities } from '../api/availability';
// //import { getAvailabilities } from '../services/availabilityService';

// const AvailabilityList: React.FC = () => {
//   const [availabilities, setAvailabilities] = useState([]);

//   useEffect(() => {
//     const fetchAvailabilities = async () => {
//       const data = await getAvailabilities();
//       setAvailabilities(data);
//     };
//     fetchAvailabilities();
//   }, []);

//   return (
//     <ul>
//       {availabilities.map((availability: any) => (
//         <li key={availability._id}>
//           {availability.startDate} - {availability.endDate} : {availability.availableRooms} rooms at ${availability.price}
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default AvailabilityList;
