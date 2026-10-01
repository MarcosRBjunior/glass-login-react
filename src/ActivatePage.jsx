import { useState } from 'react';
import { Button } from './glass-login';
import AuthLayout, { Alert } from './AuthLayout.jsx';
import * as api from './api.js';

export default function ActivatePage() {
  const [token] = useState(api.linkToken);
  // form → done, ou invalid quando o link não serve (inclusive sem token).
  const [status, setStatus] = useState(token ? 'form' : 'invalid');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Ativa só no clique, nunca ao abrir: scanners de link dos provedores de
  // e-mail abrem a página sozinhos e não podem ativar a conta no lugar do dono.
  async function handleActivate() {
    setError('');
    setLoading(true);
    try {
      const { message } = await api.activate({ token });
      setMessage(message);
      setStatus('done');
    } catch (err) {
      if (api.isInvalidLink(err)) setStatus('invalid');
      else setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (status === 'invalid') {
    return (
      <AuthLayout title="Ativar conta">
        <Alert>Este link de ativação é inválido ou expirou.</Alert>
        <a className="gl-btn gl-submit" href="/resend-activation">
          Pedir um novo link
        </a>
        <p className="gl-footer">
          <a href="/">Voltar ao login</a>
        </p>
      </AuthLayout>
    );
  }

  if (status === 'done') {
    return (
      <AuthLayout title="Ativar conta">
        <Alert type="notice">{message}</Alert>
        <a className="gl-btn gl-submit" href="/">
          Entrar
        </a>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Ativar conta">
      {error && <Alert>{error}</Alert>}
      <p className="app-text">
        Confirme para ativar sua conta. Depois é só entrar com seu usuário e senha.
      </p>
      <Button className="gl-submit" onClick={handleActivate} disabled={loading}>
        Ativar minha conta
      </Button>
      <p className="gl-footer">
        <a href="/">Voltar ao login</a>
      </p>
    </AuthLayout>
  );
}
