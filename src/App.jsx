import { useEffect, useState } from 'react';
import { DecorBackground, LoginPage } from './glass-login';
import SessionPage from './SessionPage.jsx';
import RegisterPage from './RegisterPage.jsx';
import ForgotPasswordPage from './ForgotPasswordPage.jsx';
import ResendActivationPage from './ResendActivationPage.jsx';
import ActivatePage from './ActivatePage.jsx';
import ResetPasswordPage from './ResetPasswordPage.jsx';
import * as api from './api.js';

// Sem router: os links recarregam a página e o caminho escolhe a tela. Qualquer
// outro caminho cai no login. /activate e /reset-password são os destinos dos
// links enviados por e-mail (APP_URL da API apontando para este front).
const PAGES = {
  '/register': RegisterPage,
  '/forgot-password': ForgotPasswordPage,
  '/resend-activation': ResendActivationPage,
  '/activate': ActivatePage,
  '/reset-password': ResetPasswordPage,
};

export default function App() {
  const Page = PAGES[window.location.pathname] ?? Home;
  return <Page />;
}

// Login ou, com sessão ativa, a tela de quem está logado.
function Home() {
  // undefined enquanto a sessão é verificada; null quando ninguém está logado.
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // O cookie é httpOnly: só a API sabe dizer se ainda há uma sessão válida.
  useEffect(() => {
    let active = true;
    api
      .getMe()
      .then(({ user }) => active && setUser(user))
      .catch((err) => {
        if (!active) return;
        setUser(null);
        if (err.status !== 401) setError(err.message);
      });
    return () => {
      active = false;
    };
  }, []);

  async function handleLogin({ email, password }) {
    setError('');
    if (!email || !password) {
      setError('Preencha email e senha.');
      return;
    }
    setLoading(true);
    try {
      // O campo "Email" também aceita o username: a API procura pelos dois.
      const { user } = await api.login({ username: email, password });
      setUser(user);
    } catch (err) {
      setError(
        err.code === 'ACCOUNT_INACTIVE' ? (
          <>
            Conta ainda não ativada. Veja seu e-mail ou{' '}
            <a href="/resend-activation">peça um novo link</a>.
          </>
        ) : (
          err.message
        ),
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    setError('');
    setLoading(true);
    try {
      await api.logout();
      setUser(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (user === undefined) {
    return (
      <div className="gl-page gl-page--full">
        <DecorBackground />
      </div>
    );
  }

  if (user) {
    return <SessionPage user={user} onLogout={handleLogout} loading={loading} error={error} />;
  }

  return (
    <LoginPage
      fullscreen
      loading={loading}
      error={error}
      onSubmit={handleLogin}
      onSocial={(provider) => console.log('social', provider)}
      forgotHref="/forgot-password"
      registerHref="/register"
    />
  );
}
