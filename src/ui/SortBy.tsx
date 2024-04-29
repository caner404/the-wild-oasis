import { useSearchParams } from 'react-router-dom';
import { Select } from './Form';

interface SortByProps {
  options: { label: string; value: string }[];
}
function SortBy(props: SortByProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get('sortBy') || ''; //will select first element;
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={props.options}
      type='white'
      onChange={handleChange}
      activeValue={currentFilter}
    ></Select>
  );
}

export default SortBy;
