import React from 'react';
import styled from 'styled-components';

const ElementLabel = styled.label`
  display: block;
  font-family: 'Didact Gothic', sans-serif;
  font-size: 24px;
  padding-bottom: 8px;
  padding-top: 8px;
  padding-left: 8px;
`;

// eslint-disable-next-line react/prop-types
export default function Label({ children }) {
  return (
    <>
      <ElementLabel>
        {children}
      </ElementLabel>
    </>
  );
}
