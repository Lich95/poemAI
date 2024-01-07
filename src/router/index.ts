// router/index.js (或 router/index.ts，如果你使用 TypeScript)
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/homePage/index.vue';

const routes = [
    {
        path: '/:language?/',
        name: 'Home',
        component: Home,
        props: (route:any) => ({
          language: route.params.language || 'en',
        }),
       
      },
      
  // 添加其他路由
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;