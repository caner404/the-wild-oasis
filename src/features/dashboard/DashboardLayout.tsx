import styled from 'styled-components';
import { useRecentBookings } from './hooks/useRecentBookings';
import Spinner from '@/ui/Spinner';
import { useRecentStays } from './hooks';
import { Stats } from './Stats';
import Empty from '@/ui/Empty';
import { useCabins } from '../cabins/hooks';
import { SalesChart } from './SalesChart';
import { DurationChart } from './DurationChart';
import { TodayActivity } from '../check-in-out';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export function DashboardLayout() {
  const { bookings: recentBookings, isLoading: isLoadingRecentBookings, numDays } = useRecentBookings();
  const { confirmedStays, isLoading: isLoadingRecentStays } = useRecentStays();
  const { cabins, isLoading: isLoadingCabins } = useCabins();

  if (isLoadingRecentBookings || isLoadingRecentStays || isLoadingCabins) return <Spinner />;

  if (!recentBookings || !confirmedStays) return <Empty resource='bookings' />;
  if (!confirmedStays) return <Empty resource='stays' />;
  if (!cabins) return <Empty resource='cabins' />;

  return (
    <>
      <StyledDashboardLayout>
        <Stats
          bookings={recentBookings}
          confirmedStays={confirmedStays}
          numDays={numDays}
          cabinCount={cabins?.length}
        />
        <TodayActivity />
        <DurationChart confirmStays={confirmedStays} />
        <SalesChart
          bookings={recentBookings}
          numDays={numDays}
        />
      </StyledDashboardLayout>
    </>
  );
}
