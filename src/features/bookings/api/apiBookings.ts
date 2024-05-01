import supabase from '@/services/supabase';
import { getToday } from '@/utils/helpers';
import { Booking } from '../type/Booking';

export type BookingsParams = {
  filter: { field: string; value: string | number } | null;
  sortBy: { field: string; direction: string } | null;
};

export async function getBookings({ filter = null, sortBy = null }: BookingsParams): Promise<Booking[]> {
  let query = supabase.from('Bookings').select('*,Cabins(*),Guests(*)');
  //const { data, error } = await supabase.from('Bookings').select('*,Cabins(name),Guests(fullName,email)');

  //FILTER
  if (filter) {
    query = query.eq(filter.field, filter.value);
  }

  // SORTING
  if (sortBy) {
    query = query.order(sortBy.field, { ascending: sortBy.direction === 'asc' });
  }

  const { data, error } = await query;
  if (error) {
    console.error(error);
    throw new Error('Bookings could not be loaded');
  }

  return data;
}

export async function getBooking(id: number) {
  const { data, error } = await supabase.from('bookings').select('*, cabins(*), guests(*)').eq('id', id).single();

  if (error) {
    console.error(error);
    throw new Error('Booking not found');
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('created_at, totalPrice, extrasPrice')
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string) {
  const { data, error } = await supabase
    .from('bookings')
    // .select('*')
    .select('*, guests(fullName)')
    .gte('startDate', date)
    .lte('startDate', getToday());

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName, nationality, countryFlag)')
    .or(`and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`)
    .order('created_at');

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }
  return data;
}

export async function updateBooking(id: number, obj: Partial<Booking>) {
  const { data, error } = await supabase.from('bookings').update(obj).eq('id', id).select().single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
  return data;
}

export async function deleteBooking(id: number) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  return data;
}
