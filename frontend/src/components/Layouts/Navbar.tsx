
// simport { useLocation, useNavigate } from "react-router-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import SignOutButton from "../Layouts/SignOutButton";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { logoutUser } from "../../redux/userSlice";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../api/loginAndLogoutApi";
import { useMutation, useQueryClient } from "react-query";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
   const navigate = useNavigate();
  const { isLoggedIn } = useAppContext();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const {showToast} = useAppContext();


  const mutation = useMutation(logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({message: "Signed Out!", type: "SUCCESS"});
    },
    onError: (error: Error) => {
      showToast({message: error.message, type: "ERROR"});
    },
  });


  const handleLogout = () => {
    mutation.mutate();
    dispatch(logoutUser());

  };
  return (
    <div className="bg-blue-800 py-6">
    <div className="container mx-auto flex justify-between">
      
      <ul className={`flex items-center gap-x-10 ${isOpen ? 'flex-col bg-blue-800 absolute top-0 left-0 h-screen w-40' : 'hidden lg:flex'}`}>
        <li
          className={`cursor-pointer flex items-center text-white px-3 font-bold hover:bg-blue-600 ${location.pathname === "/" && "font-medium"}`}
          onClick={() => {
            navigate("/");
            setIsOpen(false);
          }}
        >
          Beranda
        </li>
        <li
          className="cursor-pointer flex items-center text-white px-3 font-bold hover:bg-blue-600"
          onClick={() => {
            navigate("/kontak");
            setIsOpen(false);
          }}
        >
          Kontak
        </li>
        <li
          className="cursor-pointer flex items-center text-white px-3 font-bold hover:bg-blue-600"
          onClick={() => {
            navigate("/tentang");
            setIsOpen(false);
          }}
        >
          Tentang
        </li>

        {isLoggedIn ? (
          <>
            <Link
              className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
              to="/my-bookings"
              onClick={() => setIsOpen(false)}
            >
              My Bookings
            </Link>
            <Link
              className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
              to="/my-hotels"
              onClick={() => setIsOpen(false)}
            >
              My Apartement
            </Link>
            <Link
              className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
              to="/getUser/:userId"
              onClick={() => setIsOpen(false)}
            >
              My Profil
            </Link>
            <button
          onClick={handleLogout}
          className=" bg-white rounded-md p-1  text-blue-600 px-3 font-semibold hover:opacity-85"
        >
          Sign out
        </button>
          </>
        ) : (
          <Link
            to="/sign-in"
            className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Sign In
          </Link>
        )}
      </ul>

      {/* Tombol hamburger menu untuk tampilan mobile */}
      <button
        className="lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
      </div>
    </div>
  );
};

export default Navbar;
