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
    padding: 8px;
    display: block;
  }
  padding-bottom: 16px;
`;

const MensagemErro = styled.div`
  color: red;
  padding-left: 8px;
  padding-top: 4px;
`;
const MensagemOk = styled(MensagemErro)`
  color: green;
`;

function validacoes(values) {
  const errors = {};

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Ops, insira um email válido';
  }

  if (values.senha.length < 5) {
    errors.senha = 'Mínimo de 5 digitos';
  }

  return errors;
}

function Container() {
  const [userInfo, setUserInfo] = React.useState({
    email: '',
    senha: '',
  });

  const [errors, setErrors] = React.useState([]);

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
                email: userInfo.email,
                senha: userInfo.senha,
                grant_type: 'password',
              };

              const validacoesCampos = validacoes(userDTO);
              setErrors(validacoesCampos);

              if (Object.keys(validacoesCampos).length === 0) {
                if (userDTO.email === 'pizza@pizza.com' && userDTO.senha === 'pizza') {
                  setErrors({ acessoliberado: 'Acesso Efetuado' });
                } else {
                  setErrors({ acessonegado: 'Dados de Acesso inválidos' });
                }
              }
            }}
            >
              <h1>
                Bem-vindo!
              </h1>
              {errors.acessonegado && <MensagemErro>{errors.acessonegado}</MensagemErro>}
              {errors.acessoliberado && <MensagemOk>{errors.acessoliberado}</MensagemOk>}
              <Label>
                E-mail
              </Label>
              <TextInput
                icone="/images/login/email.jpg"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
              />
              {errors.email && <MensagemErro>{errors.email}</MensagemErro>}

              <Label>
                Senha
              </Label>
              <TextInput
                icone="/images/login/password.jpg"
                name="senha"
                type="password"
                value={userInfo.senha}
                onChange={handleChange}
              />
              {errors.senha && <MensagemErro>{errors.senha}</MensagemErro>}

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
