import React, {
  Dispatch,
  PropsWithChildren,
  ReactElement,
  SetStateAction,
  cloneElement,
  createContext,
  useContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import styled from 'styled-components';

interface ModalContextType {
  openName: string;
  close: () => void;
  open: Dispatch<SetStateAction<string>>;
}

const ModalContext = createContext<ModalContextType>({
  openName: '',
  close: () => {},
  open: () => {},
});
export const useModalContext = () => useContext(ModalContext);

export function Modal({ children }: PropsWithChildren) {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = setOpenName;

  return <ModalContext.Provider value={{ openName, close, open }}>{children}</ModalContext.Provider>;
}

function Open({ children, opens: opensWindowName }: PropsWithChildren<{ opens: string }>) {
  const { open } = useModalContext();

  return cloneElement(children as ReactElement, { onClick: () => open(opensWindowName) });
}

interface WindowProps {
  name: string;
}

function Window({ children, name }: PropsWithChildren<WindowProps>) {
  const { openName, close } = useModalContext();

  if (name !== openName) return null;
  return createPortal(
    <Overlay
      onClick={(e: React.MouseEvent) => {
        const targetElement = e.target as HTMLElement;
        if (targetElement === e.currentTarget) close();
      }}
    >
      <StyledModal>
        <Button>
          <HiXMark />
        </Button>
        {cloneElement(children as ReactElement, { onClose: close })}
      </StyledModal>
    </Overlay>,
    document.body
  );
}

export default {
  Root: Modal,
  Open: Open,
  Window: Window,
};

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;
