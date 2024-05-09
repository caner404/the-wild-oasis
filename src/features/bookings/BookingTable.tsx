import Empty from '@/ui/Empty';
import Menus from '@/ui/Menus';
import Spinner from '@/ui/Spinner';
import Table from '@/ui/table/Table';
import { useBookings } from './hooks/useBookings';
import { BookingRow } from './BookingRow';
import { Pagination } from '@/ui/Pagination';

export function BookingTable() {
  const { isLoading, bookings, count } = useBookings();

  if (isLoading) return <Spinner />;
  if (!bookings || !count) return <Empty resource='bookings' />;

  return (
    <Menus.Root>
      <Table.Root columns='0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem'>
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow
              key={booking.id}
              booking={booking}
            />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table.Root>
    </Menus.Root>
  );
}
