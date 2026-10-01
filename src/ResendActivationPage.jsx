import EmailLinkPage from './EmailLinkPage.jsx';
import * as api from './api.js';

export default function ResendActivationPage() {
  return (
    <EmailLinkPage
      title="Reenviar ativação"
      text="Informe o e-mail da conta. Se ela ainda não foi ativada, mandamos um link novo, válido por 24 horas."
      send={api.resendActivation}
    />
  );
}
