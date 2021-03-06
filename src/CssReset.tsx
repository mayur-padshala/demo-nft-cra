import emotionReset from 'emotion-reset';
import { Global, css } from '@emotion/react';

function CssReset() {
  return (
    <Global styles={css`
    ${emotionReset}

    *, *::after, *::before {
      box-sizing: border-box;
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
      font-smoothing: antialiased;
      
      font-family: 'Manrope', sans-serif !important;
    }
  `}
    />
  );
}

export default CssReset;
