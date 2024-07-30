

export interface RoomType  {
  id: string; // ID ruangan
  // user: UserType; // Pemilik ruangan
  userId: string;
  name: string; // Nama ruangan
  city: string; // Kota
  description: string; // Deskripsi ruangan
  breakfast: string; // Sarapan
  type: string; // Tipe ruangan
  adultCount: number; // Jumlah dewasa
  childCount: number; // Jumlah anak
  facilities: string[]; // Fasilitas
  starRating: number; // Rating bintang
  imageUrls: string[]; // URL gambar
  lastUpdated: Date; // Tanggal terakhir diperbarui
  // Availability: AvailabilityType[];
  roomAvailabilitys: RoomAvailabilityType[]; // Ketersediaan ruangan
  bookings: BookingType[]; // Pemesanan
  // roomAvailability: string[]; // Array of RoomAvailabilityType IDs
  //bookings: string[]; // Array of BookingType IDs
}

export interface UserType {
  id: string;
  email: string;
  password?: string ;
  passwordConfirm?: string ;
  firstName: string;
  avatar: string;
  lastName: string;
   //role?: string;
   role?: 'admin' | 'user';
}

export interface HotelSearchResponse {
  //hotels: HotelType[];
  rooms: RoomWithAvailability[]; // Menggunakan tipe data baru yang telah diperbarui
  pagination: {
    totalDocument: number;
    page: number;
    pages: number;
  };
}

export interface BookingType  {
  id: string;
  userId: string; // Referensi ke User
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
  paymentIntentId?: string; // Opsional jika menggunakan pembayaran
  status: "pending" | "acc" | "cancel"; // Status pemesanan
  cart: CartItemType[]; // Daftar item dalam keranjang
};

export type CartItemType = {
  id: string;
  roomName: string;
  roomId: string; 
  roomAvailId: string;
  price: number;
  qty: number;
};
// export interface CartItemType {
//   roomName: string;
//   roomId: string; // ID ruangan yang dipesan
//   hotelId: string; // ID hotel tempat ruangan berada
//   price: number; // Harga per unit
//   qty: number; // Kuantitas
// }

export type PaymentIntentResponse = {
  paymentIntentId: string;
  clientSecret: string;
  totalCost: number;
};
// export type RoomAvailabilityType = {
//   _id: string;
//   hotel: HotelType;
//   roomName: string;
//   availability: Availability[];
// }
export interface RoomAvailabilityType extends Document {
  id: string;
  roomId: string; // ID ruangan
  roomName: string; // Nama ruangan
  availability: AvailabilityType[]; // Ketersediaan ruangan
}
export interface AvailabilityType {
  id?: string;
  date: Date; // Tanggal ketersediaan
  availableRooms: number; // Jumlah kamar yang tersedia
  price: number; // Harga kamar
}

export interface RoomAvailabilityDetail {
  roomName: string; // Nama ruangan
  availability: {
    date: Date; // Tanggal ketersediaan
    availableRooms: number; // Jumlah kamar yang tersedia
    price: number; // Harga kamar
  }[];
}

// Definisikan interface yang memperluas HotelType
export interface RoomWithAvailability extends RoomType {
  roomAvailability: RoomAvailabilityDetail[]; // Detail ketersediaan ruangan
}
