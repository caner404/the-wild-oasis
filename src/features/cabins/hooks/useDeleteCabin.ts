import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCabin as deleteCabinApi } from '../api/apiCabins';

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: (id: number) => deleteCabinApi(id),
    onSuccess: () => {
      /*when delete was success, we should invalidate the cabins and so forcing a 
        a refetch of cabins data , which updates the state and therefore the UI
      */
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      toast.success('Cabin successfully deleted');
    },
    onError: (err: Error) => toast.error(err.message),
  });
  return { isDeleting, deleteCabin };
}
