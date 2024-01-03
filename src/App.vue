<script setup>

import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from 'vue-router';
import i18n from '@/hooks/i18n'
const router = useRouter()
const route = useRoute();
const dropMenuList = [
    { event: 'en', text: 'English' },
    { event: 'fr', text: 'Français' },
    { event: 'ru', text: 'Русский' },
    { event: 'ita', text: 'Italiano' },
    { event: 'de', text: 'Deutsch' },
    { event: 'ep', text: 'español' },
    { event: 'pt', text: 'Português' },
],
    selectedKeys = [];

const languageList = dropMenuList.map(x => {
    x.label = x.event
    return x
})

const _thislanguage = () => {

    let language = route.params.language || 'en';
    return dropMenuList.find(x => x.event == language).text
}

const handleSelect = (e) => {
    if (e == 'en') {
        e = ''
    }
    router.push({ name: 'Home', params: { language: e } });

    i18n.global.locale = e
}


</script>

<template>
  <div>
    <div class="header">
        <div class="logoDiv">
            <img src="/public/logo.png" alt="" class="logo">
            <h1 class="logoTxt"><span class="pp">AI</span> Poem Generator</h1>
        </div>
        <div class="tools">
          <!-- <div class="privacy">
            <img src="@/assets/icon/privacy_icon.png" alt="">
            <span>Privacy</span>
          </div> -->
            <div class="language">
                <el-dropdown trigger="click" :hide-on-click="true">
                    <span class="el-dropdown-link">
                        {{ _thislanguage() }}
                        
                        <el-icon><ArrowDownBold  style="padding-left: 4px;"/></el-icon>
                    </span>
                    <template #dropdown>
                        <el-menu @select="handleSelect" :default-active="defaultActive">
                            <el-menu-item v-for="item in dropMenuList" :index="item.event">
                                {{ item.text }}</el-menu-item>
                        </el-menu>
                    </template>

                </el-dropdown>
            </div>
        </div>
    </div>

  <router-view></router-view>
</div>
</template>

<style scoped lang="scss">
* {
    font-family: Arial, sans-serif;
}

.header {
    height: 64px;
    display: flex;
    justify-content: space-between;

    align-items: center;
    background-color: #fff;
    width: 98%;
    margin: 0 auto;
    border-radius: 99px;

    .logoDiv {
        display: flex;
        align-items: center;
    }

    .tools {
        float: right;
        margin-right:30px;
        display: flex;
        .language{
          padding:2px 10px;
          border:1px solid #ccc;
          border-radius: 20px;
        }
        .privacy{
        display: flex;
    align-items: center;

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

</style>   
<style>

*:not(.content) {
    user-select: none;
}</style>
