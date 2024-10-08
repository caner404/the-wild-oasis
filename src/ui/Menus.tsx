import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import styled from 'styled-components';

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<{ $position: { x: number; y: number } }>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

interface MenuContextType {
  openId: number;
  close: () => void;
  open: Dispatch<SetStateAction<number>>;
  position: { x: number; y: number };
  setPosition: Dispatch<SetStateAction<{ x: number; y: number }>>;
}

const MenuContext = createContext<MenuContextType>({
  openId: 0,
  close: () => {},
  open: () => {},
  position: { x: 0, y: 0 },
  setPosition: () => {},
});
export const useMenuContext = () => useContext(MenuContext);

function Menus({ children }: PropsWithChildren) {
  const [openId, setOpenId] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const close = () => setOpenId(0);
  const open = setOpenId;

  return <MenuContext.Provider value={{ openId, close, open, position, setPosition }}>{children}</MenuContext.Provider>;
}

function Toggle({ id }: { id: number }) {
  const { openId, close, open, setPosition } = useMenuContext();

  function handleClick(e: React.MouseEvent<HTMLElement>) {
    const target = e.target as HTMLInputElement;
    const rect = target.closest('button')?.getBoundingClientRect();
    if (rect !== undefined) setPosition({ x: window.innerWidth - rect.width - rect.x, y: rect.y + rect.height + 8 });
    !openId || openId !== id ? open(id) : close();
  }
  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ children, id }: PropsWithChildren<{ id: number }>) {
  const { openId, position } = useMenuContext();

  if (openId !== id) return null;

  return createPortal(<StyledList $position={position}>{children}</StyledList>, document.body);
}

interface ButtonProps {
  icon: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}
function Button({ children, icon, onClick, disabled }: PropsWithChildren<ButtonProps>) {
  const { close } = useMenuContext();

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li onClick={handleClick}>
      <StyledButton disabled={disabled}>
        {' '}
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
}

export default {
  Root: Menus,
  Menu: StyledMenu,
  Toggle,
  List,
  Button,
};
