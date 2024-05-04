import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../api/apiAuthentication';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const navigate = useNavigate();
  const query = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => loginApi({ email, password }),
    onSuccess: (user) => {
      // set data into react query cache,
      query.setQueryData(['user'], user.user);
      navigate('/dashboard');
    },
    onError: (err: Error) => {
      console.log(err);
      toast.error('Provided email or password are incorrect');
    },
  });

  return { login, isLoading };
}
