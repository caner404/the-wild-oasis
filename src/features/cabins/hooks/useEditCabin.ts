import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createEditCabin } from '../api/apiCabins';

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabinFn, isLoading: isEditing } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('Cabin succesfuuly updated');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (err: Error) => toast.error(err.message),
  });
  return { isEditing, editCabinFn };
}
