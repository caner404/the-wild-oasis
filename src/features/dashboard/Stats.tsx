import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from 'react-icons/hi2';
import Stat from './Stat';
import { Booking } from '@/features/bookings';
import { formatCurrency } from '@/utils';

interface StatsProps {
  bookings: Booking[];
  confirmedStays: Booking[];
  numDays: number;
  cabinCount: number;
}
export function Stats({ bookings, confirmedStays, numDays, cabinCount }: StatsProps) {
  const numBookings = bookings.length;
  const checkins = confirmedStays.length;
  const sales = bookings.filter((booking) => booking.isPaid).reduce((acc, cur) => acc + cur.totalPrice, 0);
  const occupationRate = confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) / (numDays * cabinCount);

  return (
    <>
      <Stat
        title='Bookings'
        color='blue'
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title='Sales'
        color='green'
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title='Check ins'
        color='indigo'
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title='Occupancy rate'
        color='yellow'
        icon={<HiOutlineChartBar />}
        value={`${Math.round(occupationRate * 100)}%`}
      />
    </>
  );
}
