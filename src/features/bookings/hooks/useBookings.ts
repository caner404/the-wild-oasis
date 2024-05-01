import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { BookingsParams, getBookings } from '../api/apiBookings';

export function useBookings() {
  const [searchParams] = useSearchParams();
  //Filter

  const filterValue = searchParams.get('status');
  const bookingParams: BookingsParams =
    !filterValue || filterValue === 'all' ? { filter: null } : { filter: { field: 'status', value: filterValue } };
  //{ filter: { field: 'totalPrice', value: 5000, method: 'gte' } };

  const { isLoading, data: bookings } = useQuery({
    queryKey: ['bookings', bookingParams],
    //when the values of bookingParams changes, react-query will fetch the data
    // the queryKey Array is like the dependancy array in useEffect, if it changes, we will fetch new data
    queryFn: () => getBookings(bookingParams),
  });
  return { isLoading, bookings };
}
