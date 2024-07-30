import { createContext, useContext, useState } from "react";
import axios from "axios";
import Toast from "../components/ui/Toast";
import { useQuery } from "react-query";
import { validateToken } from "../api/validateToken";

const MIDTRANS_API_URL = import.meta.env.VITE_MIDTRANS_API_URL || "";
const MIDTRANS_CLIENT_KEY = import.meta.env.VITE_MIDTRANS_CLIENT_KEY || "";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContextType = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  createMidtransTransaction: (transactionDetails: any) => Promise<any>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

  const { isError } = useQuery("validateToken", validateToken, {
    retry: false,
  });

  const createMidtransTransaction = async (transactionDetails: any) => {
    try {
      const response = await axios.post(`${MIDTRANS_API_URL}/transactions`, transactionDetails, {
        headers: {
          "Authorization": `Basic ${btoa(MIDTRANS_CLIENT_KEY + ":")}`,
          "Content-Type": "application/json"
        }
      });
      return response.data;
    } catch (error) {
      console.error("Midtrans transaction error", error);
      throw error;
    }
  };

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => setToast(toastMessage),
        isLoggedIn: !isError,
        createMidtransTransaction,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};





// import {createContext, useContext, useState} from "react";
// import {loadStripe, Stripe} from "@stripe/stripe-js";
// import Toast from "../components/ui/Toast";
// import {useQuery} from "react-query";
// import {validateToken} from "../api/validateToken";

// const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";

// type ToastMessage = {
//   message: string;
//   type: "SUCCESS" | "ERROR";
// };

// type AppContext = {
//   showToast: (toastMessage: ToastMessage) => void;
//   isLoggedIn: boolean;
//   stripePromise: Promise<Stripe | null>;
// };

// const AppContext = createContext<AppContext | undefined>(undefined);

// const stripePromise = loadStripe(STRIPE_PUB_KEY);

// export function AppContextProvider({children}: {children: React.ReactNode}) {
//   const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

//   const {isError} = useQuery("validateToken", validateToken, {
//     retry: false,
//   });

//   return (
//     <AppContext.Provider
//       value={{
//         showToast: (toastMessage) => setToast(toastMessage),
//         isLoggedIn: !isError,
//         stripePromise,
//       }}
//     >
//       {toast && (
//         <Toast
//           message={toast.message}
//           type={toast.type}
//           onClose={() => setToast(undefined)}
//         />
//       )}
//       {children}
//     </AppContext.Provider>
//   );
// }

// export const useAppContext = () => {
//   const context = useContext(AppContext);
//   return context as AppContext;
// };
