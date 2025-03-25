import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server:{
    port: 5173,
  }  // Asegura que las rutas sean relativas a la raíz
});
