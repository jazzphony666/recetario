import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    allowedHosts: [
      'recetario-frontend.onrender.com',
      'localhost',
      '127.0.0.1'
    ],
    host: '0.0.0.0',
    port: process.env.PORT || 4200
  }
}); 