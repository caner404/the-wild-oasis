import React from 'react';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

export function FormRowVertical({ label, error, children }: PropsWithChildren<{ label?: string; error?: string }>) {
  const getHtmlFor = () => {
    if (React.isValidElement(children)) {
      const childProps = children.props;
      if (childProps && childProps.id) {
        return childProps.id;
      }
    }
    return '';
  };
  return (
    <StyledFormRow>
      {label && <Label htmlFor={getHtmlFor()}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}
