import { updateBooking } from '@/features/bookings/api/apiBookings';
import { Booking, BookingStatus } from '@/features/bookings/type/Booking';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useCheckingIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckinIn } = useMutation({
    mutationFn: ({ bookingId, booking }: { bookingId: number; booking?: Partial<Booking> }) =>
      updateBooking(bookingId, { status: BookingStatus.CHECKED_IN, isPaid: true, ...booking }),
    onSuccess: (data: Booking) => {
      toast.success(`Booking #${data.id} successfully checked-in`);
      queryClient.invalidateQueries({});
      navigate('/');
    },
    onError: () => toast.error('There was an error wihle checking in'),
  });

  return { checkin, isCheckinIn };
}
