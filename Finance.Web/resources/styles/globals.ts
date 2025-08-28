import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  html, body, #root { height: 100%; width: 100%; max-width: 100%; }
  html, body { margin: 0; padding: 0; overflow-x: hidden; overflow-y: auto; }
  /* esconder barra de rolagem mantendo o scroll ativo */
  html, body { -ms-overflow-style: none; scrollbar-width: none; }
  html::-webkit-scrollbar, body::-webkit-scrollbar { display: none; width: 0; height: 0; }

  html { background: var(--color-bg); color: var(--color-text-primary); }

  ::selection { background: var(--primary-600); color: var(--color-text-inverse); }

  a { color: var(--link); text-decoration: none; }
  a:hover { color: var(--link-hover); text-decoration: underline; }

  input, textarea, select {
    background: var(--input-bg);
    border: 1px solid var(--input-border);
    color: var(--color-text-primary);
    caret-color: var(--color-text-primary);
  }

  ::placeholder { color: var(--input-placeholder); }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    -webkit-text-fill-color: var(--color-text-primary);
    -webkit-box-shadow: 0 0 0 1000px var(--input-bg) inset;
    box-shadow: 0 0 0 1000px var(--input-bg) inset;
    transition: background-color 9999s ease-in-out 0s;
    caret-color: var(--color-text-primary);
    border: 1px solid var(--input-border);
  }
`


