import { useState } from 'react';
import { Button } from './glass-login';
import AuthLayout, { Alert, Field } from './AuthLayout.jsx';
import * as api from './api.js';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const { username, email, password, passwordConfirmation } = Object.fromEntries(
      new FormData(e.currentTarget),
    );
    setError('');
    // A API não recebe a confirmação: conferir as duas senhas é papel da tela.
    if (password !== passwordConfirmation) {
      setFieldErrors({ passwordConfirmation: ['As senhas não são iguais'] });
      return;
    }
    setFieldErrors({});
    setLoading(true);
    try {
      await api.register({ username, email, password });
      setDone(true);
    } catch (err) {
      // Validação e username/e-mail já em uso vêm por campo; o resto, no topo.
      if (err.details) setFieldErrors(err.details);
      else setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <AuthLayout title="Criar conta">
        <Alert type="notice">
          Conta criada. Enviamos um link de ativação para o seu e-mail: ative a conta antes de
          entrar.
        </Alert>
        <a className="gl-btn gl-submit" href="/">
          Voltar ao login
        </a>
        <p className="gl-footer">
          Não recebeu? <a href="/resend-activation">Pedir outro link</a>
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Criar conta">
      {error && <Alert>{error}</Alert>}

      <form className="gl-form" onSubmit={handleSubmit} noValidate>
        <div className="app-fields">
          <Field
            label="Username"
            name="username"
            autoComplete="username"
            hint="3 a 30 caracteres: letras sem acento, números, ponto, hífen e _"
            error={fieldErrors.username?.[0]}
          />
          <Field
            label="E-mail"
            name="email"
            type="email"
            autoComplete="email"
            error={fieldErrors.email?.[0]}
          />
          <Field
            label="Senha"
            name="password"
            type="password"
            autoComplete="new-password"
            hint="8 a 72 caracteres"
            error={fieldErrors.password?.[0]}
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
          Criar conta
        </Button>
      </form>

      <p className="gl-footer">
        Já tem conta? <a href="/">Entrar</a>
      </p>
    </AuthLayout>
  );
}
