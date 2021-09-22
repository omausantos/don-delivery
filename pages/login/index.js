/* eslint-disable no-console */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Link from 'next/link';
import axios from 'axios';
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
  max-width: 250px;
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
  const [userInfo, setUserInfo] = React.useState({
    email: '',
    password: '',
  });

  function handleChange(event) {
    const fieldName = event.target.getAttribute('name');
    setUserInfo({
      ...userInfo,
      [fieldName]: event.target.value,
    });
  }

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
            offset={{ xs: 0, md: 3 }}
            col={{ xs: 12, md: 6 }}
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

              const userDTO = {
                username: userInfo.email,
                password: userInfo.password,
                grant_type: 'password',
              };
            }}
            >
              <h1>
                Bem-vindo!
              </h1>
              <Label>
                E-mail
              </Label>
              <TextInput
                icone="/images/login/email.jpg"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
              />
              <Label>
                Senha
              </Label>
              <TextInput
                icone="/images/login/password.jpg"
                name="password"
                type="password"
                value={userInfo.password}
                onChange={handleChange}
              />
              <Link href="/login" passHref>
                <a href="/login">Esqueceu sua senha?</a>
              </Link>
              <Button>
                Acessar
              </Button>
              <Button
                color="#FFB563"
              >
                <Link href="/cadastro" passHref>
                  <a href="/cadastro">Cadastra-se</a>
                </Link>
              </Button>
            </Form>

          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    </>
  );
}

export default function Login() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Container />
      <Footer />

    </>
  );
}
