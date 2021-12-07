/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import InputMask from 'react-input-mask';

const MyStyledInput = styled.div`
  input {
    :focus{outline: none;}
    background: #FFFFFF;
    background-repeat: no-repeat;
    background-position: 90% center ;
    box-shadow: 3px 8px 10px -3px rgba(0,0,0,0.62);
    border: none;
    padding: 16px 8px;
    border-radius: 16px;
    background-image: url(${({ icone }) => icone});
    width: 100%;
  }
`;

// eslint-disable-next-line react/prop-types
export default function TextInput({ icone, ...props }) {
  return (
    <MyStyledInput icone={icone}>
      <InputMask
        {...props}
      />
    </MyStyledInput>
  );
}

TextInput.defaultProps = {
  icone: null,
};
