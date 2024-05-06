import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateCurrentUser as updateCurrentUserApi } from '../api/apiAuthentication';

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateCurrentUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUserApi,
    onSuccess: () => {
      toast.success('User account succesfully updated');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (err: Error) => toast.error(err.message),
  });
  return { isUpdating, updateCurrentUser };
}
