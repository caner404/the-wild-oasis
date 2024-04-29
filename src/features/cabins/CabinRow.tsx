import ConfirmDelete from '@/ui/ConfirmDelete';
import Menus from '@/ui/Menus';
import Modal from '@/ui/Modal';
import Table from '@/ui/table/Table';
import { formatCurrency } from '@/utils/helpers';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import styled from 'styled-components';
import CreateCabinForm from './CreateCabinForm';
import { useCreateCabin } from './hooks';
import { useDeleteCabin } from './hooks/useDeleteCabin';
import { Cabin } from './type/Cabin';

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
  const { id: cabinId, name, maxCapacity, regularPrice, discount, image, description } = cabin;
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { createCabin } = useCreateCabin();

  function handleDuplicate() {
    createCabin({
      newCabin: {
        name: `Copy of ${name}`,
        maxCapacity,
        regularPrice,
        discount,
        image,
        description,
      },
      id: undefined,
    });
  }

  return (
    <Table.Row>
      <Img src={image} />
      <StyledCabin>{name}</StyledCabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}
      <div>
        <Modal.Root>
          <Menus.Menu>
            <Menus.Toggle id={cabin.id} />
            <Menus.List id={cabin.id}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={handleDuplicate}
              >
                Duplicate
              </Menus.Button>
              <Modal.Open opens='edit'>
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>
              <Modal.Open opens='delete'>
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name='edit'>
              <CreateCabinForm editCabin={cabin} />
            </Modal.Window>

            <Modal.Window name='delete'>
              <ConfirmDelete
                resourceName='cabin'
                onConfirm={() => deleteCabin(cabinId)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal.Root>
      </div>
    </Table.Row>
  );
}
