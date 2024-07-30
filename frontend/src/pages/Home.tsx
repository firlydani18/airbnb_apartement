import {useQuery} from "react-query";
import LatestDestinationCard from "../components/LastestDestinationCard";
import { fetchAllHotel } from "../api/searchApi";
import {Link} from "react-router-dom";
import Loader from "../components/ui/Loader";
import {memo} from "react";
import { RoomType } from "../../../backend/src/shared/types";

//import { RoomType } from "../../../backend/src/shared/types";

const Home = memo(() => {
  // const {data: rooms, isLoading} = useQuery("fetchQuery", () =>
  //   fetchAllHotel()
  // );
  const { data: rooms, isLoading } = useQuery<RoomType[]>("fetchQuery", fetchAllHotel);
  const topRowHotels = rooms?.slice(0, 2) || [];
  const bottomRowHotels = rooms?.slice(2) || [];
  if (isLoading) return <Loader />;

  return (
    <div>
      <section
          className="w-full h-[767px] bg-no-repeat bg-cover bg-center relative bg-black/10 bg-blend-soft-light"
          style={{
            backgroundImage: `url('https://res.klook.com/klook-hotel/image/upload/fl_lossy.progressive,c_fill,f_auto,w_750,q_85/trip/200o190000017widnBC12_R_550_412_R5.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
        
        {/* <div className='w-full h-auto text-[0px] absolute top-[32px] left-1/2 translate-x-[-50%] overflow-hidden z-[5]'> */}
        <div className=' w-full h-auto text-[0px] absolute top-[32px] left-1/2 translate-x-[-50%] overflow-hidden z-[5]'>
        <span className="block h-auto font-['Saira_SemiCondensed'] text-[5vw] md:text-[70px] font-medium leading-none text-[#f1f0f0] relative text-center whitespace-nowrap z-[6] mt-[10vw] md:mt-[237px] ml-[5vw] md:ml-[365px]">
        WELCOME GOLD COAST
        </span>
        <span className="block h-auto font-['Saira_SemiCondensed'] text-[5vw] md:text-[70px] font-medium leading-none text-[#f1f0f0] relative text-center whitespace-nowrap z-[7] mt-[1vw] md:mt-[4px] ml-[5vw] md:ml-[365px]">
        PIK BAHAMA JAKARTA
        </span>
        <span className="block h-auto font-['Roboto'] text-[4vw] md:text-[20px] font-medium leading-none text-[#f1f0f0] relative text-center whitespace-nowrap z-[8] ml-[5vw] md:ml-[365px]">
        RT.8/RW.2, Kanal Muara, Penjaringan, North Jakarta, City, Jakarta 14470
        </span>
        <span className="block h-auto font-['Roboto'] text-[4vw] md:text-[20px] font-medium leading-none text-[#f1f0f0] relative text-center whitespace-nowrap z-[8] mt-[2vw] md:mt-[11px] ml-[5vw] md:ml-[365px]">
        Telp: 081519386878
        </span>
        </div>
        </section>
    
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">Latest Destinations</h2>
      <p>Most recent desinations added by our hosts</p>
      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {topRowHotels.map((room) => (
            <LatestDestinationCard
              key={room.id}
              room={room}
              latest={true}
            />
          ))}
        </div>

        <div>
          <h2 className="text-3xl font-bold">Offers</h2>
          <p className="p-3">Promotions, deals, and special offers for you</p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <div className="border border-slate-200 p-4 rounded-md max-w-[600px] shadow-md">
              <section className="grid grid-cols-[2fr_1fr] w-full">
                <div className="relative">
                  <h3 className="text-xl font-bold">
                    Take your longest vacation yet
                  </h3>
                  <p className="text-sm md:text-base">
                    Browse properties offering long-term stays, many at reduced
                    monthly rates.
                  </p>
                  <Link
                    to={`/search`}
                    className="bg-blue-500 p-2 text-white font-semibold rounded-md absolute bottom-0"
                  >
                    Find a stay
                  </Link>
                </div>
                <div className="h-[150px]">
                  <img src="/family.jpeg" alt="family" className="h-full" />
                </div>
              </section>
            </div>
            <div className="border border-slate-200 p-4 rounded-md max-w-xl shadow-md">
              <section className="grid grid-cols-[2fr_1fr] w-full">
                <div className="relative">
                  <h3 className="text-xl font-bold">
                    Fly away to your dream vacation
                  </h3>
                  <p>
                    Get inspired – compare and book flights with flexibility
                  </p>
                  <Link
                    to={`/search`}
                    className="bg-blue-500 p-2 text-white font-semibold rounded-md absolute bottom-0"
                  >
                    Find a stay
                  </Link>
                </div>
                <div className="h-[150px]">
                  <img src="/family.jpeg" alt="family" className="h-full" />
                </div>
              </section>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {bottomRowHotels.map((room) => (
            <LatestDestinationCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </div>
    </div>
  );
});

export default Home;
