import styled from 'styled-components';

export const MensagemErro = styled.div`
  color: red;
  padding-left: 8px;
  padding-top: 4px;
  font-size: 0.8rem;
  font-weight: bolder;
`;

export const MensagemOk = styled(MensagemErro)`
  color: green;
`;
