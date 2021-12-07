/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import Link from 'next/link';
import nookies from 'nookies';
import Grid from '../../src/commons/Grid';
import Header from '../../src/commons/Header';
import Footer from '../../src/commons/Footer';
import FormatarValorReal from '../../src/theme/utils/formatarValorReal';
import breakpointsMedia from '../../src/theme/utils/breakpointsMedia';
import ButtonLogout from '../../src/commons/ButtonLogout';

const GlobalStyle = createGlobalStyle`
  body {
    background: url(/images/produtos/background.jpg) no-repeat center top;    
    }
`;

const HeaderContainer = styled.header`
    border-bottom: solid 1px #000;
    display: flex;
    justify-content: space-between;
    > div {
        display: flex;
        align-items: center;
    }
    p {margin: 0;}
    > div:first-child p {        
        padding: 8px 16px;
        margin-right: 8px;       
    }
    > div:last-child p {
        margin-left: 16px;
    }
`;

const ListaProdutos = styled.ul`
    padding: 24px 0;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    font-family: 'Didact Gothic';
    li {
    ${breakpointsMedia({
    sm: css`
          width: 98%;
            `,
    md: css`
          width: 23%; 
            `,
  })};
        margin: 0 1%;
        background-color: #fff;
        border: solid 1px #ccc;
        border-radius: 16px;
        padding: 16px;
        margin-bottom: 16px;
        p {
          ${breakpointsMedia({
    md: css`
                min-height: 90px; 
                          `,
  })};
           
        }
        div {
            border-radius: 16px;
            overflow: hidden;
            display: flex;
        }
        h3 {
            font-family: 'Lily Script One', cursive;
        }
        button {
            background: #70A401;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
            border: none;
            color: #fff;
            padding: 8px 16px;
            cursor: pointer;
        }
        }
`;

const Next = styled.div`
    display: flex;
    justify-content: center;
    padding-bottom: 16px;
    a {
        background-color: #FFB563;
        padding: 8px 16px;
        color: #fff;
        text-decoration: none;
        font-family: 'Didact Gothic';
    }
    
`;

const Alert = styled.div`
  font-size: 1.2rem;
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
  margin-top: 8px;
  text-align:center;
  line-height: 1.6rem;
  a {
    color: #155724;
    font-weight: bold;
  }
`;

function UltimoPedido({ ultimoPedido }) {
  if (!ultimoPedido) {
    return (
      <>
      </>
    );
  }

  return (
    <Alert>
      Seu ultimo pedido foi realizado em
      {' '}
      <strong>{ultimoPedido.instante}</strong>
      <br />
      {' '}
      <Link href={`/order/${ultimoPedido.id}`} passHref>
        <a href={`/order/${ultimoPedido.id}`}>Clique aqui para acessar</a>
      </Link>
    </Alert>
  );
}

const DivBtn = styled.div`
height: 0;
    z-index: 9999;
    text-align: right;
    position: relative;
  a {
    margin-top: 14px !important;
  }
`;

// eslint-disable-next-line react/prop-types
export default function Produtos({ produtos, ultimoPedido }) {
  const [quantidades, setQuantidades] = React.useState(0);
  const [pedido, setPedido] = React.useState({ produtos: {} });

  function incluirPedido(item, price) {
    const qtdItem = pedido.produtos[`item${item}`];
    const qtd = qtdItem ? (qtdItem.qtd + 1) : 1;
    const produto = Object.assign(pedido.produtos, { [`item${item}`]: { id: item, qtd, price } });
    setPedido({ produtos: produto });
    setQuantidades(quantidades + 1);

    nookies.set(null, 'USER_PEDIDO', JSON.stringify(pedido), {
      path: '/',
    });
  }

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
            <UltimoPedido ultimoPedido={ultimoPedido} />
            <DivBtn>
              <ButtonLogout />
            </DivBtn>
            <HeaderContainer>
              <div style={{
                padding: '10px',
              }}
              >
                <img src="/images/produtos/carrinho.png" alt="Seu Carrinho" />
                <p>
                  Carrinho
                  <span>
                    {' '}
                    (
                    <strong>
                      {quantidades}
                    </strong>
                    )
                  </span>
                </p>
              </div>
              <div />
            </HeaderContainer>
            <ListaProdutos>
              {produtos.map((produto) => (
                <li key={produto.id}>
                  <div>
                    <img src={produto.imagemUri} alt={produto.nome} />
                  </div>
                  <h3>{produto.nome}</h3>
                  <p>{produto.descricao}</p>
                  <button onClick={() => incluirPedido(produto.id, produto.preco)}>
                    Adicionar
                    {' '}
                    <FormatarValorReal
                      value={produto.preco}
                    />
                  </button>
                </li>
              ))}
            </ListaProdutos>
            <Next>
              <Link href="/pedido" passHref>
                <a href="/pedido">Finalizar pedido</a>
              </Link>
            </Next>
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = JSON.parse(cookies.USER_TOKEN);

  const produtos = await fetch('https://don-delivery.herokuapp.com/produtos', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  }).then(async (res) => {
    const response = await res.json();
    return response;
  });

  const pedidos = await fetch('https://don-delivery.herokuapp.com/pedidos', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  }).then(async (res) => {
    const response = await res.json();
    return response;
  });

  const ultimoPedido = pedidos.content.filter((pedido) => pedido.user.email.includes(token.email));

  return {
    props: {
      produtos,
      ultimoPedido: ultimoPedido > [] ? ultimoPedido[0] : null,
    },
  };
}
