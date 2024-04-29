import Spinner from '@/ui/Spinner';
import Table from '@/ui/table/Table';
import { CabinRow } from './CabinRow';
import { useCabins } from './hooks/useCabins';
import { Cabin } from './type/Cabin';
import Menus from '@/ui/Menus';
import { useSearchParams } from 'react-router-dom';

export function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  // 1) filter
  const filterValue = searchParams.get('discount') || 'all';
  let filteredCabins: Cabin[] = [];
  if (cabins !== undefined) {
    if (filterValue === 'all') filteredCabins = cabins;
    if (filterValue === 'no-discount') filteredCabins = cabins?.filter((value) => value.discount === 0);
    if (filterValue === 'with-discount') filteredCabins = cabins?.filter((value) => value.discount !== 0);
  }
  // 2) sort
  const sortBy = searchParams.get('sortBy') || '';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;

  type CabinKey = keyof Cabin;
  const fieldKey: CabinKey = field as CabinKey;
  const sortedCabins = filteredCabins.sort((a, b) => (Number(a[fieldKey]) - Number(b[fieldKey])) * modifier);

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
          data={sortedCabins!}
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
