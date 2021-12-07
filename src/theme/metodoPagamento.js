const metodoPagamento = {
  PENDING: {
    nome: 'PENDENTE',
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
  CANCELED: {
    nome: 'CANCELADO',
    id: 7,
  },
  MONEY: {
    nome: 'DINHEIRO',
    id: 8,
  },
};

export { metodoPagamento as default };
