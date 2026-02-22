import react from '@vitejs/plugin-react'
import path, { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  plugins: [react()],

  build: {
    outDir: 'dist', // ✅ теперь Vercel увидит билд
    target: 'esnext',
    assetsDir: 'assets',

    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      components: path.resolve(__dirname, './src/components/'),
      common: path.resolve(__dirname, './src/common/'),
      pages: path.resolve(__dirname, './src/pages/'),
      ui: path.resolve(__dirname, './src/components/UI/'),
      models: path.resolve(__dirname, './src/models/'),
      store: path.resolve(__dirname, './src/store/'),
      routes: path.resolve(__dirname, './src/routes/'),
      services: path.resolve(__dirname, './src/services/'),
      utils: path.resolve(__dirname, './src/utils/'),
      styles: path.resolve(__dirname, './src/styles/'),
    },
  },
})
