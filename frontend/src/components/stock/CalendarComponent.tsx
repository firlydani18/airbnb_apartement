// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

// interface CalendarComponentProps {
//   onDatesSelected: (dates: Date[]) => void;
// }

// const CalendarComponent: React.FC<CalendarComponentProps> = ({ onDatesSelected }) => {
//   const [selectedDates, setSelectedDates] = useState<Date[]>([]);

//   const onChange = (dates: Date | Date[] ) => {
//     if (Array.isArray(dates)) {
//       setSelectedDates(dates);
//       onDatesSelected(dates);
//     } 
//   };

//   return (
//     <div>
//       <Calendar onChange={onChange} selectRange={true} value={selectedDates} />
//     </div>
//   );
// };



// export default CalendarComponent;



// // import React, { useState } from 'react';
// // import DatePicker from 'react-datepicker';
// // import 'react-datepicker/dist/react-datepicker.css';

// // interface DatePickerComponentProps {
// //   onDatesSelected: (dates: Date[]) => void;
// // }

// // const DatePickerComponent: React.FC<DatePickerComponentProps> = ({ onDatesSelected }) => {
// //   const [selectedDates, setSelectedDates] = useState<Date[]>([]);

// //   const handleChange = (dates: Date | [Date, Date] | null) => {
// //     if (Array.isArray(dates)) {
// //       setSelectedDates(dates);
// //       onDatesSelected(dates);
// //     } else if (dates instanceof Date) {
// //       setSelectedDates([dates]);
// //       onDatesSelected([dates]);
// //     }
// //   };

// //   return (
// //     <div>
// //       <DatePicker
// //         selected={selectedDates.length > 0 ? selectedDates[0] : null}
// //         onChange={handleChange}
// //         startDate={selectedDates.length === 2 ? selectedDates[0] : null}
// //         endDate={selectedDates.length === 2 ? selectedDates[1] : null}
// //         selectsRange
// //         inline
// //       />
// //     </div>
// //   );
// // };

// // export default DatePickerComponent;
