import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    ${normalize}

    body {
        margin: 0;
        padding: 0;    
        font-family: 'Lily Script One', cursive;
    }

    ul
        {
            list-style: none;
            padding: 0;
            margin: 0;
        }

    html, body {
        display: flex;
        min-height: 100vh;
        width: 100%;
    }
    #__next {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
`;

export { GlobalStyle as default };
