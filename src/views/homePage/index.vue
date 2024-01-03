<template>
    <!-- <TypewriterEffect class="title" :textContent="$t('title')" :speed="200" /> -->
    <div class="inputBox">


        <p class="title">{{ $t('poemai_input_title') }}</p>
        <p class="desc">{{ $t('poemai_input_subtitle') }}</p>


        <!-- <p class="secTitle">Poetry Style</p>
        <radioGroup :radioList="styleList" :checkRadio="checkObj.styleCheck" @changeCheck="changeStyle('style', $event)"></radioGroup>
-->
        <!-- <p class="secTitle">What the poem is about</p> -->
        <div>
            <el-input v-model="inputStr" type="textarea" :placeholder="$t('poemai_input_tips')" rows="5" resize="none" />
        </div>

        <!-- <p class="secTitle">Poetry Size</p>
        <radioGroup :radioList="sizeList" :checkRadio="checkObj.sizeCheck" @changeCheck="changeStyle('size', $event)"></radioGroup>
        <p class="secTitle">Poetry Language</p>
        <radioGroup :radioList="languageList" :checkRadio="checkObj.languageCheck" @changeCheck="changeStyle('language', $event)">
        </radioGroup> -->

        <div style="text-align:center">
            <el-button class="handleBtn" @click="handleClick">
                <span v-if="!thinking" class="btnTxt">
                    {{ $t('poemai_generate_btn') }}
                    <el-icon>
                        <Right />
                    </el-icon>
                </span>
                <span v-else class="btnTxt">
                    {{ $t('poemai_thinking_status') }}
                    <el-icon class="is-loading">
                        <Loading />
                    </el-icon>
                </span>

            </el-button>
        </div>
    </div>
    <div class="respBox" v-show="haveResp">
        <div class="title">
            {{ $t('poemai_generated_poem') }}
        </div>
        <div class="content" v-loading="respLoading">
            {{ respContent }}
        </div>
        <div class="copyBtn">
            <el-button size="small" class="copyButton" @click="handleCopy" data-clipboard-target=".content">{{
                $t('poemai_copy_btn')
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
        {{ $t('poemai_powered_by_gpt') }}
    </div>
</template>
<script setup>


import { ref, onMounted, onBeforeUnmount, } from "vue";
import { throttledApiRequest } from '@/api/index.js';
import ClipboardJS from 'clipboard';
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router';
import i18n from '@/hooks/i18n'
import TypewriterEffect from "@/components/TypewriterEffect/index.vue";
import radioGroup from "@/components/radioGroup/index.vue";
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
const defaultActive = ref()
const dropMenuList = [
    { event: 'en', text: 'English' },
    { event: 'fr', text: 'Français' },
    { event: 'ru', text: 'Русский' },
    { event: 'it', text: 'Italiano' },
    { event: 'de', text: 'Deutsch' },
    { event: 'es', text: 'español' },
    { event: 'pt', text: 'Português' },
],
    selectedKeys = [];


const styleList = [{ text: 'Free Verse', label: "poemai_freeverse" },
{ text: 'Haiku', label: "poemai_haiku" },
{ text: 'Acrostic', label: "poemai_acrostic" },
{ text: 'Sonnet', label: "poemai_sonnet" },
{ text: 'Limerick', label: "poemai_limerick" },
{ text: 'Love Poem', label: "poemai_lovepoem" },
];
const sizeList = [{ text: 'Short', label: "short" },
{ text: 'Medium', label: "medium" },
{ text: 'Large', label: "large" },
];
const languageList = dropMenuList.map(x => {
    x.label = x.event
    return x
})
const checkObj = ref({
    styleCheck: 'poemai_freeverse',
    sizeCheck: 'short',
    languageCheck: 'en'
})



const handleClick = async () => {
    if (!thinking.value) {
        thinking.value = true;
        if (haveResp.value) {
            respLoading.value = true;
        }
        if (!navigator.onLine) {
            ElMessage({
                showClose: true,
                message: t('poemai_network_err_toast'),
                center: true,
                type: 'error',
                duration: 2000
            })
        }
        // http://poemgenerator-ai.com
        throttledApiRequest('http://poemgenerator-ai.com/api', 'post', { "content": inputStr.value || t('poemai_input_tips') }).then(res => {
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
        }).catch(error => {
            if (error instanceof SyntaxError) {
                console.error('语法错误:', error);
                ElMessage({
                    showClose: true,
                    message: t('poemai_generated_failed_toast'),
                    center: true,
                    type: 'error',
                    duration: 2000
                })
            } else if (error.response && error.response.status >= 500) {
                ElMessage({
                    showClose: true,
                    message: t('poemai_server_err_toast'),
                    center: true,
                    type: 'error',
                    duration: 2000
                })
            } else {
                console.error('其他错误:', error);
                ElMessage({
                    showClose: true,
                    message: t('poemai_generated_failed_toast'),
                    center: true,
                    type: 'error',
                    duration: 2000
                })
            }

            thinking.value = false;
        })
    }

}

const _thislanguage = () => {

    let language = route.params.language || 'en';
    return dropMenuList.find(x => x.event == language).text
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
            message: t('poemai_copy_success_toast'),
            center: true,
            type: 'success'
        })
        clipboard.destroy();
    })
    clipboard.on('error', () => {
        ElMessage({
            showClose: true,
            message: 'error',
            center: true,
            type: 'success'
        })
        clipboard.destroy();
    })

}
const handleSelect = (e) => {
    if (e == 'en') {
        e = ''
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

const changeStyle = (type, newV) => {
    checkObj.value[type + 'Check'] = newV
    console.log(checkObj.value);
}
// 监听滚动事件
onMounted(() => {
    window.addEventListener('scroll', handleScroll);

    const language = route.params.language || 'en';
    defaultActive.value = language
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

    .logoDiv {
        display: flex;
        align-items: center;
    }

    .tools {
        float: right;
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


.inputBox {
    max-width: 634px;
    background-color: #fff;
    border-radius: 24px;
    padding: 1em;
    margin: 0 auto;
    margin-top: 25px;
    text-align: left;
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
        text-align: center;
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

.el-dropdown {
    vertical-align: baseline;
    margin-right: 20px
}

@media only screen and (max-width: 767px) {
    .handleBtn {
        width: 100% !important;
    }
}



.secTitle {
    text-align: left;
    ;
}
</style>   
