import { Button, DecorBackground, GlassCard } from './glass-login';
import './SessionPage.css';

const ROLE_LABELS = { admin: 'Administrador', user: 'Usuário' };

/** Tela depois do login: mostra de quem é a sessão e o botão de sair. */
export default function SessionPage({ user, onLogout, loading = false, error }) {
  return (
    <div className="gl-page gl-page--full">
      <DecorBackground />
      <GlassCard className="app-session">
        <h1 className="app-session__title">Você entrou</h1>

        <dl className="app-session__info">
          <dt>Usuário</dt>
          <dd>{user.username}</dd>
          <dt>E-mail</dt>
          <dd>{user.email}</dd>
          <dt>Perfil</dt>
          <dd>{ROLE_LABELS[user.role] ?? user.role}</dd>
        </dl>

        {error && (
          <p className="app-session__error" role="alert">
            {error}
          </p>
        )}

        <Button className="app-session__logout" onClick={onLogout} disabled={loading}>
          Sair
        </Button>
      </GlassCard>
    </div>
  );
}
