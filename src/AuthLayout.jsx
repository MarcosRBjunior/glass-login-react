import { useId } from 'react';
import { DecorBackground, GlassCard, TextField } from './glass-login';
import './AuthLayout.css';

/** Moldura das telas além do login: mesmo fundo e card, com logo e título. */
export default function AuthLayout({ title, children }) {
  return (
    <div className="gl-page gl-page--full app-page">
      <DecorBackground />
      <GlassCard>
        <div className="gl-logo">Your logo</div>
        <h1 className="gl-title">{title}</h1>
        {children}
      </GlassCard>
    </div>
  );
}

/** TextField com dica e mensagem de erro do campo, ligadas ao input para leitores de tela. */
export function Field({ hint, error, ...props }) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ');

  return (
    <div className="app-field">
      <TextField
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        {...props}
      />
      {hint && (
        <p className="app-hint" id={hintId}>
          {hint}
        </p>
      )}
      {error && (
        <p className="app-field-error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
}

/** Aviso em caixa: type="notice" para confirmações, "error" para falhas. */
export function Alert({ type = 'error', children }) {
  return (
    <p className={`app-alert app-alert--${type}`} role={type === 'error' ? 'alert' : 'status'}>
      {children}
    </p>
  );
}
