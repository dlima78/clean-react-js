import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  /* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
  */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }
  body {
    /* background: #fafafa;
    line-height: 1;
    font-size: 100%;
    font-family: 'Roboto', sans-serif;
    --black: #0c0f0aff;
    --white: #fff;
    --blue: #0090c1ff;
    --blueDark: #001731;
    --blueLight: #cdeff1;
    --invalid: #ff6978ff;
    --valid: #41ead4ff;
    --disabled: #bbb;
    --greyDark: #30332E;
    --grey: #ccc;
    --greyLigth: #fafafa;
    --primary: #5b6d0c;
    --primaryDark: #323b06;
    --primaryLight: #C2E812; */

    background: #F0F9FC;
    line-height: 1;
    font-size: 100%;
    font-family: 'Roboto', sans-serif;
    --black: #0c0f0aff;
    --white: #fff;
    --blue: #0090c1ff;
    --blueDark: #001731;
    --blueLight: #cdeff1;
    --invalid: #f44336;
    --valid: #41ead4ff;
    --disabled: #bbb;
    --greyDark: #2B2B2C;
    --grey: #515C60;
    --greyLigth: #fafafa;
    --primary: #45A6C4;
    --primaryDark: #183A45;
    --primaryLight: #96DBE9;
  }

  

`
export default GlobalStyles
