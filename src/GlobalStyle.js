import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Lora:wght@400;700&display=swap');
  
  body {
    font-family: 'Poppins', sans-serif;  // Default font
  }
`;

export default GlobalStyle;
