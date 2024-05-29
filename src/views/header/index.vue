<template>
    <div>
        <div class="header">
            <div class="mobileMenu">
                <div class="" @click="toggleMenu(true)" v-if="!mobileNav">
                    <img src="@/assets/icon/mobileNav.png" alt="">
                </div>
                <div class="" @click="toggleMenu(false)" v-else>
                    <img src="@/assets/icon/mobileClose.png" alt="">
                </div>
            </div>

            <div v-show="mobileNav" class="mobileMenuPop" ref="target">
                <el-menu @select="handleSelect" :default-active="selectedKeys">
                    <el-menu-item @click="goGenerated">
                        <img src="@/assets/icon/Lamp.png" alt="">
                        <span>{{ $t('poemai_example') }}</span></el-menu-item>
                    <el-menu-item @click="goPrivacy">
                        <img src="@/assets/icon/privacy_icon.png" alt="">
                        <span>{{ $t('poemai_privacy') }}</span> </el-menu-item>
                    <el-sub-menu index="1" v-if="changeLocal">
                        <template #title>
                            <img src="@/assets/icon/language.png" alt="">
                            <span style="margin-left:10px"> {{ _thislanguage() }}</span>
                        </template>
                        <el-menu-item v-for="item in dropMenuList" :index="item.event"> {{ item.text }}</el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </div>


            <div class="logoDiv" @click="logoClick">
                <img src="/public/logo.png" alt="" class="logo">
                <!-- <h1 class="logoTxt"><span class="pp">AI</span> Poem Generator</h1> -->
                <h1 class="logoTxt">{{ $t('poemai_title') }}</h1>
            </div>
            <div class="tools">
                <div class="Generated" @click="goGenerated">
                    <img src="@/assets/icon/Lamp.png" alt="">
                    <span>{{ $t('poemai_example') }}</span>
                </div>
                <div class="privacy" @click="goPrivacy">
                    <img src="@/assets/icon/privacy_icon.png" alt="">
                    <span>{{ $t('poemai_privacy') }}</span>
                </div>
                <div class="language" v-if="changeLocal">
                    <el-dropdown trigger="click" @command="handleCommand">
                        <span class="el-dropdown-link">
                            {{ _thislanguage() }}
                            <el-icon>
                                <ArrowDownBold style="padding-left: 4px;" />
                            </el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <!-- <el-menu @select="handleSelect" :default-active="defaultActive">
                                    <el-menu-item  v-for="item in dropMenuList" :index="item.event">{{ item.text }}</el-menu-item>
                                   
                                    </el-menu> -->
                                <el-dropdown-item v-for="item in dropMenuList" :command="item.event">{{ item.text
                                    }}</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>

                    </el-dropdown>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

import { onClickOutside } from '@vueuse/core'
import { ref, onMounted, onBeforeUnmount, computed, nextTick, watch } from "vue";
import { useRoute, useRouter } from 'vue-router';
import i18n from '@/hooks/i18n'
const router = useRouter()
const route = useRoute();

const currentRoute = ref(route)
const mobileNav = ref(false);
const defaultOpeneds = ref([])
const dropMenuList = [
    { event: 'en', text: 'English' },
    { event: 'fr', text: 'Français' },
    { event: 'ru', text: 'Русский' },
    { event: 'it', text: 'Italiano' },
    { event: 'de', text: 'Deutsch' },
    { event: 'es', text: 'español' },
    { event: 'pt', text: 'Português' },

    { event: 'ja', text: '日本語' },
    { event: 'ko', text: '한국인' },
    { event: 'th', text: 'แบบไทย' },
    { event: 'id', text: 'bahasa Indonesia' },
    { event: 'vi', text: 'Tiếng Việt' },
    { event: 'ar', text: ' عربي' },
    { event: 'tr', text: 'Türk Dili' },

]
const languages = ['en', 'fr', 'ru', 'it', 'de', 'es', 'pt']
const changeLocal = ref(true)
const selectedKeys = computed(() => {
    return route.params.language || 'en';
})
const target = ref(null);
onClickOutside(target, event => mobileNav.value = false);
const languageList = dropMenuList.map(x => {
    x.label = x.event
    return x
})
const goPrivacy = () => {
    if (mobileNav.value) {
        mobileNav.value = false
    }
    router.push({ name: 'privacy', params: { language: i18n.global.locale } });
}
const goGenerated = () => {
    if (mobileNav.value) {
        mobileNav.value = false
    }
    router.push({ name: 'poem', params: { language: i18n.global.locale || 'en' } });
}

