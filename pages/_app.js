/* eslint-disable react/jsx-props-no-spreading */
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
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
