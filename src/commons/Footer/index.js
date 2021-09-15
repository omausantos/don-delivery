import React from 'react';
import styled from 'styled-components';
import Grid from '../Grid';

const FooterWrapper = styled.footer`
    background-color: #BABABA;
    padding: 16px 0;
    line-height: 1.2rem;
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <Grid.Container>
        <Grid.Row>
          <Grid.Col
            cssinline={{
              fontSize: {
                xs: '12px',
                md: '16px',
              },
            }}
          >
            @Cantina Don Corleone – CNPJ :00.000.000/0001-00
            - Rua Paes de Barros, 502 - Mooca - São Paulo /SP.
            Todos os direitos reservados.
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    </FooterWrapper>
  );
}
