// router/index.js (或 router/index.ts，如果你使用 TypeScript)
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/homePage/index.vue';
import privacy from '@/views/privacy/index.vue';
import generatedPoems from '@/views/generatedPoems/index.vue';
import generatedPoemCategory from '@/views/generatedPoemCategory/index.vue';
import generatedPoemType from '@/views/generatedPoemType/index.vue';
import generatedPoemId from '@/views/generatedPoemId/index.vue';
import i18n from '@/hooks/i18n'

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
    })
  },
  {
    path: '/:language?/poem',
    name: 'poem',
    component: generatedPoems,
    props: (route: any) => ({
      language: route.params.language || 'en',
    }),

  },
  {
    path: '/:language?/poem/:id',
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
    name: 'category',
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

// 监听路由变化
router.beforeEach((to, from, next) => {
  setTimeout(() => {

    if (to.name == 'poem' || to.name == 'category') {
      const pageTitle = i18n.global.t('header_title' + '_' + to.name); // 使用i18n来获取多语言标题
      const metaDescription = i18n.global.t('Description' + '_' + to.name); // 使用i18n来获取多语言描述
      document.title = pageTitle;
      const metaDescriptionTag = document.querySelector('meta[name="description"]');
      if (metaDescriptionTag) {
        metaDescriptionTag.setAttribute('content', metaDescription);
      } else {
        // 如果meta标签不存在，创建并添加
        const newMetaTag = document.createElement('meta');
        newMetaTag.name = 'description';
        newMetaTag.content = metaDescription;
        document.head.appendChild(newMetaTag);
      }

    } else {
      const pageTitle = i18n.global.t('header_title'); // 使用i18n来获取多语言标题
      const metaDescription = i18n.global.t('Description'); // 使用i18n来获取多语言描述
      document.title = pageTitle;
      const metaDescriptionTag = document.querySelector('meta[name="description"]');
      if (metaDescriptionTag) {
        metaDescriptionTag.setAttribute('content', metaDescription);
      } else {
        // 如果meta标签不存在，创建并添加
        const newMetaTag = document.createElement('meta');
        newMetaTag.name = 'description';
        newMetaTag.content = metaDescription;
        document.head.appendChild(newMetaTag);
      }
    }

    let linkTag = document.querySelector('link[rel="canonical"]');
    linkTag.setAttribute('href', to.fullPath)


  }, 0);



  next(); // 继续路由导航
});

router.afterEach(() => {
  window.scrollTo(0, 0); // 将页面滚动到顶部
});


export default router;