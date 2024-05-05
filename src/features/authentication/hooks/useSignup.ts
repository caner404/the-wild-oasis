import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../api/apiAuthentication';
import toast from 'react-hot-toast';

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success('Account was created');
    },
  });
  return { signup, isLoading };
}
