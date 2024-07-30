// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import { getCurrentUser } from '../services/authService';

// const PrivateRoute: React.FC<{ component: React.FC; path: string; exact: boolean }> = ({ component: Component, ...rest }) => {
//   const user = getCurrentUser();

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         user && user.role === 'admin' ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to="/sign-in" />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;
