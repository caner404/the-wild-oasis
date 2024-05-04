import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logout as logoutApi } from '../api/apiAuthentication';

export function useLogout() {
  const navigate = useNavigate();
  const query = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      query.removeQueries();
      navigate('/login', { replace: true });
    },
  });

  return { logout, isLoading };
}
