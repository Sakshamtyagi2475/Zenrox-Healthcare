import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,                   // allows LAN and ngrok access
    cors: true,                   // allows cross-origin requests
    strictPort: true,             // keeps the same port
    hmr: {
      clientPort: 5173,           // in case you're using HMR (default Vite port)
    },
    origin: 'http://localhost:5173',  // fallback origin
  },
})