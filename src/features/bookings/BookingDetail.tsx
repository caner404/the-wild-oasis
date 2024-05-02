import styled from 'styled-components';

import { Button, ButtonVariation } from '@/ui/Button';
import ButtonGroup from '@/ui/Button/ButtonGroup';
import ButtonText from '@/ui/Button/ButtonText';
import { Heading, Row } from '@/ui/Layout';
import Tag from '@/ui/Tag';
import { useMoveBack } from '../../hooks/useMoveBack';
import { statusToTagName } from './type/Booking';
import { useBooking } from './hooks/useBooking';
import { BookingDataBox } from './BookingDataBox';
import Spinner from '@/ui/Spinner';
import Empty from '@/ui/Empty';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

export function BookingDetail() {
  const { isLoading, booking } = useBooking();
  const status = 'checked-in';

  const moveBack = useMoveBack();

  if (!booking) return <Empty resource='booking' />;
  if (isLoading) return <Spinner />;
  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading as='h1'>Booking #{booking.id}</Heading>
          <Tag $type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button
          $variation={ButtonVariation.SECONDARY}
          onClick={moveBack}
        >
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
