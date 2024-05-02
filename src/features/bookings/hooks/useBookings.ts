import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { BookingsParams, getBookings } from '../api/apiBookings';
import { PAGE_SIZE } from '@/utils/constants';

export function useBookings() {
  const queryClient = useQueryClient();
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
  bookingParams.page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const { isLoading, data: { data: bookings, count } = {} } = useQuery({
    queryKey: ['bookings', bookingParams],
    //when the values of bookingParams changes, react-query will fetch the data
    // the queryKey Array is like the dependancy array in useEffect, if it changes, we will fetch new data
    queryFn: () => getBookings(bookingParams),
  });

  // PRE-FETCHING the next page
  const pageCount = !count ? 1 : Math.ceil(count / PAGE_SIZE);

  if (bookingParams.page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', { ...bookingParams, page: bookingParams.page + 1 }],
      queryFn: () => getBookings({ ...bookingParams, page: bookingParams.page + 1 }),
    });
  }

  // it can make sense to prefectch previous pages even though we have them in most cases
  // in cache. Uses cases for prefetching previous pages:
  // 1 )user navigates through URL
  // 2) we have a complex pagination like < Previous 3 4 5 6 7 Next >
  if (bookingParams.page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', { ...bookingParams, page: bookingParams.page - 1 }],
      queryFn: () => getBookings({ ...bookingParams, page: bookingParams.page - 1 }),
    });
  }
  return { isLoading, bookings, count };
}
