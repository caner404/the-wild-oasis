import { BookingTable } from '@/features/bookings';
import BookingTableOperations from '@/features/bookings/BookingTableOperations';
import { Row, Heading } from '@/ui/Layout';

function Bookings() {
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All bookings</Heading>
        <BookingTableOperations />
      </Row>
      <BookingTable />
    </>
  );
}

export default Bookings;
