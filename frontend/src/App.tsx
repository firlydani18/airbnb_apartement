import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Layout from "./components/Layouts/Layout";
import {DarkModeProvider} from "./context/DarkModeContext";
import Home from "./pages/Home";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateHotel from "./pages/CreateHotel";
import MyHotel from "./pages/MyHotel";
import EditMyHotel from "./pages/EditMyHotel";
import Search from "./pages/Search";
import HotelDetail from "./pages/HotelDetail";
import {useAppSelector} from "./redux/hooks";
import NotFound from "./pages/NotFound";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";
import ContactPage from "./pages/ContactPage";
import AboutUsPage from "./pages/AboutPage";
import AllUsers from "./pages/ProfileList";
import AvailabilityPage from "./pages/AvailabilityPage";
import HotelAvailabilityPage from "./pages/SetAvailability";



// import AdminProfileList from "./pages/adminProfileList";
// import PrivateRoute from "./utils/PrivateRoute";

function App() {
  const {user} = useAppSelector((state) => state.user);
  return (
    <>
      <DarkModeProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index path="/" element={<Home />} />
              <Route path="/tentang" element={<AboutUsPage />} />
              <Route path="/kontak" element={<ContactPage />} />
              <Route path="/search" element={<Search />} />
              <Route path="/search/detail/:hotelId" element={<HotelDetail />} />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route element={<ProtectedRoute />}>
              
              {/* <Route path="/sign-in" element={<SignIn />} /> */}
              {/* <PrivateRoute path="/admin" element={<AdminProfileList />} /> */}
              < Route path="/getAllUser" element={<AllUsers/>} />
                < Route path="/my-hotels" element={<MyHotel />} />
                <Route path="/my-bookings" element={<MyBookings />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/hotel/:hotelId/booking" element={<Booking />} />
                <Route path="/my-hotels/create-hotel" element={<CreateHotel />} />
                <Route path="/my-hotels/edit-hotel/:hotelId" element={<EditMyHotel />} />  
                {/* <Route path="/availability/add-stock" element={<AddStockForm />} /> */}
                {/* <Route path="/my-hotel/:hotelId/availability" element={<AvailabilityPage />} /> */}
                <Route path="/availability/hotels/:hotelId/availability" element={<HotelAvailabilityPage />} />
                {/* <Route path="/my-hotel/:hotelId/availability" element={<AvailabilityCalendar initialAvailability={[]} onSave={() => {}} />} /> */}
                <Route path="/availabilities" element={<AvailabilityPage />} />


              </Route> 
              </Route>
              <Route path="*" element={<NotFound />} />
              </Routes>
        </BrowserRouter>
      </DarkModeProvider>
    </>
  );
}

export default App;