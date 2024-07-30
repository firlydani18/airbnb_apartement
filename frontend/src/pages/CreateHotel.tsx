import {useMutation} from "react-query";
import ManageHotelForm from "../components/Form/HotelForm/ManageHotelForm";
import {useAppContext} from "../context/AppContext";
import { addMyRoom} from "../api/hotelApi";
import {useNavigate} from "react-router-dom";

export default function CreateHotel() {
  const {showToast} = useAppContext();
  const navigate = useNavigate();

  const {mutate, isLoading, reset} = useMutation(addMyRoom, {
    onSuccess: () => {
      reset();
      showToast({message: "Apartement Created Successfully", type: "SUCCESS"});
      navigate("/my-apartement");
      //navigate("/availability/add-stock");
    },
    onError: () => {
      showToast({message: "Error in creating Apartement", type: "ERROR"});
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <div>
      <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
    </div>
  );
}