const logoClick = () => {

    router.push({ name: 'Home', params: { language: i18n.global.locale != 'en' ? i18n.global.locale : '' } });
}
const handleCommand = (command) => {

    if(route.name=='Home'){
    if (command == 'en') {
        command = ''
    }
}
    if (command == 'ar') {
        var htmlElement = document.getElementsByTagName('html')[0];
        // 修改样式
        htmlElement.style.direction = 'rtl';
    } else {
        var htmlElement = document.getElementsByTagName('html')[0];
        // 修改样式
        htmlElement.style.direction = '';
    }

 

    router.push({ name: route.name, params: { language: command } }).then(() => {
        i18n.global.locale = command;
        localStorage.setItem('languageSave', command)
       router.go(0)
    });

}
const _thislanguage = () => {
    let language = route.params.language || 'en';
    return dropMenuList.find(x => x.event == language).text
}

const handleSelect = (e) => {
    if (e == 'en') {
        e = ''
    }
    localStorage.setItem('languageSave', e)
    router.push({ name: route.name, params: { language: e } });


    i18n.global.locale = e;

    // 更新文档标题和meta标签
    // const pageTitle = i18n.global.t('header_title'); // 使用i18n来获取多语言标题
    // const metaDescription = i18n.global.t('Description'); // 使用i18n来获取多语言描述
    // document.title = pageTitle;

    // const linkTag = document.querySelector('link[rel="canonical"]');
    // linkTag.setAttribute('href', 'https://poemgenerator-ai.com/' + e + (e == '' ? '' : '/'))

    // const metaDescriptionTag = document.querySelector('meta[name="description"]');
    // if (metaDescriptionTag) {
    //     metaDescriptionTag.setAttribute('content', metaDescription);
    // } else {
    //     // 如果meta标签不存在，创建并添加
    //     const newMetaTag = document.createElement('meta');
    //     newMetaTag.name = 'description';
    //     newMetaTag.content = metaDescription;
    //     document.head.appendChild(newMetaTag);
    // }

}
const toggleMenu = (bol) => {
    mobileNav.value = bol
}

onMounted(async () => {
    setTimeout(() => {
        i18n.global.locale = route.params.language
        let to = route
    if(to.name=='poem' || to.name=='category'){
    const pageTitle = i18n.global.t('header_title'+'_'+to.name); // 使用i18n来获取多语言标题
    const metaDescription = i18n.global.t('Description'+'_'+to.name); // 使用i18n来获取多语言描述
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
    
  }else{
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
 
    }, 0)
    
   

})
watch(() => route.name, (newRoute, oldRoute) => {
    if (newRoute == 'generatedPoemId') {
        changeLocal.value = false;
    } else {
        changeLocal.value = true;
    }
})
watch(() => route.params.language, (newRoute, oldRoute) => {
    if (newRoute == 'vi') {
        document.getElementById('app').style.fontFamily = 'revert'
    } else {
        document.getElementById('app').style.fontFamily = 'other-font-family'
    }

})
</script>

<style scoped lang="scss">
.header {
    position: relative;
    height: 64px;
    display: flex;
    justify-content: space-between;
    z-index: 998;
    align-items: center;
    background-color: #fff;
    width: 100%;
    margin: 0 auto;
    // border-radius: 99px;

    .logoDiv {
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .tools {
        float: right;
        margin-right: 30px;
        display: flex;

        .language {
            padding: 2px 10px;
            border: 1px solid #ccc;
            border-radius: 20px;
            cursor: pointer;
        }

        .privacy,
        .Generated {
            display: flex;
            align-items: center;
            margin-right: 20px;
            margin-left: 20px;
            cursor: pointer;
        }

        .Generated {
            margin-right: 0;
        }
    }

}

.title {
    text-align: center;
    margin-top: 20px;
    ;
}

.logoTxt {
    font-family: 'logo-font-family', sans-serif;
    color: #1D2331;
    font-size: 24px;
    margin-left: 5px;

    .pp {
        font-family: 'logo-font-family', sans-serif;
        color: #7730D0
    }
}

.logo {
    width: 45px;
    height: 45px;
    margin-left: 20px;
    ;
}

.el-dropdown {
    vertical-align: baseline;
}

::v-deep .el-dropdown-menu__item {
    padding: 10px 15px !important;
}

.mobileMenu {
    display: none;
    position: absolute;
    left: 10px;

}

.hamburger-menu {
    display: none;
    cursor: pointer;
    padding: 10px;
}

.bar {
    width: 25px;
    height: 3px;
    background-color: #333;
    margin: 6px 0;
    transition: 0.4s;
}

.change .bar:nth-child(1) {
    transform: rotate(-45deg) translate(-5px, 6px);
}

.change .bar:nth-child(2) {
    opacity: 0;
}

.change .bar:nth-child(3) {
    transform: rotate(45deg) translate(-5px, -6px);
}

@media only screen and (max-width: 767px) {
    .tools {
        display: none !important;
    }

    .header {
        justify-content: center !important;
    }

    .mobileMenu {
        display: inline-block;
    }

}

.mobileMenuPop {
    position: absolute;
    top: 64px;
    left: 0;
    height: calc(100vh - 64px);
    width: 45vh;
    background-color: #fff;
    box-shadow: 2px 0px 8px 0px #0000001A;
    z-index: 9;

}
</style>