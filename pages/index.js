import React from 'react';
import styled from 'styled-components';
import Footer from '../src/commons/Footer';
import Header from '../src/commons/Header';

const ContainerWrapper = styled.div`
  background-image: url("/images/background-home.jpg")
`;

function Container() {
  return (
    <ContainerWrapper>
      <div>
        123456789
      </div>
    </ContainerWrapper>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <Container />
      <Footer />
    </>
  );
}
