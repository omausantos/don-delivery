/* eslint-disable react/prop-types */
import React from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import nookies from 'nookies';
import Footer from '../../src/commons/Footer';
import Grid from '../../src/commons/Grid';
import Header from '../../src/commons/Header';
import breakpointsMedia from '../../src/theme/utils/breakpointsMedia';
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

function Pedido({ info }) {
  const statusPedidos = {
    PENDING: {
      nome: 'PENDENTE',
      id: 1,
    },
    EN_ROUTE: {
      nome: 'EM PREPARAÇÃO',
      id: 2,
    },
    DELIVRED: {
      nome: 'EMTREGUE',
      id: 3,
    },
    CANCELED: {
      nome: 'CANCELADO',
      id: 4,
    },
  };

  const metodoPagamento = {
    PENDING: {
      nome: 'DINHEIRO',
      id: 1,
    },
    DEBIT: {
      nome: 'DÉBITO',
      id: 2,
    },
    CREDIT: {
      nome: 'CRÉDITO',
      id: 3,
    },
    FOOD_CARD: {
      nome: 'CARTÃO ALIMENTAÇÃO',
      id: 4,
    },
    PIX: {
      nome: 'PIX',
      id: 5,
    },
    WHATSAPP: {
      nome: 'WHATSAPP',
      id: 6,
    },
  };

  const [selectDefault, setSelectDefault] = React.useState(statusPedidos[info.status].id);

  function handleChange(event) {
    setSelectDefault(event.target.value);
    fetch(`https://don-delivery.herokuapp.com/pedidos/${info.id}/status/${event.target.value}`, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUEkgZWNvbW1lcmNlIGJvb3RjYW1wIiwic3ViIjoiMSIsImlhdCI6MTYzODg0MTc4NiwiZXhwIjoxNjM4OTQxNzkzfQ.U_Va-mUlXZLUipDwOxUv_GDXbT3PX38Ouow7j3UzEd0',
      },
    });
  }

  return (
    <li key={info.id}>
      <header>
        <div className="header">
          <span>
            Pedido Nº
            {' '}
            {info.id}
          </span>
          <span className="value">
            Total:
            {' '}
            <FormatarValorReal
              value={info.valorTotal}
            />

          </span>
        </div>
        <div>
          <span>
            Realizado às
            {' '}
            {info.instante}
          </span>
          <span>
            Pagamento:
            {' '}
            {metodoPagamento[info.paymentStatus].nome}
          </span>
        </div>
      </header>
      <aside>
        <div className="info">
          <p>
            <strong>Cliente:</strong>
            {' '}
            {info.user.firstName}
            {' '}
            {info.user.lastName}
            <br />
            <strong>Telefone:</strong>
            {' '}
            {info.user.telephone}
            <br />
            <strong>Endereço:</strong>
            {' '}
            {info.endereco}
          </p>
        </div>
        <div className="select">
          <p>
            {info.itens.map((item) => (
              <>
                <strong>{item.quantidade}</strong>
                {' '}
                {item.produto.nome}
                <br />
              </>
            ))}
          </p>
          <hr />
          <p>
            <strong>Observações:</strong>
            {' '}
            {info.descricao}
          </p>
          <hr />
          <p>
            <strong>status:</strong>
            {' '}
            <select value={selectDefault} onChange={handleChange}>
              <option value="1">
                Pendente
              </option>
              <option value="2">
                Em preparação
              </option>
              <option value="3">
                Entregue
              </option>
              <option value="4">
                Cancelado
              </option>
            </select>
          </p>
        </div>
      </aside>
    </li>
  );
}

export default function Pedidos({ listaPedidos }) {
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
              {listaPedidos.map((pedido) => <Pedido info={pedido} key={pedido.id} />)}
            </Container>
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

  const { content } = await fetch('https://don-delivery.herokuapp.com/pedidos', {
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
      listaPedidos: content,
    },
  };
}
