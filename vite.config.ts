import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src', // 将 @ 别名映射到 src 目录
    },
  },
  server: {
    host: '0.0.0.0',
    hmr: false
  }
})
