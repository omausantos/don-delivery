import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  :focus{outline: none;}
  background: #FFFFFF;
  background-repeat: no-repeat;
  background-position: 90% center ;
  box-shadow: 3px 8px 10px -3px rgba(0,0,0,0.62);
  border: none;
  padding: 8px;
  border-radius: 16px;
  margin-bottom: 16px;
  background-image: url(${({ icone }) => icone});
`;

// eslint-disable-next-line react/prop-types
export default function TextInput({ icone }) {
  return (
    <>
      <Input
        icone={icone}
      />
    </>
  );
}

TextInput.defaultProps = {
  icone: null,
};
