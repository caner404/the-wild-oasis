import { format, isToday } from 'date-fns';
import styled from 'styled-components';

import Tag from '@/ui/Tag';
import Table from '@/ui/table/Table';
import { formatCurrency, formatDistanceFromNow } from '../../utils/helpers';

import Menus from '@/ui/Menus';
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { Booking, BookingStatus, statusToTagName } from './type/Booking';
import { useCheckOut } from '@/features/check-in-out';

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
`;

export function BookingRow({
  booking: {
    id,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    Guests: { fullName: guestName, email },
    Cabins: { name: cabinName },
  },
}: {
  booking: Booking;
}) {
  const navigate = useNavigate();
  const { isCheckout, checkout } = useCheckOut();

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate)) ? 'Today' : formatDistanceFromNow(startDate)} &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), 'MMM dd yyyy')} &mdash; {format(new Date(endDate), 'MMM dd yyyy')}
        </span>
      </Stacked>

      <Tag $type={statusToTagName[status]}>{status.toString().replace('-', ' ')}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Menus.Root>
        <Menus.Toggle id={id} />
        <Menus.List id={id}>
          <Menus.Button
            icon={<HiEye />}
            onClick={() => navigate(`/bookings/${id}`)}
          >
            Show details
          </Menus.Button>
          {status === BookingStatus.UNCONFIRMED && (
            <Menus.Button
              icon={<HiArrowDownOnSquare />}
              onClick={() => navigate(`/checkIn/${id}`)}
            >
              check-in
            </Menus.Button>
          )}
          {status === BookingStatus.CHECKED_IN && (
            <Menus.Button
              disabled={isCheckout}
              icon={<HiArrowUpOnSquare />}
              onClick={() => {
                checkout(id);
              }}
            >
              check-out
            </Menus.Button>
          )}
        </Menus.List>
      </Menus.Root>
    </Table.Row>
  );
}
