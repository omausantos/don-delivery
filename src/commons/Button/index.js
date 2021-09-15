import React from 'react';
import styled from 'styled-components';

const ElementButton = styled.button`
  box-shadow: 3px 8px 10px -3px rgba(0,0,0,0.62);
  display: block;
  border: none;
  font-family: 'Didact Gothic', sans-serif;
  border-radius: 8px;
  width: 140px;
  background-color: #fff;
  padding: 8px 0;
  margin: 16px auto;  
  cursor: pointer;
  background-color: ${({ color }) => color};
  a {
    color: #000;
    text-decoration: none;
  }
`;

// eslint-disable-next-line react/prop-types
export default function Button({ children, color }) {
  return (
    <>
      <ElementButton
        color={color}
      >
        {children}
      </ElementButton>
    </>
  );
}

Button.defaultProps = {
  color: null,
};
