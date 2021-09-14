import React from 'react';
import styled from 'styled-components';
import Grid from '../Grid';

const HeaderWrapper = styled.header`
background-color: #FFB564;
padding: 8px 16px;
display: flex;
div {
  width: 100%;
  max-width: 1256px;
  margin: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  div {
    font-size: 32px;
    font-weight: bolder;
    p {
      margin-left:16px;
    }
  }
  ul {
    display: flex;      
    li {
      padding: 0 16px;
      border-right: solid 1px #000;
      :last-child {
        border-right: none;
      }
      :first-child {
        min-width: 121px;
        align-items: center;
        display: flex;
        font-size: 16px;
      }
    }
  }
}
`;

export default function Header() {
  return (
    <>
      <Grid.Container>
        <Grid.Row>
          <Grid.Col>
            <img src="/images/pizza.png" alt="Logo da Pizzaria Corleone" />
            <p>Cantina Don Corleone</p>
          </Grid.Col>
          <Grid.Col>
            <ul>
              <li>Desde 1970</li>
              <li><img src="/images/instagram.png" alt="Instagram da Pizzaria Corleone" /></li>
              <li><img src="/images/facebook.png" alt="Facebook da Pizzaria Corleone" /></li>
            </ul>
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    </>
  );
}
