// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // Automatically open the app in the default browser when the dev server starts
    port: 3000, // You can change this to any port number you want
  },
  build: {
    outDir: 'build', // Optional: change output directory if necessary
  },
});
