import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Em dev, /api vai para o auth-system: para o navegador é tudo a mesma
    // origem, então o cookie de sessão funciona sem CORS.
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
