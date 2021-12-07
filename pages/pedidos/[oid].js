/* eslint-disable react/prop-types */
import React from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import nookies from 'nookies';
import Link from 'next/link';
import Footer from '../../src/commons/Footer';
import Grid from '../../src/commons/Grid';
import Header from '../../src/commons/Header';
import breakpointsMedia from '../../src/theme/utils/breakpointsMedia';
import FormatarValorReal from '../../src/theme/utils/formatarValorReal';
import metodoPagamento from '../../src/theme/metodoPagamento';
import statusPedido from '../../src/theme/statusPedido';
import ButtonLogout from '../../src/commons/ButtonLogout';

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
  const [selectDefault, setSelectDefault] = React.useState(statusPedido[info.status].id);

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

const Paginacao = styled.ul`
  display: flex;
  justify-content: center;
  li {
    padding-bottom: 8px;
    a {
      display: block;
      padding: 4px 8px;
      background-color: green;
      margin: 0 8px;
      color: #fff;
      text-decoration: none;
      border-radius: 8px;
    }
  }
`;

function ListaPaginacao({ paginacao }) {
  const myArray = [];
  for (let i = 1; i <= paginacao; i + 1) {
    myArray.push(i);
  }
  const listItems = myArray.map((number) => (
    <li>
      <Link href={`/pedidos/${number}`} passHref>
        <a href={`/pedidos/${number}`}>{number}</a>
      </Link>
    </li>
  ));

  return (
    <Paginacao>
      {listItems}
    </Paginacao>
  );
}

export default function Pedidos({ listaPedidos, paginacao }) {
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
            <ButtonLogout />
            <HeaderContainer>
              <img src="/images/pedido/icone.png" alt="Veja seu pedido" />
              <h1>Gestão de pedidos </h1>
            </HeaderContainer>
            <Container>
              {listaPedidos.map((pedido) => <Pedido info={pedido} key={pedido.id} />)}
            </Container>
            <ListaPaginacao paginacao={paginacao} />
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

  const { oid } = context.query;
  const retorno = await fetch(`https://don-delivery.herokuapp.com/pedidos?page=${oid - 1}&linesPerPage=6&direction=DESC&orderBy=id`, {
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
      listaPedidos: retorno.content,
      paginacao: retorno.totalPages,
    },
  };
}
