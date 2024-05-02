import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../api/apiBookings';
import { useParams } from 'react-router-dom';

export function useBooking() {
  const { bookingId } = useParams();

  const { isLoading, data: booking } = useQuery({
    queryKey: ['booking'],
    queryFn: () => getBooking(Number(bookingId)),
  });
  return { isLoading, booking };
}
