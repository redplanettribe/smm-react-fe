import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
:root {
  font-family: ${props => props.theme.fontFamily.main};
  color-scheme: light dark;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

*, *::before, *::after {
  box-sizing: border-box;
}


body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  min-width: 100vw;
  overflow: hidden;
  width: 100%;
}

html, body, #root {
  height: 100vh;
  margin: 0;
  padding: 0;
}

`;

export default GlobalStyle;