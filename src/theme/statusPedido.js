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

export { statusPedidos as default };
