import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
:root {
  font-family: ${props => props.theme.fontFamily.main};
  color-scheme: light dark;
  box-sizing: border-box;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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