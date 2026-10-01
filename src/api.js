// Em dev fica vazio e o proxy do Vite atende /api. Com o front publicado em
// outro domínio, VITE_API_URL aponta para a API (e o CORS_ORIGIN dela, para cá).
const API_URL = `${import.meta.env.VITE_API_URL ?? ''}/api/v1`;

export class ApiError extends Error {
  // details: mensagens por campo ({ email: ['...'] }), na validação e no 409.
  constructor(status, code, message, details) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

// A sessão é o cookie httpOnly access_token: o navegador manda sozinho e o
// token nunca fica acessível ao JavaScript.
async function request(path, { method = 'GET', body } = {}) {
  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      credentials: 'include',
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(0, 'NETWORK_ERROR', 'Não foi possível conectar ao servidor.');
  }

  if (res.status === 204) return null;
  const data = await res.json().catch(() => null);
  if (res.ok) return data;

  // Erros da API: { error: { code, message, details? } }. Na validação, o
  // primeiro detalhe diz mais que o "Dados inválidos" genérico.
  const error = data?.error;
  const detail =
    error?.code === 'VALIDATION_ERROR' ? Object.values(error.details ?? {}).flat()[0] : undefined;
  throw new ApiError(
    res.status,
    error?.code ?? 'HTTP_ERROR',
    detail || error?.message || 'O servidor não respondeu como esperado. Tente de novo.',
    error?.details,
  );
}

export const getMe = () => request('/me');

// O campo username da API aceita username ou e-mail.
export const login = ({ username, password }) =>
  request('/login', { method: 'POST', body: { username, password } });

export const logout = () => request('/logout', { method: 'POST' });

// A conta nasce inativa: a API manda o link de ativação para o e-mail.
export const register = ({ username, email, password }) =>
  request('/register', { method: 'POST', body: { username, email, password } });

// Responde igual exista ou não a conta, para não revelar e-mails cadastrados.
export const forgotPassword = ({ email }) =>
  request('/auth/forgot-password', { method: 'POST', body: { email } });

// Mesmo desenho do forgot: a resposta não diz se a conta existe.
export const resendActivation = ({ email }) =>
  request('/auth/resend-activation', { method: 'POST', body: { email } });

export const activate = ({ token }) => request('/auth/activate', { method: 'POST', body: { token } });

export const resetPassword = ({ token, newPassword }) =>
  request('/auth/reset-password', { method: 'POST', body: { token, newPassword } });

// Link de e-mail que não serve mais: token gasto ou expirado, ou malformado
// (aí a validação reclama do campo token).
export const isInvalidLink = (err) =>
  err.code === 'TOKEN_INVALID_OR_EXPIRED' || Boolean(err.details?.token);

// Token dos links de ativação e reset, que chega na query (?token=...).
export const linkToken = () => new URLSearchParams(window.location.search).get('token') ?? '';
