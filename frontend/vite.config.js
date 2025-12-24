import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      jsxImportSource: 'react',
      babel: {
        plugins: [],
      },
    }),
    tailwindcss()
  ],
  server: {
    hmr: {
      overlay: true,
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
})
