import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * { 
    margin: 0;
    padding: 0;
    font: inherit;
    color: inherit;
  }
  *, :after, :before { 
    box-sizing: border-box;
  }
  :root { 
    -webkit-tap-highlight-color: transparent;
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
    cursor: default;
    line-height: 1.5;
    overflow-wrap: break-word;
    -moz-tab-size: 4;
    tab-size: 4
  }
  html, body {
    height: 100%;
  }
  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }
  button {
    background: none;
    border: 0;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    &:active {
      opacity: 0.64;
    }
  }
  a {
    text-decoration: none
  }
  table {
    border-collapse: collapse;
    border-spacing:0
  }
  #root {
    font-family: Galmuri14, sans-serif;
  }
  ul {
    list-style: none;
  }
`;
