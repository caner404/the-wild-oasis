import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import { ButtonIcon } from './Button';
import { useDarkMode } from '@/context';

export function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return <ButtonIcon onClick={toggleDarkMode}>{isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}</ButtonIcon>;
}
