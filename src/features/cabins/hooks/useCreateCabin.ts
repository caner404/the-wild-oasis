import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createEditCabin } from '../api/apiCabins';

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('new cabin succesfully created');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { isCreating, createCabin };
}
