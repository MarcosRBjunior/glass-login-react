import { useId, useState } from 'react';
import { cx } from '../../cx.js';
import { EyeHideIcon, EyeIcon } from '../../icons/EyeHideIcon.jsx';
import './TextField.css';

/**
 * Rótulo branco + input branco 250×31 (raio 5).
 * Com type="password" mostra o botão de olho para exibir/ocultar a senha.
 */
export default function TextField({ label, type = 'text', id, className, revealable = true, ...inputProps }) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const [shown, setShown] = useState(false);

  const isPassword = type === 'password';
  const showToggle = isPassword && revealable;
  const inputType = isPassword && shown ? 'text' : type;

  return (
    <div className={cx('gl-field', className)}>
      {label && (
        <label className="gl-label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className="gl-input-wrap">
        <input
          id={inputId}
          type={inputType}
          className={cx('gl-input', showToggle && 'has-icon')}
          {...inputProps}
        />
        {showToggle && (
          <button
            type="button"
            className="gl-eye"
            aria-label={shown ? 'Ocultar senha' : 'Mostrar senha'}
            aria-pressed={shown}
            onClick={() => setShown((s) => !s)}
          >
            {shown ? <EyeIcon /> : <EyeHideIcon />}
          </button>
        )}
      </div>
    </div>
  );
}
