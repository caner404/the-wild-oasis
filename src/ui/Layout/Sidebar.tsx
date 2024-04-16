import styled from 'styled-components';
import Logo from '../Logo';
import { MainNav } from '@/ui/Layout';

const StyledSidebar = styled.aside`
  background-color: var(--clolor-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--clolor-grey-100);

  grid-row: 1 / 3;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
export function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}
