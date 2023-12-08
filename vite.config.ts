import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: "./",
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return
        }
        if (/Use of eval is strongly discouraged, as it poses security risks and may cause issues with minification/.test(warning.message)) {
          return;
        }
        warn(warning)
      }
    }
  }
})
