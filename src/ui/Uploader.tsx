import { useState } from 'react';
import { isFuture, isPast, isToday } from 'date-fns';
import supabase from '../services/supabase';
import { subtractDates } from '../utils/helpers';

import { bookings } from '../data/data-bookings';
import { cabins } from '../data/data-cabins';
import { guests } from '../data/data-guests';
import { Button } from './Button';

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };

async function deleteGuests() {
  const { error } = await supabase.from('Guests').delete().gt('id', 0);
  if (error) console.log(error.message);
}

async function deleteCabins() {
  const { error } = await supabase.from('Cabins').delete().gt('id', 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from('Bookings').delete().gt('id', 0);
  if (error) console.log(error.message);
}

async function createGuests() {
  const { error } = await supabase.from('Guests').insert(guests);
  if (error) console.log(error.message);
}

async function createCabins() {
  const { error } = await supabase.from('Cabins').insert(cabins);
  if (error) console.log(error.message);
}

async function createBookings() {
  // Bookings need a guestId and a cabinId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and cabinIds, and then replace the original IDs in the booking data with the actual ones from the DB
  const { data: guestsIds } = await supabase.from('Guests').select('id').order('id');
  const { data: cabinsIds } = await supabase.from('Cabins').select('id').order('id');

  if (guestsIds === null || cabinsIds === null) return;
  const allGuestIds = guestsIds.map((cabin) => cabin.id);
  const allCabinIds = cabinsIds.map((cabin) => cabin.id);

  console.log(allGuestIds);
  console.log(allCabinIds);
  console.log(bookings);

  const finalBookings = bookings.map((booking) => {
    // Here relying on the order of cabins, as they don't have and ID yet
    const cabin = cabins.at(booking.cabinId! - 1);
    if (cabin === undefined) {
      console.log('cabin undefined');
      return;
    }
    const numNights = subtractDates(booking.endDate, booking.startDate);
    const cabinPrice = numNights * (cabin.regularPrice! - cabin.discount!);
    const extrasPrice = booking.hasBreakfast ? numNights * 15 * booking.numGuests! : 0; // hardcoded breakfast price
    const totalPrice = cabinPrice + extrasPrice;

    let status;
    if (!booking.endDate || !booking.startDate) return;
    if (isPast(new Date(booking.endDate)) && !isToday(new Date(booking.endDate))) status = 'checked-out';
    if (isFuture(new Date(booking.startDate)) || isToday(new Date(booking.startDate))) status = 'unconfirmed';
    if (
      (isFuture(new Date(booking.endDate)) || isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = 'checked-in';

    return {
      ...booking,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      guestId: allGuestIds.at(booking.guestId! - 1),
      cabinId: allCabinIds.at(booking.cabinId! - 1),
      status,
    };
  });

  console.log('---- Final Bookings -----');
  console.log(finalBookings);

  const { error } = await supabase.from('Bookings').insert(finalBookings);
  if (error) console.log(error.message);
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    // Bookings need to be deleted FIRST
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    // Bookings need to be created LAST
    await createGuests();
    await createCabins();
    await createBookings();

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <div
      style={{
        marginTop: 'auto',
        backgroundColor: '#e0e7ff',
        padding: '8px',
        borderRadius: '5px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <h3>SAMPLE DATA</h3>

      <Button
        onClick={uploadAll}
        disabled={isLoading}
      >
        Upload ALL
      </Button>

      <Button
        onClick={uploadBookings}
        disabled={isLoading}
      >
        Upload bookings ONLY
      </Button>
    </div>
  );
}

export default Uploader;
