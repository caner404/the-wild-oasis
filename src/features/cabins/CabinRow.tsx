import { formatCurrency } from '@/utils/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { deleteCabin } from './api/apiCabins';
import { Cabin } from './type/Cabin';
import toast from 'react-hot-toast';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const StyledCabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

export function CabinRow({ cabin }: { cabin: Cabin }) {
  const queryClient = useQueryClient();
  const { id: cabinId, name, maxCapacity, regularPrice, discount, image } = cabin;

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: (id: number) => deleteCabin(id),
    onSuccess: () => {
      /*when delete was success, we should invalidate the cabins and so forcing a 
        a refetch of cabins data , which updates the state and therefore the UI
      */
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      toast.success('Cabin successfully deleted');
    },
    onError: (err: Error) => toast.error(err.message),
  });
  return (
    <TableRow role='row'>
      <Img src={image} />
      <StyledCabin>{name}</StyledCabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <button
        onClick={() => mutate(cabinId)}
        disabled={isDeleting}
      >
        Delete
      </button>
    </TableRow>
  );
}
