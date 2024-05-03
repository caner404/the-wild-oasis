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
import { useCheckOut } from '@/features/check-in-out';
import { useDeleteBooking } from './hooks/useDeleteBooking';
import Modal from '@/ui/Modal';
import ConfirmDelete from '@/ui/ConfirmDelete';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

export function BookingDetail() {
  const { isLoading, booking } = useBooking();
  const { checkout, isCheckout } = useCheckOut();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const navigate = useNavigate();
  const moveBack = useMoveBack();

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

        {booking.status === BookingStatus.CHECKED_IN && (
          <Button
            disabled={isCheckout}
            onClick={() => {
              checkout(booking.id);
            }}
          >
            check-out
          </Button>
        )}
        <Button
          $variation={ButtonVariation.SECONDARY}
          onClick={moveBack}
        >
          Back
        </Button>

        <Modal.Root>
          <Modal.Open opens='bookingDetailsDelete'>
            <Button $variation={ButtonVariation.DANGER}>Delete</Button>
          </Modal.Open>
          <Modal.Window name='bookingDetailsDelete'>
            <ConfirmDelete
              resourceName='booking'
              disabled={isDeleting}
              onConfirm={() => {
                deleteBooking(booking.id);
                navigate('/bookings');
              }}
            />
          </Modal.Window>
        </Modal.Root>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
