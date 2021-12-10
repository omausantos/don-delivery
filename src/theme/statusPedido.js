const statusPedidos = {
  PENDING: {
    nome: 'PENDENTE',
    id: 1,
  },
  IN_PREPARATION: {
    nome: 'EM PREPARAÇÃO',
    id: 2,
  },
  EN_ROUTE: {
    nome: 'A CAMINHO',
    id: 3,
  },
  DELIVRED: {
    nome: 'ENTREGUE',
    id: 4,
  },
  CANCELED: {
    nome: 'CANCELADO',
    id: 5,
  },
};

export { statusPedidos as default };
