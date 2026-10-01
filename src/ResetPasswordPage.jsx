import { useState } from 'react';
import { Button } from './glass-login';
import AuthLayout, { Alert, Field } from './AuthLayout.jsx';
import * as api from './api.js';

export default function ResetPasswordPage() {
  const [token] = useState(api.linkToken);
  // form → done, ou invalid quando o link não serve (inclusive sem token).
  const [status, setStatus] = useState(token ? 'form' : 'invalid');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const { newPassword, passwordConfirmation } = Object.fromEntries(
      new FormData(e.currentTarget),
    );
    setError('');
    // A API não recebe a confirmação: conferir as duas senhas é papel da tela.
    if (newPassword !== passwordConfirmation) {
      setFieldErrors({ passwordConfirmation: ['As senhas não são iguais'] });
      return;
    }
    setFieldErrors({});
    setLoading(true);
    try {
      const { message } = await api.resetPassword({ token, newPassword });
      setMessage(message);
      setStatus('done');
    } catch (err) {
      if (api.isInvalidLink(err)) setStatus('invalid');
      // Senha recusada não gasta o link: a pessoa corrige e envia de novo.
      else if (err.details) setFieldErrors(err.details);
      else setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (status === 'invalid') {
    return (
      <AuthLayout title="Nova senha">
        <Alert>Este link de redefinição é inválido ou expirou.</Alert>
        <a className="gl-btn gl-submit" href="/forgot-password">
          Pedir novo link
        </a>
        <p className="gl-footer">
          <a href="/">Voltar ao login</a>
        </p>
      </AuthLayout>
    );
  }

  if (status === 'done') {
    return (
      <AuthLayout title="Nova senha">
        <Alert type="notice">{message}</Alert>
        <a className="gl-btn gl-submit" href="/">
          Entrar
        </a>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Nova senha">
      {error && <Alert>{error}</Alert>}

      <form className="gl-form" onSubmit={handleSubmit} noValidate>
        <div className="app-fields">
          <Field
            label="Nova senha"
            name="newPassword"
            type="password"
            autoComplete="new-password"
            hint="8 a 72 caracteres"
            error={fieldErrors.newPassword?.[0]}
          />
          <Field
            label="Confirmar senha"
            name="passwordConfirmation"
            type="password"
            autoComplete="new-password"
            error={fieldErrors.passwordConfirmation?.[0]}
          />
        </div>

        <Button type="submit" className="gl-submit" disabled={loading}>
          Salvar senha
        </Button>
      </form>

      <p className="gl-footer">
        <a href="/">Voltar ao login</a>
      </p>
    </AuthLayout>
  );
}
