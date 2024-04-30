import styled from 'styled-components';

import { useMoveBack } from '../../hooks/useMoveBack';
import { Button, ButtonVariation } from '@/ui/Button';
import ButtonGroup from '@/ui/Button/ButtonGroup';
import ButtonText from '@/ui/Button/ButtonText';
import { Row, Heading } from '@/ui/Layout';
import Tag from '@/ui/Tag';
import { BookingDataBox } from './BookingDataBox';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

export function BookingDetail() {
  const booking = {};
  const status = 'checked-in';

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading as='h1'>Booking #X</Heading>
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
