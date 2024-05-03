import styled from 'styled-components';

import { Button, ButtonText, ButtonVariation } from '@/ui/Button';
import ButtonGroup from '@/ui/Button/ButtonGroup';
import Empty from '@/ui/Empty';
import Checkbox from '@/ui/Form/Checkbox';
import { Heading, Row } from '@/ui/Layout';
import Spinner from '@/ui/Spinner';
import { useEffect, useState } from 'react';

import { BookingDataBox } from '../bookings/BookingDataBox';
import { useBooking } from '../bookings/hooks/useBooking';
import { formatCurrency } from '@/utils/helpers';
import { useCheckingIn } from './hooks/useCheckIn';
import { useSettings } from '../settings/hooks/useSettings';
import { Setting } from '../settings/type/Setting';
import { useMoveBack } from '@/hooks';

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
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { settings = {} as Setting, isLoading: isLoadingSettings } = useSettings();

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  if (isLoading || isLoadingSettings) return <Spinner />;
  if (!booking) return <Empty resource='booking' />;

  const {
    id: bookingId,
    totalPrice,
    hasBreakfast,
    numGuests,
    numNights,
    guests: { fullName },
  } = booking;

  const optionalBreakfast = settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        booking: { hasBreakfast: true, extrasPrice: optionalBreakfast, totalPrice: totalPrice + optionalBreakfast },
      });
    } else {
      checkin({ bookingId });
    }
  }
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            id='breakfast'
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((breakfast) => !breakfast);
              setConfirmPaid(false);
            }}
            disabled={isCheckinIn}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfast)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid || isCheckinIn}
          id='confirm'
        >
          I confirm that {fullName} has paid the total amount of{' '}
          {!addBreakfast ? formatCurrency(totalPrice) : formatCurrency(totalPrice + optionalBreakfast)}
          {`( ${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfast)})`}
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
