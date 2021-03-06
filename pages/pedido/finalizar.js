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
import ButtonLogout from '../../src/commons/ButtonLogout';

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
      {info.nome}
      {' '}
      <br />
    </>
  );
}

function setMetodoPagemento(token, pedidoId, pagamentoId) {
  fetch(`https://don-delivery.herokuapp.com/pedidos/${pedidoId}/pagamento/${pagamentoId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    const endereco = JSON.parse(Cookies.get('USER_PEDIDO_ENDERECO'));
    const usuario = JSON.parse(Cookies.get('USER_TOKEN'));
    const { produtos } = JSON.parse(Cookies.get('USER_PEDIDO'));
    const { observacao } = Cookies.get('USER_PEDIDO_OBS') ? JSON.parse(Cookies.get('USER_PEDIDO_OBS')) : { observacao: '' };
    const pagamentoId = JSON.parse(Cookies.get('USER_PEDIDO_PAGAMENTO'));
    const itens = [];

    for (const prop in produtos) {
      itens.push({
        quantidade: produtos[prop].qtd,
        produto: {
          id: produtos[prop].id,
        },
      });
    }

    const pedido = {
      user: {
        email: usuario.email,
      },
      endereco: endereco.endereco.endereco,
      latitude: endereco.endereco.lat,
      longitude: endereco.endereco.lng,
      descricao: observacao,
      itens,
    };

    fetch('https://don-delivery.herokuapp.com/pedidos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${usuario.token}`,
      },
      body: JSON.stringify(pedido),
    })
      .then(async (respostaDoServer) => {
        const dadosDaResposta = await respostaDoServer.json();
        setMetodoPagemento(usuario.token, dadosDaResposta.id, pagamentoId);

        fetch(`https://don-delivery.herokuapp.com/pedidos/${dadosDaResposta.id}/pagamento/${pagamentoId}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${usuario.token}`,
          },
        }).then(async () => {
          Cookies.remove('USER_PEDIDO_ENDERECO');
          Cookies.remove('USER_PEDIDO');
          Cookies.remove('USER_PEDIDO_OBS');
          Cookies.remove('USER_PEDIDO_PAGAMENTO');
          router.push(`/order/${dadosDaResposta.id}`);
        });
      });
  };

  return (
    <>
      <Container>
        <h2 style={{ textAlign: 'center' }}>Formas de pagamento</h2>
        <Grid.Row>
          <Grid.Col
            offset={{ xs: 0, md: 3 }}
            col={{ xs: 12, md: 6 }}
          >
            <ListaPagamentos>
              <li>
                <input type="radio" value="3" name="pagamento" id="pagamento-cartao-credito" onChange={handleChange} />
                <img src="/images/pedido/cartao.png" alt="Pagamento por cart??o de cr??dito" />
                <Label
                  for="pagamento-cartao-credito"
                >
                  Cart??o de cr??dito
                </Label>
              </li>
              <li>
                <input type="radio" value="2" name="pagamento" id="pagamento-cartao-debito" onChange={handleChange} />
                <img src="/images/pedido/debito.png" alt="Pagamento por cart??o de d??bito" />
                <Label
                  for="pagamento-cartao-debito"
                >
                  Cart??o de d??bito
                </Label>
              </li>
              <li>
                <input type="radio" value="4" name="pagamento" id="pagamento-cartao-alimentacao" onChange={handleChange} />
                <img src="/images/pedido/vale.png" alt="Pagamento por cart??o de alimenta????o" />
                <Label
                  for="pagamento-cartao-alimentacao"
                >
                  Vale Refei????o/Alimenta????o
                </Label>
              </li>
              <li>
                <input type="radio" value="5" name="pagamento" id="pagamento-pix" onChange={handleChange} />
                <img src="/images/pedido/pix.png" alt="Pagamento por PIX" />
                <Label
                  for="pagamento-pix"
                >
                  PIX
                </Label>
              </li>
              <li>
                <input type="radio" value="8" name="pagamento" id="pagamento-dinheiro" onChange={handleChange} />
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
          Revis??o final
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
              <ButtonLogout />
              <HeaderContainer>
                <img src="/images/pedido/pagamento.png" alt="Selecione seu m??todo de pagamento" />
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

  const token = JSON.parse(cookies.USER_TOKEN);

  const listaProdutos = await fetch('https://don-delivery.herokuapp.com/produtos', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  }).then(async (res) => {
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
