import { cx } from '../../cx.js';
import { FacebookIcon, GithubIcon, GoogleIcon } from '../../icons/SocialIcons.jsx';
import './SocialButton.css';

const PROVIDERS = {
  google: { label: 'Google', Icon: GoogleIcon },
  github: { label: 'GitHub', Icon: GithubIcon },
  facebook: { label: 'Facebook', Icon: FacebookIcon },
};

/** Botão branco 72×35 (raio 7.1) com a marca do provedor em 18px. */
export default function SocialButton({ provider = 'google', className, ...rest }) {
  const { label, Icon } = PROVIDERS[provider] ?? PROVIDERS.google;
  return (
    <button
      type="button"
      aria-label={`Continuar com ${label}`}
      className={cx('gl-social-btn', className)}
      {...rest}
    >
      <Icon />
    </button>
  );
}

/** Linha de botões sociais com 17px de espaço entre eles. */
export function SocialRow({ className, children }) {
  return <div className={cx('gl-social', className)}>{children}</div>;
}
