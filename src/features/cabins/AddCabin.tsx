import { Button } from '@/ui/Button';
import Modal from '@/ui/Modal';
import CreateCabinForm from './CreateCabinForm';

export function AddCabin() {
  return (
    <div>
      <Modal.Root>
        <Modal.Open opens='cabin-form'>
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name='cabin-form'>
          <CreateCabinForm />
        </Modal.Window>
      </Modal.Root>
    </div>
  );
}
