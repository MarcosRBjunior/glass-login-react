import { useId } from 'react';
import { cx } from '../../cx.js';
import './DecorBackground.css';

/**
 * Tubo "3D": traço base com gradiente + sombra desfocada abaixo + brilho desfocado acima.
 * hl = opacidade do brilho, sh = opacidade da sombra.
 */
function Tube({ d, w, fill, className, hl = 0.32, sh = 0.22, ids }) {
  const common = { d, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };
  return (
    <g className={className}>
      <path {...common} stroke={`url(#${ids[fill]})`} strokeWidth={w} />
      <path
        {...common}
        stroke="#001a4d"
        strokeOpacity={sh}
        strokeWidth={w * 0.42}
        transform={`translate(${w * 0.1} ${w * 0.17})`}
        filter={`url(#${ids.shade})`}
      />
      <path
        {...common}
        stroke="var(--decor-highlight, #d9edff)"
        strokeOpacity={hl}
        strokeWidth={w * 0.28}
        transform={`translate(${-w * 0.08} ${-w * 0.15})`}
        filter={`url(#${ids.hl})`}
      />
    </g>
  );
}

function Grad({ id, x1, y1, x2, y2, stops }) {
  return (
    <linearGradient id={id} x1={x1} y1={y1} x2={x2} y2={y2}>
      {stops.map(([offset, color]) => (
        <stop key={offset} offset={offset} style={{ stopColor: color }} />
      ))}
    </linearGradient>
  );
}

/**
 * As 10 formas 3D decorativas do fundo (SVG inline, viewBox 1366×768).
 * Coloque dentro de um container com o gradiente radial, atrás do card.
 */
export default function DecorBackground({ className }) {
  // ids únicos por instância (useId gera ":r0:", que não funciona em url(#...))
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const ids = {
    light: `gl-light-${uid}`,
    lightR: `gl-light-r-${uid}`,
    deep: `gl-deep-${uid}`,
    ring: `gl-ring-${uid}`,
    arc: `gl-arc-${uid}`,
    heart: `gl-heart-${uid}`,
    soft: `gl-soft-${uid}`,
    hl: `gl-blur-hl-${uid}`,
    shade: `gl-blur-shade-${uid}`,
  };
  const t = (props) => <Tube ids={ids} {...props} />;
  const bright = { className: 'shadowed', hl: 0.12, sh: 0.14 };

  return (
    <svg
      className={cx('gl-decor', className)}
      viewBox="0 0 1366 768"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <Grad id={ids.light} x1={0} y1={0} x2={1} y2={0.5} stops={[[0, '#dcefff'], [0.45, 'var(--decor-light, #8ccaff)'], [1, 'var(--decor-mid, #3a8eec)']]} />
        <Grad id={ids.lightR} x1={1} y1={0} x2={0} y2={0.6} stops={[[0, '#cfe8ff'], [0.5, 'var(--decor-light, #8ccaff)'], [1, 'var(--decor-mid, #3a8eec)']]} />
        <Grad id={ids.deep} x1={0} y1={0} x2={1} y2={1} stops={[[0, '#1a66c4'], [0.5, 'var(--decor-deep, #0c4fa3)'], [1, '#073a7c']]} />
        <Grad id={ids.ring} x1={0.8} y1={0} x2={0.1} y2={1} stops={[[0, '#083f86'], [0.5, 'var(--decor-deep, #0c4fa3)'], [1, '#3d93ec']]} />
        <Grad id={ids.arc} x1={0} y1={0} x2={1} y2={0.3} stops={[[0, '#083f86'], [0.6, 'var(--decor-deep, #0c4fa3)'], [1, '#1f9fe8']]} />
        <Grad id={ids.heart} x1={0} y1={0} x2={1} y2={1} stops={[[0, '#6aa6e6'], [0.5, '#3f84d2'], [1, '#2a6cbf']]} />
        <Grad id={ids.soft} x1={0} y1={0} x2={1} y2={1} stops={[[0, '#245fa6'], [1, '#0a3b7a']]} />
        <filter id={ids.hl} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation={4} />
        </filter>
        <filter id={ids.shade} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation={7} />
        </filter>
      </defs>

      {/* 1 · laços do canto inferior esquerdo (opacidade 0.5) */}
      <g className="soft lum">
        {t({ d: 'M -10 500 C 45 478 92 520 86 582 C 80 645 30 700 12 790', w: 56, fill: 'soft', hl: 0.3 })}
        {t({ d: 'M -10 612 C 60 560 150 560 170 632 C 188 700 176 740 182 790', w: 56, fill: 'soft', hl: 0.3 })}
        {t({ d: 'M 78 790 C 62 722 110 680 170 700 C 222 718 242 742 252 790', w: 56, fill: 'soft', hl: 0.3 })}
      </g>

      {/* 2 · coração, canto inferior direito */}
      <path
        className="lum"
        fill={`url(#${ids.heart})`}
        d="M 1162 702 C 1158 652 1214 624 1262 660 L 1292 688 C 1318 664 1344 650 1372 640 L 1372 772 L 1236 772 C 1196 748 1164 728 1162 702 Z"
      />

      {/* 3 · arco do topo */}
      {t({ d: 'M 394 -6 C 396 40 440 70 492 42', w: 26, fill: 'arc', className: 'shadowed', hl: 0.25 })}

      {/* 4 · curva grande atrás do card */}
      {t({
        d: 'M 800 424 C 768 300 790 150 850 110 C 902 78 952 112 916 170 C 896 202 942 160 976 180 C 1016 206 1002 266 966 286 C 936 306 950 356 986 346 C 1012 336 1002 290 1052 285 C 1112 280 1102 360 1096 402 C 1092 452 1110 490 1140 505',
        w: 68, fill: 'deep', className: 'lum', hl: 0.18,
      })}

      {/* 5 · anel */}
      {t({ d: 'M 456 512 A 65 65 0 1 0 367 601', w: 50, fill: 'ring', className: 'lum shadowed', hl: 0.25 })}

      {/* 6 · gancho claro saindo do anel */}
      {t({ d: 'M 440 578 C 412 626 372 640 318 636', w: 48, fill: 'lightR', ...bright })}

      {/* 7 · arco claro sob o card */}
      {t({ d: 'M 426 690 C 482 700 540 676 556 630', w: 46, fill: 'lightR', ...bright })}

      {/* 8 · zigue-zague grande */}
      {t({ d: 'M 325 286 L 370 243 L 410 283 L 446 243', w: 52, fill: 'light', ...bright })}

      {/* 9 · zigue-zague pequeno */}
      {t({ d: 'M 292 371 L 318 347 L 345 372 L 367 347', w: 36, fill: 'light', ...bright })}

      {/* 10 · ondas à direita */}
      {t({ d: 'M 922 543 C 936 562 955 562 968 550 C 982 537 1000 540 1013 552', w: 32, fill: 'light', ...bright })}
      {t({ d: 'M 982 590 C 996 610 1016 610 1029 597 C 1043 584 1061 587 1073 600', w: 32, fill: 'light', ...bright })}
    </svg>
  );
}
