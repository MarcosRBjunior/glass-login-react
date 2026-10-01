/** Junta classes CSS ignorando valores falsy. */
export const cx = (...c) => c.filter(Boolean).join(' ');
