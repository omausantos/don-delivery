/* eslint-disable react/button-has-type */
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Link from 'next/link';
import Footer from '../src/commons/Footer';
import Grid from '../src/commons/Grid';
import Header from '../src/commons/Header';

const GlobalStyle = createGlobalStyle`
  body {
    background: url(/images/home/background.jpg) no-repeat center top;    
    }
`;

const ContainerWrapper = styled.div`  
  > div > div {
    background-color: #ffffffd4;
    border-radius: 16px;
    border: solid 1px #ccc;    
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 7px 5px rgb(0 0 0 / 0%);
  }
  h1 {
    font-family: 'Calistoga', cursive;
    font-size: 40px;
    line-height: 48px;
  }
  p {
    font-family: 'Didact Gothic', sans-serif;
    font-size: 24px;
    line-height: 32px;
  }
  a {
    width: 214.77px;
    background: #FFB563;
    box-shadow: 0px 4.07143px 4.07143px rgba(0, 0, 0, 0.25), 0px 4.07143px 4.07143px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    font-family: Calistoga;
    color: #fff;
    font-size: 32px;
    cursor: pointer;
    margin: 0 auto;
    text-shadow: 1px 1px black;
    text-decoration: none;
    text-align: center;
    padding: 8px 0;
  }
`;

function Container() {
  return (
    <ContainerWrapper>
      <Grid.Container>
        <Grid.Row
          cssinline={{
            margin: {
              xs: '18px 0',
              md: '0',
            },
          }}
        >
          <Grid.Col
            offset={{ xs: 0, md: 1 }}
            col={{ xs: 12, md: 4 }}
            cssinline={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <h1>
              Faça seu pedido que
              entregamos até você!
            </h1>
            <p>Escolha o seu pedido e em poucos minutos o entregaremos na porta da sua casa.</p>
            <Link href="/login" passHref>
              <a href="/login">Fazer pedido</a>
            </Link>
          </Grid.Col>
          <Grid.Col
            offset={{ xs: 0, md: 1 }}
            col={{ xs: 12, md: 6 }}
          >
            <img src="/images/home/entrega.png" alt="Realizando entrega em domicilio" />
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    </ContainerWrapper>
  );
}

export default function Home() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Container />
      <Footer />
    </>
  );
}
