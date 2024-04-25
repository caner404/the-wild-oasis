import Spinner from '@/ui/Spinner';
import Table from '@/ui/Table';
import { CabinRow } from './CabinRow';
import { useCabins } from './hooks/useCabins';
import { Cabin } from './type/Cabin';
import Menus from '@/ui/Menus';

export function CabinTable() {
  const { isLoading, cabins } = useCabins();
  if (isLoading) return <Spinner />;
  return (
    <Menus.Root>
      <Table.Root columns=' 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body<Cabin>
          data={cabins!}
          render={(cabin) => (
            <CabinRow
              cabin={cabin}
              key={cabin.id}
            />
          )}
        ></Table.Body>
      </Table.Root>
    </Menus.Root>
  );
}
