import { CabinTable } from '@/features/cabins';
import CreateCabinForm from '@/features/cabins/CreateCabinForm';
import { Button } from '@/ui/Button';
import { Heading, Row } from '@/ui/Layout';
import { useState } from 'react';

function Cabins() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinTable />

        <Button onClick={() => setShowForm((showForm) => !showForm)}>Add new cabin</Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
