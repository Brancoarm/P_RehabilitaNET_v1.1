import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true, // Abre el navegador automáticamente
  },
  resolve: {
    alias: {
      '@': '/src', // Agrega un alias para importar desde `src`
    },
  },
});
