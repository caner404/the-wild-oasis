import { getCabins } from '@/services/apiCabins';
import { Row, Heading } from '@/ui/Layout';
import { useEffect } from 'react';

function Cabins() {
  useEffect(function () {
    getCabins().then((data) => console.log(data));
  }, []);
  return (
    <Row type='horizontal'>
      <Heading as='h1'>All cabins</Heading>
      <p>TEST</p>
    </Row>
  );
}

export default Cabins;
