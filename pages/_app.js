/* eslint-disable react/jsx-props-no-spreading */
import Head from 'next/head';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../src/GlobalStyle';

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Calistoga&family=Didact+Gothic&display=swap" rel="stylesheet" />
        <title>Cantina Don Corleone - Desde 1970</title>
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
