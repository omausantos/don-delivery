import React from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import Footer from '../../src/commons/Footer';
import Grid from '../../src/commons/Grid';
import Header from '../../src/commons/Header';
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

const Container = styled.ul`
    display: flex;    
    ${breakpointsMedia({
    xs: css`
        flex-flow: column nowrap;
            `,
    md: css`
        flex-flow: row wrap;
            `,
  })};
    justify-content: space-between;
    li {
        background-color:#f4f4f4;
        box-shadow: 0px 2.63385px 2.63385px rgba(0, 0, 0, 0.25), 0px 2.63385px 2.63385px rgba(0, 0, 0, 0.25);
        border-radius: 3.29232px;
        padding:8px;        
        ${breakpointsMedia({
    xs: css`
            width: 99%;
                    `,
    md: css`
            width: 49%;
                    `,
  })};
        margin-bottom: 16px;
        font-size: 0.8rem;
        header {
            background: #FFFFFF;
            box-shadow: 0px 2.63385px 2.63385px rgba(0, 0, 0, 0.25);
            border-radius: 3.29232px;
            padding:8px;
            div {
                display: flex;
                justify-content: space-between;
            }
            div.header {
                font-size: 1.5rem;
                padding-bottom: 8px;
                span.value {
                    color: red;
                }
            }
        }
        aside {
            display: flex;
            margin: 8px 0;
            padding: 8px 0;
            div {
                width: 49%;
                p {
                    line-height: 1.2rem;
                }
            }
            div.info {
                border-right: 2px solid rgba(0, 0, 0, 0.19);
            }
            div.select {
                text-align: center;
                select {
                    background: #FFFFFF;
                    box-shadow: 0px 3.10733px 3.10733px rgba(0, 0, 0, 0.25);
                    cursor: pointer;
                    border: none;
                    padding: 4px;
                    padding-bottom: 6px;
                }
            }
            hr {
                width: 80%;
                border: 0.1px solid rgba(0, 0, 0, 0.19);
            }
        }
    }
`;

function Pedido() {
  return (
    <li>
      <header>
        <div className="header">
          <span>Pedido Nº 1</span>
          <span className="value">Total: R$ 159,90</span>
        </div>
        <div>
          <span>Realizado há 20 min.</span>
          <span>Pagamento: Vale Refeição</span>
        </div>
      </header>
      <aside>
        <div className="info">
          <p>
            <strong>Cliente:</strong>
            {' '}
            Carlos Eduardo
            <br />
            <strong>Telefone:</strong>
            {' '}
            (11) 9XXXX-XXXX
            <br />
            <strong>Endereço:</strong>
            {' '}
            Rua Francisco José da Costa, 45 - Casa 02
          </p>
        </div>
        <div className="select">
          <p>
            <strong>02</strong>
            {' '}
            Pizza Calabresa
            <br />
            <strong>01</strong>
            {' '}
            Pizza Mussarela
            <br />
            <strong>01</strong>
            {' '}
            Coca-cola
            <br />
          </p>
          <hr />
          <p>
            <strong>Observações:</strong>
            {' '}
            usar cebola roxa
          </p>
          <hr />
          <p>
            <strong>status:</strong>
            {' '}
            <select>
              <option>
                Pendente
              </option>
              <option>
                Em preparação
              </option>
              <option>
                Entregue
              </option>
              <option>
                Cancelado
              </option>
            </select>
          </p>
        </div>
      </aside>
    </li>
  );
}

export default function Pedidos() {
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
              <img src="/images/pedido/icone.png" alt="Veja seu pedido" />
              <h1>Gestão de pedidos</h1>
            </HeaderContainer>
            <Container>
              <Pedido />
              <Pedido />
              <Pedido />
              <Pedido />
            </Container>
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
