import styled from 'styled-components';

import { Button, ButtonText, ButtonVariation } from '@/ui/Button';
import ButtonGroup from '@/ui/Button/ButtonGroup';

import Empty from '@/ui/Empty';
import { Heading, Row } from '@/ui/Layout';
import Spinner from '@/ui/Spinner';
import Tag from '@/ui/Tag';
import { useNavigate } from 'react-router-dom';
import { useMoveBack } from '../../hooks/useMoveBack';
import { BookingDataBox } from './BookingDataBox';
import { useBooking } from './hooks/useBooking';
import { BookingStatus, statusToTagName } from './type/Booking';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

export function BookingDetail() {
  const { isLoading, booking } = useBooking();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (!booking) return <Empty resource='booking' />;
  if (isLoading) return <Spinner />;
  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading as='h1'>Booking #{booking.id}</Heading>
          <Tag $type={statusToTagName[booking.status]}>{booking.status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {booking.status === BookingStatus.UNCONFIRMED && (
          <Button onClick={() => navigate(`/checkIn/${booking.id}`)}>check-in</Button>
        )}
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
