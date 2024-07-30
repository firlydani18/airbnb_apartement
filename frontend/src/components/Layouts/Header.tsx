import {Link} from "react-router-dom";
import DarkModeToggle from "../ui/DarkModeToggle";
import NotLoggedIn from "./NotLoggedIn";
import {useAppSelector} from "../../redux/hooks";
import LoggedIn from "./LoggedIn";
import {useAppContext} from "../../context/AppContext";
import { useState } from "react";
// import { useForm } from "react-hook-form";
//import User from "backend/src/model/userModel";

export default function Header() {
  const User = useAppSelector((state) => state.user.user);
  const {isLoggedIn} = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
   // const isAdmin = User && User.role === "admin";
 // const isAdmin = user && typeof user.role === 'string' && user.role === "admin";
 //const { isAdmin } = useForm<currentUserApi>({role: user?.role,})

  return (
    <nav className="bg-blue-800 py-6 dark:bg-slate-900 pb-11">
      <div className="container mx-auto flex flex-col sm:flex-row  space-y-4 sm:space-y-0 items-center justify-between">
        <span className="ml-3 sm:ml-0 text-2xl sm:text-2xl text-white font-bold tracking-tight font-mono">
          <Link to="/">Gold Coast Bahama PIK Jakarta</Link>
        </span>
        <span className="ml-2 sm:ml-0 text-1xl sm:text-1xl text-white font-bold tracking-tight font-mono">
          <Link to="/tentang">Tentang</Link>
        </span>
        <span className="ml-2 sm:ml-0 text-1xl sm:text-1xl text-white font-bold tracking-tight font-mono">
          <Link to="/kontak">Kontak</Link>
        </span>
        <div className="block lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        </div>
        <span className={`lg:flex lg:items-center space-x-2 ${isMenuOpen ? "block" : "hidden"} lg:block`}>
          <div className="flex items-center space-x-4">
          {!isLoggedIn && !User && <NotLoggedIn />}
          {User && <LoggedIn avatar={User!.avatar!} />}
          <DarkModeToggle />
        </div>
          </span>

          {/* <div className={`lg:flex lg:items-center space-x-2 ${isMenuOpen ? "block" : "hidden"} lg:block`}>
          {isAdmin && (
            <>
              <span className="ml-2 sm:ml-0 text-1xl sm:text-1xl text-white font-bold tracking-tight font-mono">
                <Link to="/getAllUser">Get All User</Link>
              </span>
              <span className="ml-2 sm:ml-0 text-1xl sm:text-1xl text-white font-bold tracking-tight font-mono">
                <Link to="/myApartment">My Apartment</Link>
              </span>
            </>
          )}
        </div> */}

      </div>
    </nav>
  );
}
