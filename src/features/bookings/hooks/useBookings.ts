import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../api/apiBookings';

export function useBookings() {
  const { isLoading, data: bookings } = useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings,
  });
  return { isLoading, bookings };
}
