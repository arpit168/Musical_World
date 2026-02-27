import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: false,
    // Optimize chunk size
    rollupOptions: {
      output: {
        // Manual chunks configuration - only split if beneficial
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) {
              return 'animations';
            }
            return 'vendor';
          }
        },
      },
    },
    // Terser options for better compression
    terserOptions: {
      compress: {
        drop_console: false,
      },
    },
  },
  server: {
    port: 3000,
    strictPort: false,
    open: false,
  },
  preview: {
    port: 5000,
  },
})
