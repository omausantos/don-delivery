export default function formatarValorReal({ value }) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
