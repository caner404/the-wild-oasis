import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { BookingsParams, getBookings } from '../api/apiBookings';

export function useBookings() {
  const [searchParams] = useSearchParams();
  const bookingParams: BookingsParams = {} as BookingsParams;

  //Filter
  const filterValue = searchParams.get('status');
  bookingParams.filter = !filterValue || filterValue === 'all' ? null : { field: 'status', value: filterValue };
  //{ filter: { field: 'totalPrice', value: 5000, method: 'gte' } }; //how to do?

  //Sorting
  const sortBy = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortBy.split('-');
  bookingParams.sortBy = { field, direction };

  //PAGINATION
  bookingParams.pagination = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const { isLoading, data: { data: bookings, count } = {} } = useQuery({
    queryKey: ['bookings', bookingParams],
    //when the values of bookingParams changes, react-query will fetch the data
    // the queryKey Array is like the dependancy array in useEffect, if it changes, we will fetch new data
    queryFn: () => getBookings(bookingParams),
  });
  return { isLoading, bookings, count };
}
