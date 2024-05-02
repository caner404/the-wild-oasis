import styled from 'styled-components';

import { Button, ButtonText, ButtonVariation } from '@/ui/Button';
import ButtonGroup from '@/ui/Button/ButtonGroup';
import Empty from '@/ui/Empty';
import Checkbox from '@/ui/Form/Checkbox';
import { Heading, Row } from '@/ui/Layout';
import Spinner from '@/ui/Spinner';
import { useEffect, useState } from 'react';
import { useMoveBack } from '../../hooks/useMoveBack';
import { BookingDataBox } from '../bookings/BookingDataBox';
import { useBooking } from '../bookings/hooks/useBooking';
import { formatCurrency } from '@/utils/helpers';
import { useCheckingIn } from './hooks/useCheckIn';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { isLoading, booking } = useBooking();
  const moveBack = useMoveBack();
  const { checkin, isCheckinIn } = useCheckingIn();

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resource='booking' />;

  const {
    id: bookingId,
    totalPrice,
    Guests: { fullName },
  } = booking;

  function handleCheckin() {
    if (!confirmPaid) return;
    checkin(bookingId);
  }
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid || isCheckinIn}
          id='confirm'
        >
          I confirm that {fullName} has paid the total amount of {formatCurrency(totalPrice)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!confirmPaid || isCheckinIn}
        >
          Check in booking #{bookingId}
        </Button>
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

export default CheckinBooking;
