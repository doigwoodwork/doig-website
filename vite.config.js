import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  if (mode === 'ssr') {
    return {
      plugins: [react()],
      build: {
        outDir: 'dist/server',
        ssr: true,
        rollupOptions: {
          input: 'entry-server.jsx',
          output: { entryFileNames: 'entry-server.js', format: 'es' }
        }
      }
    }
  }

  return {
    plugins: [react()],
    build: { outDir: 'dist' }
  }
})
