import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  root: resolve(__dirname), // Asegura que Vite use la raíz del proyecto
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'index.html'), // Especifica la ubicación de index.html
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
