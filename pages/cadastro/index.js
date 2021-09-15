import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Footer from '../../src/commons/Footer';
import Grid from '../../src/commons/Grid';
import Header from '../../src/commons/Header';
import TextInput from '../../src/commons/TextField';
import Label from '../../src/commons/Label';
import Button from '../../src/commons/Button';

const GlobalStyle = createGlobalStyle`
  body {
    background: url(/images/login/background.jpg) no-repeat center top;    
    }
`;

const Form = styled.form`
  width: 100%;
  margin: auto;
  h1 {
    font-size: 34px;
    text-align: center;
  }
  > a {
    text-decoration: none;
    color: #000;
    padding-bottom: 16px;
    display: block;
  }
  padding-bottom: 16px;
`;

function Container() {
  return (
    <>
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
            offset={{ xs: 0, md: 2 }}
            col={{ xs: 12, md: 7 }}
            cssinline={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundColor: '#ffffffd4',
              borderRadius: '16px',
              border: 'solid 1px #ccc',
              boxShadow: '0px 10px 13px -7px #000000, 5px 5px 7px 5px rgb(0 0 0 / 0%)',
            }}
          >

            <Form onSubmit={(event) => {
              event.preventDefault();
            }}
            >
              <h1>
                Vamos lá?
              </h1>

              <Grid.Row>

                <Grid.Col
                  offset={{ xs: 0, md: 0 }}
                  col={{ xs: 12, md: 6 }}
                  cssinline={{
                    borderRight: {
                      xs: 'none',
                      md: 'solid 1px',
                    },
                  }}
                >

                  <Label>
                    Nome
                  </Label>
                  <TextInput
                    icone="/images/usuario.jpg"
                  />

                  <Label>
                    Sobrenome
                  </Label>
                  <TextInput
                    icone="/images/usuario.jpg"
                  />

                  <Label>
                    Telefone
                  </Label>
                  <TextInput
                    icone="/images/phone.jpg"
                  />
                </Grid.Col>

                <Grid.Col
                  offset={{ xs: 0, md: 0 }}
                  col={{ xs: 12, md: 6 }}
                >
                  <Label>
                    E-mail
                  </Label>
                  <TextInput
                    icone="/images/login/email.jpg"
                  />

                  <Label>
                    Senha
                  </Label>
                  <TextInput
                    icone="/images/login/password.jpg"
                  />

                  <Label>
                    Confirmar senha
                  </Label>
                  <TextInput
                    icone="/images/login/password.jpg"
                  />
                </Grid.Col>

              </Grid.Row>
              <Button
                color="#FFB563"
              >
                Finalizar Cadastro
              </Button>
            </Form>

          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    </>
  );
}

export default function Cadastro() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Container />
      <Footer />

    </>
  );
}
