import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Grid from '../Grid';

const HeaderWrapper = styled.header`
  background-color: #FFB564;
  align-items: center;
  padding: 8px 16px;
  font-size: 16px;  
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 32px;
  p {
    margin-left:16px;
  }
`;

const HeaderRight = styled.div`
  align-items: center;
  display: flex;
  ul {
    display: flex;
    justify-content: flex-end;
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
`;

export default function Header() {
  return (
    <HeaderWrapper>
      <Grid.Container>
        <Grid.Row>
          <Grid.Col>
            <HeaderLeft>
              <Link href="/" passHref>
                <a href="/"><img src="/images/pizza.png" alt="Logo da Pizzaria Corleone" /></a>
              </Link>

              <p>Cantina Don Corleone</p>
            </HeaderLeft>

          </Grid.Col>
          <Grid.Col
            cssinline={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <HeaderRight>
              <ul>
                <li>Desde 1970</li>
                <li><img src="/images/instagram.png" alt="Instagram da Pizzaria Corleone" /></li>
                <li><img src="/images/facebook.png" alt="Facebook da Pizzaria Corleone" /></li>
              </ul>
            </HeaderRight>
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    </HeaderWrapper>
  );
}
