export default function validacoes(values) {
  const errors = {};

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Ops, insira um email válido';
  }

  if (values.senha.length < 5) {
    errors.senha = 'Mínimo de 5 digitos';
  }

  return errors;
}
