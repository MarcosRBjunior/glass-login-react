# Glass Login — componentes React

Tela de login com efeito glassmorphism (fundo gradiente azul, formas 3D, card de vidro fosco), em React + Vite, JavaScript (JSX) e CSS puro.

## Rodar

```bash
npm install
npm run dev
```

## Usar no seu projeto

Copie a pasta `src/glass-login/` para o `src/` do seu projeto e importe:

```jsx
import { LoginPage } from './glass-login';

<LoginPage
  fullscreen
  onSubmit={({ email, password }) => { /* chamar sua API */ }}
  onSocial={(provider) => { /* 'google' | 'github' | 'facebook' */ }}
  loading={false}
  error=""
  forgotHref="/forgot-password"
  registerHref="/register"
/>
```

O `import './glass-login'` já carrega `tokens.css` (variáveis CSS + fontes). Cada componente importa o próprio `.css`.

## Componentes

| Componente | O que é | Props principais |
|---|---|---|
| `LoginPage` | Tela inteira: moldura 1366×768 com gradiente, formas 3D e card | todas do `LoginCard` + `fullscreen` |
| `LoginCard` | Card de vidro com o formulário completo | `logo`, `title`, `submitLabel`, `onSubmit`, `onSocial`, `providers`, `forgotHref`, `registerHref`, `loading`, `error` |
| `GlassCard` | Só a superfície de vidro (410×558) | `as`, `className`, `children` |
| `TextField` | Rótulo + input branco; `type="password"` mostra o olho | `label`, `type`, `revealable` + props de `<input>` |
| `Button` | Botão primário azul-marinho 250×40 | props de `<button>` |
| `SocialButton` | Botão branco 72×35 com ícone | `provider` |
| `SocialRow` | Linha de botões sociais (gap 17px) | `children` |
| `DecorBackground` | As 10 formas 3D (SVG) | `className` |

## Estrutura

```
src/glass-login/
  index.js            exports
  tokens.css          variáveis CSS (cores, espaçamentos, raios, sombras) + @font-face
  fonts/              Outfit (substituta gratuita da Gilroy)
  icons/              olho, Google, GitHub, Facebook
  components/<Nome>/  <Nome>.jsx + <Nome>.css
```

## Fonte

A Gilroy é paga. A pilha de fontes é `Gilroy, Outfit, system-ui`: se você tiver a Gilroy, adicione os `@font-face` dela em `tokens.css` e ela passa a ser usada automaticamente.

## API

As telas (login, cadastro, ativação, esqueci a senha, nova senha) chamam a API do
[auth-system](https://github.com/MarcosRBjunior/Autenticador) em `/api/v1`, com a
sessão num cookie httpOnly.

- **Desenvolvimento:** suba a API em `http://localhost:3000`. O proxy do Vite
  (`vite.config.js`) repassa `/api` para ela.
- **Vercel:** o `vercel.json` repassa `/api` para o domínio da API e manda os outros
  caminhos para o `index.html`. Troque `https://dominio-da-api.invalid` pelo domínio
  de produção da API. O passo a passo completo está em `docs/deploy-vercel.md`, no
  repositório da API.
