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
    let pageTitle = '', metaDescription = '';
    if (to.name == 'poem' || to.name == 'category') {
      pageTitle = i18n.global.t('header_title' + '_' + to.name); // 使用i18n来获取多语言标题
      metaDescription = i18n.global.t('Description' + '_' + to.name); // 使用i18n来获取多语言描述



    } else if (to.name == 'generatedPoemId') {
      pageTitle = i18n.global.t('header_title_poem_type'); // 使用i18n来获取多语言标题
      metaDescription = i18n.global.t('Description_poem_type'); // 使用i18n来获取多语言描述

    } else if (to.name == 'generatedPoemType') {
      pageTitle = i18n.global.t('header_title_category_type'); // 使用i18n来获取多语言标题
      metaDescription = i18n.global.t('Description_category_type'); // 使用i18n来获取多语言描述

    } else {
      pageTitle = i18n.global.t('header_title'); // 使用i18n来获取多语言标题
      metaDescription = i18n.global.t('Description'); // 使用i18n来获取多语言描述

    }

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

    let linkTag = document.querySelector('link[rel="canonical"]');
    linkTag.setAttribute('href', to.fullPath)



  }, 0);

  clearAlternateLinks();
  if (to.path == 'poem' || to.name == 'category') {
    addAlternateLinks([
      { href: "https://poemgenerator-ai.com/" + to.path + '/', hreflang: "en" },
      { href: "https://poemgenerator-ai.com/fr/" + to.path + '/', hreflang: "fr" },
      { href: "https://poemgenerator-ai.com/de/" + to.path + '/', hreflang: "de" },
      { href: "https://poemgenerator-ai.com/ru/" + to.path + '/', hreflang: "ru" },
      { href: "https://poemgenerator-ai.com/pt/" + to.path + '/', hreflang: "pt" },
      { href: "https://poemgenerator-ai.com/es/" + to.path + '/', hreflang: "es" },
      { href: "https://poemgenerator-ai.com/it/" + to.path + '/', hreflang: "it" },


      { href: "https://poemgenerator-ai.com/ja/" + to.path + '/', hreflang: "ja" },
      { href: "https://poemgenerator-ai.com/ko/" + to.path + '/', hreflang: "ko" },
      { href: "https://poemgenerator-ai.com/th/" + to.path + '/', hreflang: "th" },
      { href: "https://poemgenerator-ai.com/id/" + to.path + '/', hreflang: "id" },
      { href: "https://poemgenerator-ai.com/vi/" + to.path + '/', hreflang: "vi" },
      { href: "https://poemgenerator-ai.com/ar/" + to.path + '/', hreflang: "ar" },
      { href: "https://poemgenerator-ai.com/tr/" + to.path + '/', hreflang: "tr" },
      { href: "https://poemgenerator-ai.com/" + to.path + '/', hreflang: "x-default" }
    ]);
  } else {
    addAlternateLinks([
      { href: "https://poemgenerator-ai.com/", hreflang: "en" },
      { href: "https://poemgenerator-ai.com/fr/", hreflang: "fr" },
      { href: "https://poemgenerator-ai.com/de/", hreflang: "de" },
      { href: "https://poemgenerator-ai.com/ru/", hreflang: "ru" },
      { href: "https://poemgenerator-ai.com/pt/", hreflang: "pt" },
      { href: "https://poemgenerator-ai.com/es/", hreflang: "es" },
      { href: "https://poemgenerator-ai.com/it/", hreflang: "it" },

      { href: "https://poemgenerator-ai.com/ja/", hreflang: "ja" },
      { href: "https://poemgenerator-ai.com/ko/", hreflang: "ko" },
      { href: "https://poemgenerator-ai.com/th/", hreflang: "th" },
      { href: "https://poemgenerator-ai.com/id/", hreflang: "id" },
      { href: "https://poemgenerator-ai.com/vi/", hreflang: "vi" },
      { href: "https://poemgenerator-ai.com/ar/", hreflang: "ar" },
      { href: "https://poemgenerator-ai.com/tr/", hreflang: "tr" },
      { href: "https://poemgenerator-ai.com/", hreflang: "x-default" }
    ]);
  }
  // 根据需要为其他路径添加相应的 hreflang 链接





  next(); // 继续路由导航
});

router.afterEach(() => {
  window.scrollTo(0, 0); // 将页面滚动到顶部
});



function addAlternateLinks(links) {
  links.forEach(linkInfo => {
    let link = document.createElement('link');
    link.rel = 'alternate';
    link.href = linkInfo.href;
    link.hreflang = linkInfo.hreflang;
    document.head.appendChild(link);
  });
}

function clearAlternateLinks() {
  const existingLinks = document.querySelectorAll('link[rel="alternate"]');
  existingLinks.forEach(link => link.parentNode.removeChild(link));
}


export default router;