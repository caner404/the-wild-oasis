import { Cabin } from '@/features/cabins/type/Cabin';
import { Guest } from './Guest';

export type Booking = {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: BookingStatus;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  cabinId: number;
  guestId: number;
  cabins: Cabin;
  guests: Guest;
};

//Cabins und Guests sind großgeschriebe, weil die Supabase Tabellen auch so geschrieben sind
// und das mapping in  await supabase.from('Bookings').select('*,Cabins(*),Guests(*)'); sonst
// nicht funktiolniert. Man müsste sonst die Tabellen umbenennen

export enum BookingStatus {
  UNCONFIRMED = 'unconfirmed',
  CHECKED_IN = 'checked-in',
  CHECKED_OUT = 'checked-out',
}

export const statusToTagName: { [key in BookingStatus]: string } = {
  [BookingStatus.UNCONFIRMED]: 'blue',
  [BookingStatus.CHECKED_IN]: 'green',
  [BookingStatus.CHECKED_OUT]: 'silver',
};
