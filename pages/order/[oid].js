import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import nookies from 'nookies';
import Footer from '../../src/commons/Footer';
import Grid from '../../src/commons/Grid';
import Header from '../../src/commons/Header';
import FormatarValorReal from '../../src/theme/utils/formatarValorReal';

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
    text-align: center;
    h2 {
        font-weight: normal;
        border-top: solid 1px #f2f2f2;
        border-bottom: solid 1px #f2f2f2;
        padding:4px 0;
        margin-bottom: 8px;
    }
    ul {
        display: inline-block;
        text-align: left;
        li {
            list-style: disc;
            margin-bottom: 4px;
        } 
    }
     
`;

const Informacoes = styled.div`
    background: rgba(217, 217, 217, 0.19);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    justify-content: space-around;
    line-height: 1.5rem;
    align-items: center;
    margin:16px auto 8px;
    padding: 4px;
`;

function InfoContainer({ pedido }) {
  console.log("pedido1", pedido);

  const findProductById = (id) => {
    const item = pedido.listaProdutos.find((element) => element.id === id);
    return item;
  };

  return (
    <Container>
      <h2>
        <img src="/images/order/produtos.png" alt="Itens do pedido" />
        {' '}
        Itens do pedido
      </h2>
      <ul>
        {Object.keys(pedido.produtos).map((item) => (
          <li key={item}>
            {pedido.produtos[item].qtd}
            {' '}
            {findProductById(pedido.produtos[item].id).nome}
            {' '}
            <FormatarValorReal
              value={pedido.produtos[item].price}
            />
          </li>
        ))}
      </ul>
      <h2>
        <img src="/images/order/endereco.png" alt="Endereço para entrega" />
        {' '}
        Endereço para entrega
      </h2>
      <ul>
        <li>
          {pedido.endereco}
        </li>
      </ul>
      <h2>
        <img src="/images/order/pagamento.png" alt="Forma de pagamento" />
        {' '}
        Forma de pagamento
      </h2>
      <ul>
        <li>
          {pedido.pagamento}
        </li>
      </ul>
      <Informacoes style={{ maxWidth: '150px' }}>
        Total a ser pago:
        <br />
        <strong>
          <FormatarValorReal
            value={pedido.valor}
          />
        </strong>
      </Informacoes>
    </Container>
  );
}

function OrderPageInfo({ pedido }) {
  return (
    <>
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
            <HeaderContainer>
              <img src="/images/pedido/icone.png" alt="Veja seu pedido" />
              <h1>Detalhes do seu pedido</h1>
            </HeaderContainer>
            <InfoContainer pedido={pedido} />
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    </>
  );
}

export default function OrderPage({ ...props }) {
  const pedido = {
    ...props,
  };
  return (
    <>
      <GlobalStyle />
      <Header />
      <OrderPageInfo pedido={pedido} />
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const endereco = JSON.parse(cookies.USER_PEDIDO_ENDERECO);
  const pedido = JSON.parse(cookies.USER_PEDIDO);
  const pagamentoNumber = JSON.parse(cookies.USER_PEDIDO_PAGAMENTO);
  let pagamento = 'Cartão de crédito';

  if (pagamentoNumber === 2) {
    pagamento = 'PIX';
  } else if (pagamentoNumber === 3) {
    pagamento = 'Dinheiro';
  }

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
      endereco: endereco.endereco.endereco,
      pagamento,
      produtos: pedido.produtos,
      valor: pedido.valorTotal,
      listaProdutos,
    },
  };
}
