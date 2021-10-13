/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Link from 'next/link';
import nookies from 'nookies';
import Grid from '../../src/commons/Grid';
import Header from '../../src/commons/Header';
import Footer from '../../src/commons/Footer';

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
        padding: 8px 16px 8px 0;
        margin-right: 8px;
        border-right: solid 1px #000;        
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
        width: 23%;
        margin: 0 1%;
        background-color: #fff;
        border: solid 1px #ccc;
        border-radius: 16px;
        padding: 16px;
        margin-bottom: 16px;
        p {
            min-height: 90px;
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

// eslint-disable-next-line react/prop-types
export default function Produtos({ produtos }) {
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
      maxAge: 86400 * 7,
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
            <HeaderContainer>
              <div>
                <img src="/images/produtos/pizza.png" alt="Icone de Pizza" />
                <p>Pizza</p>
                <img src="/images/produtos/soda.png" alt="Icone de Bebidas" />
                <p>Bebidas</p>
              </div>
              <div>
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
            </HeaderContainer>
            <ListaProdutos>
              {produtos.map((produto) => (
                <li key={produto.id}>
                  <div>
                    <img src={produto.imageUri} alt={produto.name} />
                  </div>
                  <h3>{produto.name}</h3>
                  <p>{produto.description}</p>
                  <button onClick={() => incluirPedido(produto.id, produto.price)}>
                    Adicionar R$
                    {produto.price}
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

export async function getStaticProps() {
  const produtos = await fetch('https://don-delivery.herokuapp.com/products').then(async (res) => {
    const response = await res.json();
    return response;
  });

  // Falar sobre tamanho da página aqui e tomar cuidado com recursos extras que vão pra página
  return {
    props: {
      produtos,
    },
  };
}
