// ssr/index.js

import { createSSRApp } from 'vue';
import { createServerRenderer } from 'vite-plugin-ssr';
import App from '../src/App.vue'; // 这里假设你的 Vue 应用入口文件为 App.vue
import router from '../src/router'; // 导入你的路由配置文件

export default createServerRenderer((context) => {
  const app = createSSRApp(App);
 
  app.use(router); // 使用路由器
  return app;
});
