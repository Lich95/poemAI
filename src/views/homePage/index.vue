<template>
    <div style="padding:1em;padding-top: 20px;">
        <div style="text-align: center;">
            <h2 class="h2Title" :class="i18n.global.locale">{{ $t('poemai_title_generate') }}</h2>
            <!-- {{ $t('poemai_title_generate') }} -->
            <TypewriterEffect class="title" :textContent="$t('poem_carousel_word')" :speed="140" :delay="5" />

            <radioGroup :radioList="styleList" :checkRadio="checkObj.styleCheck"
                @changeCheck="changeStyle('style', $event)"></radioGroup>
        </div>
        <div class="inputBox">
            <div v-show="checkObj.styleCheck == 'acrostic'">
                <p class="secTitle" :class="{'arRightType':arType}">{{ $t('poemai_acrostic_keyword') }}</p>
                <div>
                    <el-input v-model="inputStrA" type="textarea" :placeholder="$t('poemai_acrostic_kw_input_tips')"
                        rows="1" resize="none" />
                    <!-- resize="none"  -->
                </div>
            </div>

            <div v-if="checkObj.styleCheck == 'freeverse'">
                <p class="secTitle" :class="{'arRightType':arType}">{{ $t('poemai_fv_theme') }}</p>
                <div>
                    <el-input v-model="inputStr1" type="textarea" :placeholder="$t('poemai_input_tips')" rows="5"
                        resize="none" />
                    <!-- resize="none"  -->
                </div>
            </div>
            <div v-else-if="checkObj.styleCheck == 'haiku'">
                <p class="secTitle" :class="{'arRightType':arType}">{{ $t('poemai_haiku_theme') }}</p>
                <div>
                    <el-input v-model="inputStr2" type="textarea" :placeholder="$t('poemai_haiku_input_tips')" rows="5"
                        resize="none" />
                    <!-- resize="none"  -->
                </div>
            </div>
            <div v-else-if="checkObj.styleCheck == 'acrostic'">
                <p class="secTitle" :class="{'arRightType':arType}">{{ $t('poemai_acrostic_theme') }}</p>
                <div>
                    <el-input v-model="inputStr3" type="textarea" :placeholder="$t('poemai_acrostic_input_tips')"
                        rows="5" resize="none" />
                    <!-- resize="none"  -->
                </div>
            </div>
            <div v-else-if="checkObj.styleCheck == 'sonnet'">
                <p class="secTitle" :class="{'arRightType':arType}">{{ $t('poemai_sonnet_theme') }}</p>
                <div>
                    <el-input v-model="inputStr4" type="textarea" :placeholder="$t('poemai_sonnet_input_tips')" rows="5"
                        resize="none" />
                    <!-- resize="none"  -->
                </div>
            </div>
            <div v-else-if="checkObj.styleCheck == 'limerick'">
                <p class="secTitle" :class="{'arRightType':arType}">{{ $t('poemai_limerick_theme') }}</p>
                <div>
                    <el-input v-model="inputStr5" type="textarea" :placeholder="$t('poemai_limerick_input_tips')"
                        rows="5" resize="none" />
                    <!-- resize="none"  -->
                </div>
            </div>
            <div v-else-if="checkObj.styleCheck == 'lovepoem'">
                <p class="secTitle" :class="{'arRightType':arType}">{{ $t('poemai_love_theme') }}</p>
                <div>
                    <el-input v-model="inputStr6" type="textarea" :placeholder="$t('poemai_love_input_tips')" rows="5"
                        resize="none" />
                    <!-- resize="none"  -->
                </div>
            </div>

            <el-select v-model="checkObj.sizeCheck" placeholder="Poem Size" class="sizeSelect"
                v-show="checkObj.styleCheck == 'freeverse' || checkObj.styleCheck == 'lovepoem'"
                :class="{'arRightType':arType}">
                <el-option v-for="item in sizes" :key="item.val" :label="$t(item.label)" :value="item.val"></el-option>
            </el-select>
            <el-select v-model="checkObj.languageCheck" placeholder="Poem Language"
                v-show="checkObj.styleCheck != 'acrostic'" :class="{'arRightType':arType}">
                <el-option v-for="item in dropMenuList" :key="item.event" :value="item.event"
                    :label="item.text"></el-option>

            </el-select>


            <div style="text-align:center;clear: both;">
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
        <div class="respBox" v-show="haveResp" ref="respBox">
            <div class="title" :class="{'fkAr':arType}">
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

        <AdSense ad-slot="1778579273" class="adsenseInPage"/>
