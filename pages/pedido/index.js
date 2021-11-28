/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable radix */
/* eslint-disable no-return-assign */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import nookies from 'nookies';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import router from 'next/router';
import Button from '../../src/commons/Button';
import Footer from '../../src/commons/Footer';
import Grid from '../../src/commons/Grid';
import Header from '../../src/commons/Header';
import TextInput from '../../src/commons/TextField';
import breakpointsMedia from '../../src/theme/utils/breakpointsMedia';
import FormatarValorReal from '../../src/theme/utils/formatarValorReal';
import SimpleMap from '../../src/commons/Maps';

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
    .inputsearch {
        position: relative;
        .suggestion {
          border: solid 1px #ccc;
          border-top: 0;
          width: 100%;
          position: absolute;
          background-color: #fff;
          z-index: 999;
          li {
            padding:8px 4px;
            border-top: solid 1px #ccc;
            cursor: pointer;
          }
          li:first-child {
            border-top: 0;
          }
        }
    }    
`;

function Endereco() {
  const [address, setAddress] = React.useState('');
  const [coordinates, setCoordinates] = React.useState({
    lat: -23.559872960108486,
    lng: -46.60014993277882,
  });

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
    const endereco = {
      endereco: results[0].formatted_address,
      lat: latLng.lat,
      lng: latLng.lng,
    };
    nookies.set(null, 'USER_PEDIDO_ENDERECO', JSON.stringify({ endereco }), {
      path: '/',
      maxAge: 86400 * 7,
    });
  };

  return (
    <>
      <Container>
        <h2>Passo 01 - Selecione onde o pedido deve ser entregue</h2>
        <Grid.Row>
          <Grid.Col
            col={{ xs: 12, md: 12 }}
          >
            <PlacesAutocomplete
              value={address}
              onChange={setAddress}
              onSelect={handleSelect}
            >
              {({
                getInputProps, suggestions, getSuggestionItemProps, loading,
              }) => (
                <div className="inputsearch">
                  <TextInputBorder
                    {...getInputProps({ placeholder: 'Digite um endereço para entregar o pedido' })}
                    style={{
                      borderRadius: 0,
                      boxShadow: 'none',
                      borderTop: 0,
                      borderRight: 0,
                      borderLeft: 0,
                      marginBottom: 0,
                    }}
                  />
                  <ul className="suggestion">
                    {loading ? <div>...loading</div> : null}

                    {suggestions.map((suggestion) => {
                      const style = {
                        backgroundColor: suggestion.active ? '#f7f7f7' : '#fff',
                      };

                      return (
                        <li {...getSuggestionItemProps(suggestion, { style })}>
                          {suggestion.description}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </PlacesAutocomplete>
            <SimpleMap text="Localização" lat={coordinates.lat} lng={coordinates.lng} />
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
  li.obs {
    flex-direction: column;
    text-align: center;
    textarea {
      width: 50%;
      margin: auto;
    }
    strong {
      font-size: 1.2rem;
      margin-top: 10px;
    }
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

function ProdutoHtml({ info, alterarQuantidade, infoProdutoPedido }) {
  const [valor, setValor] = React.useState(info.preco * infoProdutoPedido.qtd);

  const handleChange = (event) => {
    const valorProduto = info.preco * event.target.value;
    setValor(valorProduto);
    alterarQuantidade(infoProdutoPedido.id, parseInt(event.target.value), info.preco);
  };

  const selectedOption = (option, value) => {
    if (option === value) {
      return true;
    }
    return false;
  };

  const selectOption = [0, 1, 2, 3, 4, 5];

  return (
    <>
      <div>
        <div className="img">
          <img src={info.imagemUri} alt={info.nome} />
        </div>
        <div>
          {info.nome}
          <br />
          Quantidade:
          {' '}
          <select name="quantidade" onChange={handleChange}>
            {selectOption.map((item) => (
              <option key={item} value={item} selected={selectedOption(item, infoProdutoPedido.qtd)}>{item}</option>
            ))}
          </select>
          {' '}
          <br />
          Preço:
          {' '}
          <strong>
            <FormatarValorReal
              value={valor}
            />
          </strong>
          <br />
          {/* <a href="#">
            Remover Item
          </a> */}
        </div>
      </div>

    </>
  );
}

function Produtos({ listaProdutos, listaProdutosPedido }) {
  const findProductById = (id) => {
    const item = listaProdutos.find((element) => element.id === id);
    return item;
  };

  const [listaProdutosPedidoFinal, setListaProdutosPedidoFinal] = React.useState(listaProdutosPedido);

  const valorTotal = (lista) => {
    let valorSoma = 0;
    Object.keys(lista).map((item) => valorSoma += parseFloat(lista[item].qtd * lista[item].price));
    return valorSoma;
  };

  const [valor, setValor] = React.useState(valorTotal(listaProdutosPedido));

  nookies.set(null, 'USER_PEDIDO', JSON.stringify({ produtos: listaProdutosPedido, valorTotal: valor }), {
    path: '/',
    maxAge: 86400 * 7,
  });

  const alterarQuantidade = (item, qtd, price) => {
    let produto;
    if (qtd > 0) {
      produto = Object.assign(listaProdutosPedidoFinal, { [`item${item}`]: { id: item, qtd, price } });
    } else {
      delete listaProdutosPedidoFinal[`item${item}`];
      produto = listaProdutosPedidoFinal;
    }

    setListaProdutosPedidoFinal(produto);
    setValor(valorTotal(listaProdutosPedidoFinal));
    nookies.set(null, 'USER_PEDIDO', JSON.stringify({ produtos: produto, valorTotal: valor }), {
      path: '/',
      maxAge: 86400 * 7,
    });
  };

  return (
    <>
      <Container>
        <h2>Passo 02 - Confirme suas escolhas</h2>
        <ListaProdutos>
          {Object.keys(listaProdutosPedido).map((item) => (
            <li key={item}>
              <ProdutoHtml info={findProductById(listaProdutosPedido[item].id)} alterarQuantidade={alterarQuantidade} infoProdutoPedido={listaProdutosPedido[item]} />
            </li>
          ))}
          <li className="obs">
            <p>Adicionar comentário ao pedido</p>
            <Observacao />
            <strong>
              Total:
              {' '}
              <FormatarValorReal
                value={valor}
              />
            </strong>
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

function handleChangeobs(event) {
  nookies.set(null, 'USER_PEDIDO_OBS', JSON.stringify({ observacao: event.target.value }), {
    path: '/',
    maxAge: 86400 * 7,
  });
}

function Observacao() {
  return (
    <>
      <textarea onChange={handleChangeobs} placeholder="Ex: remover cebola, remover tomate." rows="3" />
    </>
  );
}

export default function Pedido({ listaProdutos, listaProdutosPedido }) {
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
            <form onSubmit={(event) => {
              event.preventDefault();
              router.push('/pedido/finalizar');
            }}
            >
              <HeaderContainer>
                <img src="/images/pedido/icone.png" alt="Veja seu pedido" />
                <h1>Detalhes do seu pedido</h1>
              </HeaderContainer>
              <Endereco />
              <Produtos listaProdutos={listaProdutos} listaProdutosPedido={listaProdutosPedido} />
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
