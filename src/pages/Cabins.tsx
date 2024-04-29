import { AddCabin, CabinTable } from '@/features/cabins';
import CabinTableOperations from '@/features/cabins/CabinTableOperations';
import { Heading, Row } from '@/ui/Layout';

function Cabins() {
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
