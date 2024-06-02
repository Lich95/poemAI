// vite.config.js

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ssr from 'vite-plugin-ssr/plugin';

export default defineConfig({
  plugins: [vue()], //, ssr()
  resolve: {
    alias: {
      '@': '/src', // 将 @ 别名映射到项目根目录
      
    },
  },
  server: {
    host: '0.0.0.0',
    hmr: false
  }
});
