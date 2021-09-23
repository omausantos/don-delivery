import styled from 'styled-components';

export const MensagemErro = styled.div`
  color: red;
  padding-left: 8px;
  padding-top: 4px;
`;

export const MensagemOk = styled(MensagemErro)`
  color: green;
`;
