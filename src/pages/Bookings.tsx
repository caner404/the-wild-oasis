import { BookingTable } from '@/features/bookings';
import { Row, Heading } from '@/ui/Layout';

function Bookings() {
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All bookings</Heading>
        <p>TEST</p>
      </Row>
      <BookingTable />
    </>
  );
}

export default Bookings;
