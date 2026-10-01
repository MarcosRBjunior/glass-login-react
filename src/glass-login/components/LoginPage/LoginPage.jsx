import { cx } from '../../cx.js';
import DecorBackground from '../DecorBackground/DecorBackground.jsx';
import LoginCard from '../LoginCard/LoginCard.jsx';
import './LoginPage.css';

/**
 * Tela completa: moldura 1366×768 (raio 24) com gradiente radial,
 * formas 3D e o LoginCard centralizado.
 * fullscreen=true ocupa a janela inteira (sem cantos arredondados).
 * Aceita todas as props do LoginCard.
 */
export default function LoginPage({ className, fullscreen = false, ...cardProps }) {
  return (
    <div className={cx('gl-page', fullscreen && 'gl-page--full', className)}>
      <DecorBackground />
      <LoginCard {...cardProps} />
    </div>
  );
}
