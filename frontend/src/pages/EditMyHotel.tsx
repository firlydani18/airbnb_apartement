import {QueryClient, useMutation, useQuery} from "react-query";
import { useParams} from "react-router-dom";
import { roomById, updateMyRoomById} from "../api/hotelApi";
import ManageHotelForm from "../components/Form/HotelForm/ManageHotelForm";
import {useAppContext} from "../context/AppContext";
import Loader from "../components/ui/Loader";

export default function EditMyHotel() {
  const {roomId} = useParams();
  const {showToast} = useAppContext();
  //const navigate = useNavigate();
  const queryClient = new QueryClient();

  const {data: room, isLoading: dataLoading} = useQuery("roomById", () =>
    roomById(roomId!)
  );

  const {mutate, isLoading} = useMutation(updateMyRoomById, {
    onSuccess: () => {
      showToast({message: "Apartement Saved!", type: "SUCCESS"});
      window.location.reload();
      // navigate(`/set-availability/${hotelId}`);
    },
    onError: () => {
      showToast({message: "Error Saving Apartement", type: "ERROR"});
    },
    onSettled: () => {
      // Invalidate the 'hotelById' query when the mutation is complete
      // queryClient.invalidateQueries({queryKey: ["hotelById"]});
      queryClient.invalidateQueries({ queryKey: ["roomById", roomId] });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };
  if (dataLoading) return <Loader />;

  if (room === null)
    return <div className="text-center font-bold text-2xl">🙅🏻🙅🏻 No data.</div>;

  return (
    <ManageHotelForm room={room} onSave={handleSave} isLoading={isLoading} />
  );
}
