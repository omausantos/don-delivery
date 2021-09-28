/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import Button from '../../src/commons/Button';
import Footer from '../../src/commons/Footer';
import Grid from '../../src/commons/Grid';
import Header from '../../src/commons/Header';
import Label from '../../src/commons/Label';
import TextInput from '../../src/commons/TextField';
import breakpointsMedia from '../../src/theme/utils/breakpointsMedia';

const GlobalStyle = createGlobalStyle`
  body {
    background: url(/images/pedido/background.jpg) no-repeat center top;    
    }
`;

const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Didact Gothic';
    font-weight: normal;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    margin-bottom: 16px;
    img {
        margin-right: 8px;
    }
`;

const Container = styled.div`
    background-color: #fff;
    font-family: 'Didact Gothic';
    border-radius: 16px;
    border: solid 1px rgba(0, 0, 0, 0.15);
    padding: 8px 16px;
    margin-bottom: 32px;
    h2 {
        font-weight: normal;
    }
    button {
        padding: 8px 16px;
        margin-bottom: 8px;
        background: #A90F0F;
        color: #fff;
    }
`;

function Endereco() {
  return (
    <>
      <Container>
        <h2>Passo 01 - Insira seu endereço</h2>
        <Label>CEP</Label>
        <Grid.Row>
          <Grid.Col
            col={{ xs: 12, md: 6 }}
          >
            <Grid.Row>
              <Grid.Col
                col={{ xs: 6, md: 8 }}
              >
                <TextInputBorder
                  icone=""
                  name="cep"
                  value="04235100"
                />
              </Grid.Col>
              <Grid.Col
                col={{ xs: 6, md: 4 }}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <Button>
                  BUSCAR
                </Button>
              </Grid.Col>
            </Grid.Row>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <Grid.Col
            col={{ xs: 12, md: 6 }}
          >
            <Label>Endereço</Label>
            <TextInputBorder
              icone=""
              name="logradouro"
              value="Rua"
            />
          </Grid.Col>
          <Grid.Col
            col={{ xs: 12, md: 2 }}
          >
            <Label>Número</Label>
            <TextInputBorder
              icone=""
              name="numero"
              value=""
            />
          </Grid.Col>
          <Grid.Col
            col={{ xs: 12, md: 4 }}
          >
            <Label>Complemento</Label>
            <TextInputBorder
              icone=""
              name="complemento"
              value=""
            />
          </Grid.Col>
        </Grid.Row>
      </Container>
    </>
  );
}

const ListaProdutos = styled.ul`
  li { 
    display: flex;
    justify-content: space-between; 
    border-top: solid 1px #ccc;
    padding: 16px 0;
    ${breakpointsMedia({
    xs: css`
            flex-direction: column;
        `,
    md: css`
            flex-direction: row;
        `,
  })};
  }
  a {
    color: #0078AE;
    text-decoration: none;
  }
  li > div {
    display: flex;
    align-items: center;
    line-height: 1.8rem;
  }
  .img {    
    overflow: hidden;
    border-radius: 16px;
    margin-right: 16px;
    line-height: normal;
    ${breakpointsMedia({
    xs: css`
            width: 120px;
        `,
    md: css`
            width: 150px;
        `,
  })};
  }
`;

const ButtonClose = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Didact Gothic';
  font-size: 1.5rem;
  padding-bottom: 16px;
  button {
    padding: 8px 16px;
    margin-bottom: 8px;
    background: #A90F0F;
    color: #fff;
    width: auto;
  }  
`;

function Produtos() {
  return (
    <>
      <Container>
        <h2>Passo 02 - Confirme suas escolhas</h2>
        <ListaProdutos>
          <li>
            <div>
              <div className="img">
                <img src="https://raw.githubusercontent.com/devsuperior/sds2/master/assets/macarrao_espaguete.jpg" alt="" />
              </div>
              <div>
                Pizza de calabreza
                <br />
                Quantidade:
                {' '}
                <select name="quantidade">
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
                {' '}
                <br />
                Preço:
                {' '}
                <strong>R$ 29.00</strong>
              </div>
            </div>
            <a href="#">
              Remover Item
            </a>

          </li>
          <li>
            <div>
              <div className="img">
                <img src="https://raw.githubusercontent.com/devsuperior/sds2/master/assets/macarrao_espaguete.jpg" alt="" />
              </div>
              <div>
                Pizza de calabreza
                <br />
                Quantidade:
                {' '}
                <select>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
                {' '}
                <br />
                Preço:
                {' '}
                <strong>R$ 29.00</strong>
              </div>
            </div>
            <a href="#">
              Remover Item
            </a>
          </li>
          <li>
            <div>
              <div className="img">
                <img src="https://raw.githubusercontent.com/devsuperior/sds2/master/assets/macarrao_espaguete.jpg" alt="" />
              </div>
              <div>
                Pizza de calabreza
                <br />
                Quantidade:
                {' '}
                <select>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
                {' '}
                <br />
                Preço:
                {' '}
                <strong>R$ 29.00</strong>
              </div>
            </div>
            <a href="#">
              Remover Item
            </a>
          </li>
          <li>
            <div />
            <strong>Total: R$ 87.00</strong>
          </li>
        </ListaProdutos>
      </Container>
    </>
  );
}

const TextInputBorder = styled(TextInput)`
  border: solid 1px #ccc;
  margin: 8px 0;
`;

export default function Pedido() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Grid.Container>
        <Grid.Row>
          <Grid.Col
            offset={{ xs: 0, md: 1 }}
            col={{ xs: 12, md: 9 }}
            cssinline={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundColor: '#ffffffd4',
              borderRadius: '16px',
              border: 'solid 1px #ccc',
              boxShadow: '0px 10px 13px -7px #000000, 5px 5px 7px 5px rgb(0 0 0 / 0%)',
              margin: '16px 0',
            }}
          >
            <form>
              <HeaderContainer>
                <img src="/images/pedido/icone.png" alt="Veja seu pedido" />
                <h1>Detalhes do seu pedido</h1>
              </HeaderContainer>
              <Endereco />
              <Produtos />
              <ButtonClose>
                <Button>
                  Prosseguir para pagamento
                </Button>
              </ButtonClose>
            </form>
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
      <Footer />
    </>
  );
}
