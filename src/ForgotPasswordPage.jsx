import EmailLinkPage from './EmailLinkPage.jsx';
import * as api from './api.js';

export default function ForgotPasswordPage() {
  return (
    <EmailLinkPage
      title="Esqueci minha senha"
      text="Informe o e-mail da conta. Se ele estiver cadastrado, mandamos um link para criar uma senha nova, válido por 30 minutos."
      send={api.forgotPassword}
    />
  );
}
