import styled from 'styled-components';
import { useRecentBookings } from './hooks/useRecentBookings';
import Spinner from '@/ui/Spinner';
import { useRecentStays } from './hooks';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export function DashboardLayout() {
  const { bookings, isLoading: isLoadingRecentBookings } = useRecentBookings();
  const { stays, confirmedStays, isLoading: isLoadingRecentStays } = useRecentStays();

  if (isLoadingRecentBookings || isLoadingRecentStays) return <Spinner />;

  return (
    <>
      <StyledDashboardLayout></StyledDashboardLayout>
    </>
  );
}
