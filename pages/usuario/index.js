import React from 'react';
import nookies from 'nookies';
import { createGlobalStyle } from 'styled-components';
import Grid from '../../src/commons/Grid';
import Header from '../../src/commons/Header';
import Footer from '../../src/commons/Footer';

const GlobalStyle = createGlobalStyle`
  body {
    background: url(/images/login/background.jpg) no-repeat center top;    
    }
`;

export default function PageUsuario() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Grid.Container>
        <Grid.Row>
          <Grid.Col>
            <h1 style={{ color: '#fff' }}>Atualize seus dados</h1>
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);

  // const cookies = nookies.get(context)
  // const token = cookies.USER_TOKEN;
  // const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
  //   headers: {
  //       Authorization: token
  //     }
  // })
  // .then((resposta) => resposta.json())

  if (!cookies.USER_TOKEN) {
    return {
      redirect: {
        destination: '/login?m=2',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
