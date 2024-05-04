import { ButtonIcon } from '@/ui/Button/ButtonIcon';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { useLogout } from './hooks';

export function Logout() {
  const { logout, isLoading } = useLogout();
  return (
    <>
      <ButtonIcon
        disabled={isLoading}
        onClick={() => logout()}
      >
        <HiArrowRightOnRectangle />
      </ButtonIcon>
    </>
  );
}