<!-- 
        <div style="text-align: center;margin: 30px 0 20px;font-size: 22px;font-weight:700 ;">{{ $t('poemai_latest_poems') }}</div> -->
        <!-- <waterfall class="wfDv" :waterfallList="waterfallList" v-if="waterfallList.length"></waterfall> -->
        <!-- <el-button
            style="width:422px;position: relative;left: calc(50% - 211px);margin-top: 20px;font-size:12pt;border-radius: 15px;"
            @click="goviewAll">{{ $t('poemai_view_all') }}</el-button> -->

        <quesAndAnsw style="margin-top: 50px;"></quesAndAnsw>

        <div class='footer'>
            {{ $t('poemai_powered_by_gpt') }}
        </div>
        <button @click="scrollToTop" class="toTopBtn" v-show="topBtnShow">
            <el-icon>
                <ArrowUpBold />
            </el-icon>
        </button>
    </div>
</template>
<script setup>

import AdSense from '@/components/AdSense.vue'

import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { throttledApiRequest } from '@/api/index.js';
import ClipboardJS from 'clipboard';
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router';
import i18n from '@/hooks/i18n'
import TypewriterEffect from "@/components/TypewriterEffect/index.vue";
import radioGroup from "@/components/radioGroup/index.vue";
import waterfall from "@/components/waterfall/index.vue";
import { I18nInjectionKey } from "vue-i18n";
import quesAndAnsw from '@/views/questionAndAnswer/index.vue'
const { t } = i18n.global;
const inputStrA = ref()
const inputStr1 = ref()
const inputStr2 = ref()
const inputStr3 = ref()
const inputStr4 = ref()
const inputStr5 = ref()
const inputStr6 = ref()
const respContent = ref()
const thinking = ref(false)
const haveResp = ref(false)
const router = useRouter()
const route = useRoute();
const respLoading = ref(false)
const topBtnShow = ref(false)
const waterfallList = ref([])
const arType = ref(false)

const goviewAll = () => {

    router.push({ name: 'poem', params: { language: i18n.global.locale || 'en' } });
}
const sizes = ref([
    { val: 'Medium', label: 'poem_size_m' },
    { val: 'Short', label: 'poem_size_s' },
    { val: 'Large', label: 'poem_size_l' },
])

const respBox = ref()

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
    { event: 'vi', text: 'Türk Dili' },
    { event: 'ar', text: ' عربي' },
    // { event: 'rt', text: 'Malay' },
],
    selectedKeys = [];
const languages = ['en', 'fr', 'ru', 'it', 'de', 'es', 'pt']

import free_verseImg from "@/assets/icon/free_verse.png";
import haikuImg from "@/assets/icon/haiku.png";
import acrosticImg from "@/assets/icon/acrostic.png";
import sonnetImg from "@/assets/icon/sonnet.png";
import limerickImg from "@/assets/icon/limerick.png";
import love_poemImg from "@/assets/icon/love_poem.png";

const styleList = ref([{ text: 'poemai_free_verse', label: "freeverse", img: free_verseImg },
{ text: 'poemai_haiku', label: "haiku", img: haikuImg },
{ text: 'poemai_acrostic', label: "acrostic", img: acrosticImg },
{ text: 'poemai_sonnet', label: "sonnet", img: sonnetImg },
{ text: 'poemai_limerick', label: "limerick", img: limerickImg },
{ text: 'poemai_love_poem', label: "lovepoem", img: love_poemImg },
]);



