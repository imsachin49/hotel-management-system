export interface BookingType {
  id: string;
  fullName: string;
  bookingDate: string;
  checkIn: string;
  checkOut: string;
  specialRquest: string;
  roomType: string;
  roomId: string | null;
  status: string;
}
