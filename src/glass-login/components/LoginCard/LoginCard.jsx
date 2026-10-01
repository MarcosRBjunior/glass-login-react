import GlassCard from '../GlassCard/GlassCard.jsx';
import TextField from '../TextField/TextField.jsx';
import Button from '../Button/Button.jsx';
import SocialButton, { SocialRow } from '../SocialButton/SocialButton.jsx';
import './LoginCard.css';

/**
 * Card de vidro com o formulário completo de login.
 *
 * @param {object}   props
 * @param {React.ReactNode} [props.logo="Your logo"]
 * @param {string}   [props.title="Login"]
 * @param {string}   [props.submitLabel="Sign in"]
 * @param {(values: {email: string, password: string}) => void} [props.onSubmit]
 * @param {(provider: 'google'|'github'|'facebook') => void} [props.onSocial]
 * @param {Array<'google'|'github'|'facebook'>} [props.providers]
 * @param {string}   [props.forgotHref="#"]
 * @param {string}   [props.registerHref="#"]
 * @param {boolean}  [props.loading=false]  desabilita o botão enquanto envia
 * @param {string}   [props.error]           mensagem de erro exibida acima do botão
 */
export default function LoginCard({
  logo = 'Your logo',
  title = 'Login',
  submitLabel = 'Sign in',
  onSubmit,
  onSocial,
  providers = ['google', 'github', 'facebook'],
  forgotHref = '#',
  registerHref = '#',
  loading = false,
  error,
  className,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    onSubmit?.({ email: String(form.get('email') ?? ''), password: String(form.get('password') ?? '') });
  }

  return (
    <GlassCard className={className}>
      <div className="gl-logo">{logo}</div>
      <h1 className="gl-title">{title}</h1>

      <form className="gl-form" onSubmit={handleSubmit} noValidate>
        <div className="gl-fields">
          <TextField label="Email" name="email" type="email" placeholder="username@gmail.com" autoComplete="email" />
          <TextField label="Password" name="password" type="password" placeholder="Password" autoComplete="current-password" />
        </div>

        <a className="gl-link gl-forgot" href={forgotHref}>
          Forgot Password?
        </a>

        {error && (
          <p className="gl-error" role="alert">
            {error}
          </p>
        )}

        <Button type="submit" className="gl-submit" disabled={loading}>
          {submitLabel}
        </Button>
      </form>

      <p className="gl-sep">or continue with</p>

      <SocialRow className="gl-social-row">
        {providers.map((p) => (
          <SocialButton key={p} provider={p} onClick={() => onSocial?.(p)} />
        ))}
      </SocialRow>

      <p className="gl-footer">
        Don’t have an account yet? <a href={registerHref}>Register for free</a>
      </p>
    </GlassCard>
  );
}
