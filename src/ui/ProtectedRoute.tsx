import { useUser } from '@/features/authentication';
import { PropsWithChildren, useEffect } from 'react';
import Spinner from './Spinner';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }: PropsWithChildren) {
  //1) get currentUser
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  // 2 when after loading the user is not logged in , redirect to login page
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate('/login');
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 3. While loading show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // return the application
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
