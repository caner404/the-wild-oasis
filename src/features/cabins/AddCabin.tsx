import Modal from '@/ui/Modal';
import CreateCabinForm from './CreateCabinForm';
import { Button } from '@/ui/Button';
import { CabinTable } from './CabinTable';

export function AddCabin() {
  /*  const [isOpenModal, setisOpenModal] = useState(false);
  return (
    <>
      <Button onClick={() => setisOpenModal((isOpenModal) => !isOpenModal)}>Add new cabin</Button>
      {isOpenModal && (
        <Modal onClose={() => setisOpenModal(false)}>
          <CreateCabinForm onClose={() => setisOpenModal(false)} />
        </Modal>
      )}
    </>
  ); */

  return (
    <Modal.Root>
      <Modal.Open opens='cabin-form'>
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name='cabin-form'>
        <CreateCabinForm />
      </Modal.Window>

      <Modal.Open opens='table'>
        <Button>Show Table</Button>
      </Modal.Open>
      <Modal.Window name='table'>
        <CabinTable />
      </Modal.Window>
    </Modal.Root>
  );
}
