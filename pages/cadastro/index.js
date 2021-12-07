/* eslint-disable react/jsx-no-bind */
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Footer from '../../src/commons/Footer';
import Grid from '../../src/commons/Grid';
import Header from '../../src/commons/Header';
import TextInput from '../../src/commons/TextField';
import Label from '../../src/commons/Label';
import Button from '../../src/commons/Button';
import { MensagemErro, MensagemOk } from '../../src/commons/MessageInput';
import validacoes from '../../src/commons/Validations';

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
  const [userInfo, setUserInfo] = React.useState({
    firstName: '',
    lastName: '',
    telephone: '',
    email: '',
    password: '',
    passwordtwo: '',
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

              const userDTO = {
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                telephone: userInfo.telephone,
                email: userInfo.email,
                password: userInfo.password,
                passwordtwo: userInfo.passwordtwo,
                roles: [{ id: 1 }, { id: 2 }],
              };

              const validacoesCampos = validacoes(userDTO);
              setErrors(validacoesCampos);

              if (Object.keys(validacoesCampos).length === 0) {
                fetch('https://don-delivery.herokuapp.com/users', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(userDTO),
                })
                  .then(async (respostaDoServer) => {
                    const dadosDaResposta = await respostaDoServer.json();

                    if (dadosDaResposta.errors) {
                      setErrors({ acessonegado: dadosDaResposta.errors[0].message });
                    } else {
                      setErrors({ acessoliberado: 'Cadastro Efetuado' });
                      setUserInfo({
                        firstName: '',
                        lastName: '',
                        telephone: '',
                        email: '',
                        password: '',
                        passwordtwo: '',
                      });
                    }
                  });
              }
            }}
            >
              <h1>
                Vamos lá?
              </h1>

              {errors.acessoliberado && <MensagemOk style={{ textAlign: 'center', fontSize: '1.5rem', paddingBottom: '24px' }}>{errors.acessoliberado}</MensagemOk>}
              {errors.acessonegado && <MensagemErro style={{ textAlign: 'center', fontSize: '1.5rem', paddingBottom: '24px' }}>{errors.acessonegado}</MensagemErro>}

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
                    name="firstName"
                    value={userInfo.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && <MensagemErro>{errors.firstName}</MensagemErro>}

                  <Label>
                    Sobrenome
                  </Label>
                  <TextInput
                    icone="/images/usuario.jpg"
                    name="lastName"
                    value={userInfo.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && <MensagemErro>{errors.lastName}</MensagemErro>}

                  <Label>
                    Telefone
                  </Label>
                  <TextInput
                    placeholder="(99) 99999-9999"
                    mask="(99) 99999-9999"
                    icone="/images/phone.jpg"
                    name="telephone"
                    value={userInfo.telephone}
                    onChange={handleChange}
                  />
                  {errors.telephone && <MensagemErro>{errors.telephone}</MensagemErro>}
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
                    name="email"
                    type="email"
                    value={userInfo.email}
                    onChange={handleChange}
                  />
                  {errors.email && <MensagemErro>{errors.email}</MensagemErro>}

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
                  {errors.password && <MensagemErro>{errors.password}</MensagemErro>}

                  <Label>
                    Confirmar senha
                  </Label>
                  <TextInput
                    icone="/images/login/password.jpg"
                    name="passwordtwo"
                    type="password"
                    value={userInfo.passwordtwo}
                    onChange={handleChange}
                  />
                  {errors.passwordtwo && <MensagemErro>{errors.passwordtwo}</MensagemErro>}
                </Grid.Col>

              </Grid.Row>
              <Button
                style={{ backgroundColor: '#FFB563' }}
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
