import { useState } from 'react';
import { Button } from './glass-login';
import AuthLayout, { Alert, Field } from './AuthLayout.jsx';

/**
 * Tela que pede um e-mail e manda um link para ele (reset de senha, reenvio da
 * ativação). send recebe { email } e devolve a mensagem da API.
 */
export default function EmailLinkPage({ title, text, send }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [notice, setNotice] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get('email') ?? '');
    setError('');
    setFieldError('');
    setNotice('');
    setLoading(true);
    try {
      // A mensagem vem da API e é a mesma com ou sem conta cadastrada.
      const { message } = await send({ email });
      setNotice(message);
    } catch (err) {
      if (err.details?.email) setFieldError(err.details.email[0]);
      else setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title={title}>
      {notice && <Alert type="notice">{notice}</Alert>}
      {error && <Alert>{error}</Alert>}

      <p className="app-text">{text}</p>

      <form className="gl-form" onSubmit={handleSubmit} noValidate>
        <div className="app-fields">
          <Field label="E-mail" name="email" type="email" autoComplete="email" error={fieldError} />
        </div>

        <Button type="submit" className="gl-submit" disabled={loading}>
          Enviar link
        </Button>
      </form>

      <p className="gl-footer">
        <a href="/">Voltar ao login</a>
      </p>
    </AuthLayout>
  );
}
