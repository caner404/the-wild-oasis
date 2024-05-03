import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteBooking as deleteBookingApi } from '../api/apiBookings';

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (id: number) => deleteBookingApi(id),
    onSuccess: () => {
      /*when delete was success, we should invalidate the Bookings and so forcing a 
        a refetch of Bookings data , which updates the state and therefore the UI
      */
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast.success('Booking successfully deleted');
    },
    onError: (err: Error) => toast.error(err.message),
  });
  return { isDeleting, deleteBooking };
}
