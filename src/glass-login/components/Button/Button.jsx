import { cx } from '../../cx.js';
import './Button.css';

/** Botão primário: 250×40, azul-marinho #003465, raio 7.1, Bold 16px branco. */
export default function Button({ type = 'button', className, children, ...rest }) {
  return (
    <button type={type} className={cx('gl-btn', className)} {...rest}>
      {children}
    </button>
  );
}
