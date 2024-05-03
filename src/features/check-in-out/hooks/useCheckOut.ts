import { updateBooking } from '@/features/bookings/api/apiBookings';
import { Booking, BookingStatus } from '@/features/bookings/type/Booking';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useCheckOut() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckout } = useMutation({
    mutationFn: (bookingId: number) => updateBooking(bookingId, { status: BookingStatus.CHECKED_OUT }),
    onSuccess: (data: Booking) => {
      toast.success(`Booking #${data.id} successfully checked-out`);
      queryClient.invalidateQueries({});
    },
    onError: () => toast.error('There was an error wihle checking out'),
  });

  return { checkout, isCheckout };
}
