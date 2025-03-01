<<<<<<< HEAD
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,  // Change this if needed
=======
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
>>>>>>> 5f9b58ae78de102e9f76668b13ae02716b83139d
  },
});