const sizeList = [{ text: 'short', label: "short" },
{ text: 'mMedium', label: "medium" },
{ text: 'large', label: "large" },
];
const languageList = dropMenuList.map(x => {
    x.label = x.event
    return x
})
const checkObj = ref({
    styleCheck: 'freeverse',
    sizeCheck: 'Short',
    languageCheck: ''
})


const loadDemo = () => {
    throttledApiRequest('/api/v1/demo', 'post', { "language": i18n.global.locale ? i18n.global.locale : 'en', nums: 3 }).then(res => {
        waterfallList.value = JSON.parse(res.data.data).data
    })

}

const handleClick = async () => {
    // return;
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
        let language = '';
        if (route.params.language == 'it') {
            language = 'ita'
        } else if (route.params.language == 'pt') {
            language = 'por'
        } else {
            language = route.params.language || 'en'
        }
        let placeholderText = '', inputStr = '', content = "";



        if (checkObj.value.styleCheck == 'freeverse') {
            inputStr = inputStr1.value
            placeholderText = t('poemai_input_tips')
        } else if (checkObj.value.styleCheck == 'haiku') {
            inputStr = inputStr2.value
            placeholderText = t('poemai_haiku_input_tips')
        } else if (checkObj.value.styleCheck == 'acrostic') {
            inputStr = JSON.stringify({ keyword: inputStrA.value || t('poemai_acrostic_kw_input_tips'), content: inputStr3.value || t('poemai_acrostic_input_tips') })
            placeholderText = t('poemai_acrostic_input_tips')
        } else if (checkObj.value.styleCheck == 'sonnet') {
            inputStr = inputStr4.value
            placeholderText = t('poemai_sonnet_input_tips')
        } else if (checkObj.value.styleCheck == 'limerick') {
            inputStr = inputStr5.value
            placeholderText = t('poemai_limerick_input_tips')
        } else if (checkObj.value.styleCheck == 'lovepoem') {
            inputStr = inputStr6.value
            placeholderText = t('poemai_lovepoem_input_tips')
        }


        // http://poemgenerator-ai.com
        throttledApiRequest(' /api/v1', 'post', { "theme": checkObj.value.styleCheck, "content": inputStr || placeholderText, size: checkObj.value.sizeCheck, language: checkObj.value.languageCheck }).then(res => {
            res = res.data
            if (res.retCode == 'C0000') {
                respContent.value = res.data.replaceAll('(A)', '')
                    .replaceAll('(B)', '')
                    .replaceAll('(a)', '')
                    .replaceAll('(b)', '')
                    .replaceAll('Blank Line', '')
                    .replace(/Stanza\s+\d+\s*-?[^]*?(\n|$)/g, '')
                    .replace(/- Line \d+-[a-z]:/g, "")
                    .replaceAll("- ", '')

                haveResp.value = true;
                respLoading.value = false;

                setTimeout(() => {

                    respBox.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }, 100);

            } else if (res.retCode == 'C001') {
                ElMessage({
                    showClose: true,
                    message: t('poemai_server_err_toast'),
                    center: true,
                    type: 'error',
                    duration: 2000
                })
            } else if (res.retCode == 'C002' || res.retCode == 'C004') {
                console.error('其他错误:参数缺失|解析失败');
                ElMessage({
                    showClose: true,
                    message: t('poemai_generated_failed_toast'),
                    center: true,
                    type: 'error',
                    duration: 2000
                })
            }
            thinking.value = false;

        }).catch(error => {
            console.error('其他错误:', error);
            ElMessage({
                showClose: true,
                message: t('poemai_generated_failed_toast'),
                center: true,
                type: 'error',
                duration: 2000
            })

            thinking.value = false;
        })
    }

}

