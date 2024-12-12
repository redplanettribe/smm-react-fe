import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
:root {
  font-family: ${props => props.theme.fonts.main};
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;
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