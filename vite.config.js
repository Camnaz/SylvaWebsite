import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  publicDir: 'images',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  preview: {
    port: 3000
  }
})
