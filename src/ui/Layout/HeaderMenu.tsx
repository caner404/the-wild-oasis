import { Logout } from '@/features/authentication';
import { HiOutlineUser } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonIcon } from '../Button';

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

export function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate('/account')}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}
