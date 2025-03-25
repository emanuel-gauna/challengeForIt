import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server:{
    port: 5173,
  }  // Asegura que las rutas sean relativas a la raíz
});
