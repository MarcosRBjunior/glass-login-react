import { cx } from '../../cx.js';
import './GlassCard.css';

/**
 * Superfície de vidro fosco: 410×558, #5882C1 a 28%, blur 17.8px,
 * borda 1px em gradiente, raio 28.5, padding 40/80, pilha vertical.
 */
export default function GlassCard({ as: Tag = 'section', className, children, ...rest }) {
  return (
    <Tag className={cx('gl-card', className)} {...rest}>
      {children}
    </Tag>
  );
}
