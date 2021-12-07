import React from 'react';
import styled from 'styled-components';

const BtnLogout = styled.div`
  height: 0;
  z-index: 9999;
  text-align: right;
  a {
    margin-top: 28px;
    float: right;
  }
`;

export default function ButtonLogout() {
  return (
    <BtnLogout>
      <a href="/logout"><img src="/images/logout.png" alt="Sair do sistema" /></a>
    </BtnLogout>
  );
}
