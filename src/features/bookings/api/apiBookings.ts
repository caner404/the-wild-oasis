import supabase from '@/services/supabase';
import { getToday } from '@/utils/helpers';
import { Booking } from '../type/Booking';
import { PAGE_SIZE } from '@/utils/constants';

export type BookingsParams = {
  filter: { field: string; value: string | number } | null;
  sortBy: { field: string; direction: string } | null;
  page: number;
};

export async function getBookings({
  filter = null,
  sortBy = null,
  page = 1,
}: BookingsParams): Promise<{ data: Booking[]; count: number }> {
  let query = supabase.from('bookings').select('*,cabins(*),guests(*)', { count: 'exact' });
  //const { data, error } = await supabase.from('Bookings').select('*,Cabins(name),Guests(fullName,email)');

  //FILTER
  if (filter) {
    query = query.eq(filter.field, filter.value);
  }

  // SORTING
  if (sortBy) {
    query = query.order(sortBy.field, { ascending: sortBy.direction === 'asc' });
  }

  // page
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;
  if (error) {
    console.error(error);
    throw new Error('Bookings could not be loaded');
  }

  return { data, count: !count ? 0 : count };
}

export async function getBooking(id: number): Promise<Booking> {
  const { data, error } = await supabase.from('bookings').select('*, cabins(*), guests(*)').eq('id', id).single();

  if (error) {
    console.error(error);
    throw new Error('Booking not found');
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.

export async function getBookingsAfterDate(date: string): Promise<Booking[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string): Promise<Booking[]> {
  const { data, error } = await supabase
    .from('bookings')
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
export async function getStaysTodayActivity(): Promise<Booking[]> {
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
