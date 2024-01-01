// router/index.js (或 router/index.ts，如果你使用 TypeScript)
import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/index.vue';

const routes = [
    {
        path: '/:language?',
        name: 'Home',
        component: Home,
        props: (route) => ({
          language: route.params.language || 'en',
        }),
      },
  // 添加其他路由
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;