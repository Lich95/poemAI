<template>
    <div class="header">
        <div class="logoDiv">
            <img src="/public/logo.png" alt="" class="logo">
            <span class="logoTxt"><span class="pp">AI</span> Poem Generator</span>
        </div>
        <div class="tools">
            <div class="lanuage">
                <el-dropdown trigger="click" :hide-on-click="false" @command="changeLanuage">
                    <span class="el-dropdown-link">
                        {{_thisLanuage()}}
                    </span>
                    <template #dropdown>
                        <el-menu @select="handleSelect">
                            <el-menu-item v-for="item in dropMenuList" :index="item.event">
                            {{ item.text }}</el-menu-item>
                        </el-menu>
                    </template>
                    
                    </el-dropdown>
            </div>
        </div>
    </div>
    <div class="inputBox">
        <p class="title">{{ $t('title') }}</p>
        <p class="desc">{{ $t('description') }}</p>
        <div>
            <el-input v-model="inputStr" type="textarea" :placeholder="placeholderText" rows="5" resize="none" />
        </div>
        <div>
            <el-button class="handleBtn" @click="handleClick">
                <span v-if="!thinking" class="btnTxt">
                    {{ $t('btnText') }}
                    <el-icon>
                        <Right />
                    </el-icon>
                </span>
                <span v-else class="btnTxt">
                    {{ $t('btnThinking') }}...
                    <el-icon class="is-loading">
                        <Loading />
                    </el-icon>
                </span>

            </el-button>
        </div>
    </div>
    <div class="respBox" v-show="haveResp">
        <div class="title">
            {{ $t('contentTitle') }}
        </div>
        <div class="content" v-loading="respLoading">
            {{ respContent }}
        </div>
        <div class="copyBtn">
            <el-button size="small" class="copyButton" @click="handleCopy" data-clipboard-target=".content">{{ $t('copy')
            }}<el-icon>
                    <CopyDocument />
                </el-icon></el-button>
        </div>
    </div>

    <button @click="scrollToTop" class="toTopBtn" v-show="topBtnShow">
        <el-icon>
            <ArrowUpBold />
        </el-icon>
    </button>


    <div class='footer'>
        {{ $t('footer') }}
    </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { throttledApiRequest } from '@/api/index.js';
import ClipboardJS from 'clipboard';
import { ElMessage } from 'element-plus'
import { useRoute,useRouter } from 'vue-router';
import i18n from '@/hooks/i18n'
import { I18nInjectionKey } from "vue-i18n";
const { t } = i18n.global;
const inputStr = ref()
const respContent = ref()
const thinking = ref(false)
const haveResp = ref(false)
const router = useRouter()
const route = useRoute();
const respLoading = ref(false)
const topBtnShow = ref(false)
const placeholderText = ref('Merry Christmas')
const dropMenuList = [
    { event: 'en', text: 'English' },
    { event: 'fr', text: 'Français' },
    { event: 'ru', text: 'Русский' },
    { event: 'de', text: 'Italiano' },
    // { event: '2', text: 'español' },
    // { event: '2', text: 'Português' },
],
    selectedKeys = []
const handleClick = async () => {
    if (!thinking.value) {
        thinking.value = true;
        if (haveResp.value) {
            respLoading.value = true;
        }
        // http://poemgenerator-ai.com
        throttledApiRequest('/api', 'post', { "content": inputStr.value || placeholderText.value }).then(res => {
            let reg = /(Stanza \d)*/;
            respContent.value = res.data.replaceAll('(A)', '')
                .replaceAll('(B)', '')
                .replaceAll('(a)', '')
                .replaceAll('(b)', '')
                .replaceAll('Blank Line', '')
                .replace(/Stanza\s+\d+\s*-?[^]*?(\n|$)/g, '')
                .replace(/- Line \d+-[a-z]:/g, "")
                .replaceAll("- ", '')
            thinking.value = false;
            haveResp.value = true;
            respLoading.value = false;
        }).catch(err => {
            console.log(err)
            ElMessage({
                showClose: true,
                message: t('networkErr'),
                center: true,
                type: 'error',
                duration: 2000
            })
            thinking.value = false;
        })
    }

}

