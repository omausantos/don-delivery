/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-return-assign */
/* eslint-disable react/prop-types */
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import nookies from 'nookies';
import Cookies from 'js-cookie';
import router from 'next/router';
import Button from '../../src/commons/Button';
import Footer from '../../src/commons/Footer';
import Grid from '../../src/commons/Grid';
import Header from '../../src/commons/Header';
import Label from '../../src/commons/Label';
import FormatarValorReal from '../../src/theme/utils/formatarValorReal';

const GlobalStyle = createGlobalStyle`
  body {
    background: url(/images/pedido/background.jpg) no-repeat center top;    
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

const ListaPagamentos = styled.ul`
    li {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ccc;
        padding: 16px 0;
        label {
            font-size: 1rem;
            cursor: pointer;
        }
        * {
            margin-right: 16px;
        }
    }
`;

const Informacoes = styled.div`
    background: rgba(217, 217, 217, 0.19);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    display: flex;
    justify-content: space-around;
    line-height: 1.5rem;
    align-items: center;
    p:last-child {
        text-align: center;
    }
`;

const ButtonClose = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Didact Gothic';
  font-size: 1.5rem;
  padding: 16px 0;
  button {
    padding: 8px 16px;
    margin-bottom: 8px;
    background: #A90F0F;
    color: #fff;
    width: auto;
  }  
`;

function ProdutoList({ info, infoProdutoPedido }) {
  return (
    <>
      {infoProdutoPedido.qtd}
      {' '}
      {info.name}
      {' '}
      <br />
    </>
  );
}

function MetodoPagamento({ listaProdutos, listaProdutosPedido }) {
  const findProductById = (id) => {
    const item = listaProdutos.find((element) => element.id === id);
    return item;
  };

  const valorTotal = (lista) => {
    let valorSoma = 0;
    Object.keys(lista).map((item) => valorSoma += parseFloat(lista[item].qtd * lista[item].price));
    return valorSoma;
  };

  const handleChange = (event) => {
    nookies.set(null, 'USER_PEDIDO_PAGAMENTO', event.target.value, {
      path: '/',
      maxAge: 86400 * 7,
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    const endereco = JSON.parse(Cookies.get('USER_PEDIDO_ENDERECO'));
    const usuario = JSON.parse(Cookies.get('USER_TOKEN'));
    const { produtos } = JSON.parse(Cookies.get('USER_PEDIDO'));
    const itens = [];

    for (const prop in produtos) {
      itens.push({
        quantity: produtos[prop].qtd,
        product: {
          id: produtos[prop].id,
        },
      });
    }

    const pedido = {
      user: {
        email: usuario.email,
      },
      address: endereco.endereco.endereco,
      latitude: endereco.endereco.lat,
      longitude: endereco.endereco.lng,
      itens,
    };

    fetch('https://don-delivery.herokuapp.com/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${usuario.token}`,
      },
      body: JSON.stringify(pedido),
    })
      .then(async (respostaDoServer) => {
        const dadosDaResposta = await respostaDoServer.json();
        router.push(`/order/${dadosDaResposta.id}`);
      });
  };

  return (
    <>
      <Container>
        <h2 style={{ textAlign: 'center' }}>Formas de pagamento</h2>
        <Grid.Row>
          <Grid.Col
            offset={{ xs: 0, md: 4 }}
            col={{ xs: 12, md: 4 }}
          >
            <ListaPagamentos>
              <li>
                <input type="radio" value="1" name="pagamento" id="pagamento-cartao" onChange={handleChange} />
                <img src="/images/pedido/cartao.png" alt="Pagamento por cartão de crédito" />
                <Label
                  for="pagamento-cartao"
                >
                  Cartão de crédito
                </Label>
              </li>
              <li>
                <input type="radio" value="2" name="pagamento" id="pagamento-pix" onChange={handleChange} />
                <img src="/images/pedido/pix.png" alt="Pagamento por PIX" />
                <Label
                  for="pagamento-pix"
                >
                  PIX
                </Label>
              </li>
              <li>
                <input type="radio" value="3" name="pagamento" id="pagamento-dinheiro" onChange={handleChange} />
                <img src="/images/pedido/dinheiro.png" alt="Pagamento por Dinheiro" />
                <Label
                  for="pagamento-dinheiro"
                >
                  Dinheiro
                </Label>
              </li>
            </ListaPagamentos>
          </Grid.Col>
        </Grid.Row>
        <h2
          style={{ textAlign: 'center', fontSize: '1rem', marginTop: '32px' }}
        >
          Revisão final
        </h2>
        <Grid.Row>
          <Grid.Col
            offset={{ xs: 0, md: 3 }}
            col={{ xs: 12, md: 6 }}
          >
            <Informacoes>
              <p>
                {Object.keys(listaProdutosPedido).map((item) => (
                  <span key={item}>
                    <ProdutoList
                      info={findProductById(listaProdutosPedido[item].id)}
                      infoProdutoPedido={listaProdutosPedido[item]}
                    />
                  </span>
                ))}
              </p>
              <p>
                Total a ser pago:
                {' '}
                <br />
                <strong>
                  <FormatarValorReal
                    value={valorTotal(listaProdutosPedido)}
                  />
                </strong>
              </p>
            </Informacoes>
          </Grid.Col>
        </Grid.Row>
        <ButtonClose>
          <Button onClick={handleClick}>
            Finalizar compra
          </Button>
        </ButtonClose>
      </Container>
    </>
  );
}

export default function Finalizar({ listaProdutos, listaProdutosPedido }) {
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
                <img src="/images/pedido/pagamento.png" alt="Selecione seu método de pagamento" />
                <h1>Pagamento</h1>
              </HeaderContainer>
              <MetodoPagamento
                listaProdutos={listaProdutos}
                listaProdutosPedido={listaProdutosPedido}
              />
            </form>
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const listaProdutosPedido = JSON.parse(cookies.USER_PEDIDO);

  const listaProdutos = await fetch('https://don-delivery.herokuapp.com/products').then(async (res) => {
    const response = await res.json();
    return response;
  });

  return {
    props: {
      listaProdutos,
      listaProdutosPedido: listaProdutosPedido.produtos,
    },
  };
}
