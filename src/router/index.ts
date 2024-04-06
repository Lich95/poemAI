// router/index.js (或 router/index.ts，如果你使用 TypeScript)
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/homePage/index.vue';
import privacy from '@/views/privacy/index.vue';
import generatedPoems from '@/views/generatedPoems/index.vue';
import generatedPoemCategory from '@/views/generatedPoemCategory/index.vue';
import generatedPoemType from '@/views/generatedPoemType/index.vue';
import generatedPoemId from '@/views/generatedPoemId/index.vue';

const routes = [
  {
    path: '/:language?/',
    name: 'Home',
    component: Home,
    props: (route: any) => ({
      language: route.params.language || 'en',
    }),

  },
  {
    path: '/:language?/privacy',
    name: 'privacy',
    component: privacy,
    props: (route: any) => ({
      language: route.params.language || 'en',
    }),

  },
  {
    path: '/:language?/generated-poems',
    name: 'generatedPoems',
    component: generatedPoems,
    props: (route: any) => ({
      language: route.params.language || 'en',
    }),

  },
  {
    path: '/:language?/generated-poem/:id',
    name: 'generatedPoemId',
    component: generatedPoemId,
    props: (route: any) => ({
      language: route.params.language || 'en',
    }),

  },
  {
    path: '/:language?/generated-poems-category/:GeneratedPoemType',
    name: 'generatedPoemType',
    component: generatedPoemType,
    props: (route: any) => ({
      language: route.params.language || 'en',
    }),

  },
  {
    path: '/:language?/generated-poem-category',
    name: 'generatedPoemCategory',
    component: generatedPoemCategory,
    props: (route: any) => ({
      language: route.params.language || 'en',
    }),
  },

  // 添加其他路由
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach(() => {
  window.scrollTo(0, 0); // 将页面滚动到顶部
});


export default router;