const _thisLanuage = ()=>{

    let language = route.params.language || 'en';
    return dropMenuList.find(x=>x.event==language).text
}
const handleCopy = () => {
    const clipboard = new ClipboardJS('.copyButton', {
        text() {
            return respContent.value
        }
    })
    clipboard.on('success', () => {
        ElMessage({
            showClose: true,
            message: t('cpoySuccess'),
            center: true,
            type: 'success'
        })
        clipboard.destroy();
    })
    clipboard.on('error', () => {
        ElMessage({
            showClose: true,
            message: t('cpoyFiled'),
            center: true,
            type: 'success'
        })
        clipboard.destroy();
    })

}
const changeLanuage = (e)=>{
    console.log(1,e)
}
const handleSelect = (e)=>{
    if(e=='en'){
        e=''
    }
    router.push({ name: 'Home', params: { language: e } });
   
    i18n.global.locale = e
}

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth', // 可以添加平滑滚动效果
    });
}

const handleScroll = () => {
    // 根据页面滚动位置判断是否显示置顶按钮test
    topBtnShow.value = window.scrollY > 100;
};

// 监听滚动事件
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    
    const language = route.params.language || 'en';

    i18n.global.locale = language
    // console.log('Language:', language);
});
// 在组件销毁前移除滚动事件监听
onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>
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
    .logoDiv{
        display: flex;
    align-items: center;
    }
    .tools {
        float: right;
    }
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


.inputBox {
    max-width: 634px;
    max-height: 424px;
    background-color: #fff;
    border-radius: 24px;
    padding: 1em;
    margin: 0 auto;
    margin-top: 25px;
    text-align: center;
    padding-bottom: 2em;
    ;

    p {
        margin: 0
    }

    ::v-deep .el-textarea__inner {
        background-color: #F6F7F5;
        color: #1D2331;
        font-size: 18px;
        padding: 10px 13px;

        &:focus {
            box-shadow: 0 0 0 1px #1D2331;
        }
    }

    .handleBtn {
        background-color: #5F26A6;
        color: #fff;
        width: 433px;
        height: 64px;
        border-radius: 48px;
        margin-top: 30px;
        font-size: 18px;

        .el-icon {
            margin-left: 10px;
        }

        .btnTxt {
            display: inline-flex;
        }
    }

    .title {
        font-size: 32px;
        font-weight: 600;
        color: #1D2331;
    }

    .desc {
        font-size: 18px;
        font-weight: 400;
        color: #6C7078;
        margin-bottom: 20px;
    }
}

.respBox {
    max-width: 634px;
    background-color: #fff;
    border-radius: 24px;
    padding: 1em;
    margin: 0 auto;
    margin-top: 25px;
    border: 1px solid #7730D0;
    color: #1d2331;

    .title {
        display: inline-flex;
        font-weight: bold;

        &::before {
            content: '';
            display: inline-block;
            width: 12px;
            height: 24px;
            border-radius: 4px;
            background: #7730D0;
            margin-right: 5px;
        }
    }

    .content {
        border-radius: 8px;
        background: #7730D01A;
        padding: 12px 20px;
        margin-top: 12px;
        white-space: pre-wrap;
        font-size: 18px;
    }

    .copyBtn {
        text-align: right;
        margin-top: 12px;
        ;

        .el-button {
            background: #7730D0;
            color: #fff;
            border-radius: 16px;
            padding: 7px 16px 7px 16px;
            font-size: 16px;
            height: 32px;

            .el-icon {
                margin-left: 5px;
            }
        }
    }
}


.footer {
    color: #A8AAA3;
    font-size: 14px;
    text-align: center;
    margin-top: 10px;
}

.toTopBtn {
    position: fixed;
    right: 30px;
    bottom: 20px;
    background-color: #fff;
    border: 1px solid #ccc;
    width: 50px;
    height: 35px;
    line-height: 40px;
    padding: 0;
    margin: 0;

    &:focus {
        outline: none;
    }

    color:#1d2331;
}



@media only screen and (max-width: 767px) {
    .handleBtn {
        width: 100% !important;
    }
}
</style>   