const _thislanguage = () => {
    let language = route.params.language || 'en';
    return dropMenuList.find(x => x.event == language).text
}
const handleCopy = () => {
    // const clipboard = new ClipboardJS('.copyButton', {
    //     text() {
    //         return respContent.value
    //     }
    // })
    // clipboard.on('success', () => {
    //     ElMessage({
    //         showClose: true,
    //         message: t('poemai_copy_success_toast'),
    //         center: true,
    //         type: 'success'
    //     })
    //     clipboard.destroy();
    // })
    // clipboard.on('error', () =>/api/v1 {
    //     ElMessage({
    //         showClose: true,
    //         message: 'error',
    //         center: true,
    //         type: 'success'
    //     })
    //     clipboard.destroy();
    // })




    const textArea = document.createElement("textarea");
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.value = respContent.value;

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        ElMessage({
            showClose: true,
            message: t('poemai_copy_success_toast'),
            center: true,
            type: 'success'
        })
    } catch (err) {
        ElMessage({
            showClose: true,
            message: 'error',
            center: true,
            type: 'success'
        })
    }

    document.body.removeChild(textArea);

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
    setTimeout(() => {
        checkObj.value.languageCheck = i18n.global.locale ? i18n.global.locale : 'en'
        if (i18n.global.locale == 'ar') {
            arType.value = true;
            var htmlElement = document.getElementsByTagName('html')[0];
            // 修改样式
            htmlElement.style.direction = 'rtl';
        } else {
            arType.value = false

            var htmlElement = document.getElementsByTagName('html')[0];
            // 修改样式
            htmlElement.style.direction = '';
        }
        loadDemo();
    }, 0)

    // const language = navigator.language.split('-')[0];
    // i18n.global.locale =languages.includes(language)?language:'en'

});
// 在组件销毁前移除滚动事件监听
onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
});
watch(() => route.params.language, (newRoute, oldRoute) => {
    // Perform actions when the route changes
    checkObj.value.languageCheck = newRoute ? newRoute : 'en'
        checkObj.value.styleCheck='freeverse'
    // if(newRoute=='ja'||newRoute==''){
    // }
    waterfallList.value = [];
    throttledApiRequest('/api/v1/demo', 'post', { "language":newRoute ? newRoute : 'en', nums: 3 }).then(res => {
        console.log('change');
        waterfallList.value = JSON.parse(res.data.data).data
        console.log(waterfallList.value);
    })
    if (newRoute == 'ar') {
        arType.value = true;
    } else {
        arType.value = false
    }

})

</script>
<style scoped lang="scss">
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
    // margin-top: 20px;
    margin: 0 0 20px;

    color: #FF7FA0;
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
    max-width: 760px;
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
        background-color: #fff;
        color: #1D2331;
        font-size: 18px;
        padding: 10px 13px;

        &:focus {
            box-shadow: 0 0 0 1px #1D2331;
        }

        margin: 10px 0;
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

.h2Title {
    padding-top: 20px;
    font-size: 44px;
    color: #1D2331;
    margin: 0;
    font-family: 'other-bold-font-family';
}

.respBox {
    max-width: 760px;
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
        text-align: center;
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
    margin-bottom: 20px;
    ;
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



.secTitle {

    color: #1D2331;
    text-align: left;
    font-size: 18px;
    font-family: 'other-bold-font-family';
    margin: 0 0 5px !important;
    position: relative;
    padding-left: 18px;

    &::before {
        content: "";
        height: 100%;
        width: 12px;
        /* 定义竖条的宽度 */
        background-color: #7730D0;
        /* 定义竖条的颜色 */
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 4px;
    }
}

.el-select {
    margin-right: 15px;
}


@media only screen and (max-width: 767px) {
    .handleBtn {
        width: 100% !important;
    }

    .inputBox .desc {
        font-size: 14px;
        ;
    }

    .inputBox .title {
        font-size: 24px;
        ;
    }

    .respBox .content {
        font-size: 14px;
        line-height: 20px;
    }

    .sizeSelect {
        margin-bottom: 10px;
    }

}

.fkAr::before{
    margin-left: 10px;
}
</style>

<style>
.wfDv {
    /* width: 1240px; */
    /* gap: 25px; */
    text-align: center;
    /* display: flex;
    padding: 0 4em;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between; */
}

@media only screen and (max-width: 767px) {


    .wfDv {
        padding: 0;
        flex-direction: column !important;
        width: 100%;
    }
}
</style>