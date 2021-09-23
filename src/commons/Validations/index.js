export default function validacoes(values) {
  const errors = {};

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Ops, insira um email válido';
  }

  if (values.password.length < 5) {
    errors.password = 'Mínimo de 5 digitos';
  }

  // Formulario de Cadastro
  if (values.firstName.length < 3) {
    errors.firstName = 'Campo obrigatório';
  }
  if (values.lastName.length < 3) {
    errors.lastName = 'Campo obrigatório';
  }
  if (values.telephone.length < 11) {
    errors.telephone = 'Mínimo de 10 digitos';
  }
  if (values.passwordtwo.length === 0) {
    errors.passwordtwo = 'Campo obrigatório';
  } else if (values.passwordtwo !== values.password) {
    errors.passwordtwo = 'Senhas não conferem';
  }

  return errors;
}
