<template>
    <div style="    padding: 0 1em;">
        <div style="margin:20px 0 30px">
            <div class="respBox" v-show="true" ref="respBox">
                <div class="title">
                    {{ $t('poemai_generated_poem') }}
                </div>
                <div class="content" v-loading="respLoading">
                    {{ respTxt }}
                </div>
                <div class="copyBtn">
                    <el-button size="small" class="copyButton" @click="handleCopy" data-clipboard-target=".content">{{
                $t('poemai_copy_btn')
            }}<el-icon>
                            <CopyDocument />
                        </el-icon></el-button>
                </div>
            </div>

        </div>
        <div style="margin:0 auto;text-align: center">
            <p>{{ $t('poemai_related_poem') }}</p>
            <waterfall class="wfDv" :waterfallList="waterfallList" v-if="waterfallList.length"></waterfall>
        </div>
    </div>
</template>
<script setup>
import waterfall from "@/components/waterfall/index.vue";
import { ref, onMounted, watch } from "vue";
import ClipboardJS from 'clipboard';
import { ElMessage } from 'element-plus'
import i18n from '@/hooks/i18n'
import { useRoute } from 'vue-router';
import { throttledApiRequest } from '@/api/index.js';
const route = useRoute();
const { t } = i18n.global;
const waterfallList = ref([])




const initMethods = () => {
    throttledApiRequest('/api/v1/demo', 'post', { "language": i18n.global.locale ? i18n.global.locale : 'en', type: route.params.GeneratedPoemType, nums: 3, pages: 1 }).then(res => {
        waterfallList.value = JSON.parse(res.data.data).data
    })

    throttledApiRequest('/api/v1/detail_by_id', 'post', { "id": route.params.id }).then(res => {
        respTxt.value = JSON.parse(res.data.data).poem_info.poemContent



        let titleNow = JSON.parse(res.data.data).poem_info.poemTheme.indexOf('\"keyword\":') > -1 ? JSON.parse(JSON.parse(res.data.data).poem_info.poemTheme).content : JSON.parse(res.data.data).poem_info.poemTheme

        
        let beforeTitle = document.title.replace('%s', titleNow)
        const metaDescriptionTag = document.querySelector('meta[name="description"]');
        let befroreDescp = metaDescriptionTag.getAttribute('content').replace('%s1', JSON.parse(res.data.data).poem_info.typeName).replace('%s2', JSON.parse(res.data.data).poem_info.poemContent)

        document.title = beforeTitle;
        metaDescriptionTag.setAttribute('content', befroreDescp);


    })


}
watch(
    () => route.params.id,
    (newVal, oldVal) => {
        initMethods()
    },
    { immediate: true }
);

let respTxt = ref(` In summer's heat, I find no solace
                    A time for sun and fun, it's all a facade
                    The warmth that's supposed to bring us joy
                    Only brings me chills, and makes me annoyed

                    The days are long, the nights are short
                    I crave the coolness of the morning dew
                    But even then, the sun rises high
                    And steals away my peaceful mood anew

                    The world is bright, but not so warm
                    I yearn for shade, where I can rest
                    From the harsh rays that burn like storms
                    And make my heart feel oppressed

                    Oh, how I wish for autumn's breeze
                    To bring some relief from summer's sway
                    When leaves will fall, and skies will gray
                    And bring back balance to each day`)


const handleCopy = () => {
    // const clipboard = new ClipboardJS('.copyButton', {
    //     text() {
    //         return respTxt.value
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
    // clipboard.on('error', () => {
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
    textArea.value = respTxt.value

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

onMounted(() => {
    setTimeout(() => {
        initMethods()
    }, 0);
})


</script>
<style scoped lang="scss">
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
        display: block;
        font-weight: bold;
        text-align: center;
        color: #1D2331;
        font-weight: 700;
        font-size: 20px;
        line-height: 24px;
        // &::before {
        //     content: '';
        //     display: inline-block;
        //     width: 12px;
        //     height: 24px;
        //     border-radius: 4px;
        //     background: #7730D0;
        //     margin-right: 5px;
        // }
    }

    .content {
        text-align: center;
        border-radius: 8px;
        background: #7730D01A;
        padding: 12px 20px;
        margin-top: 12px;
        white-space: pre-wrap;
        font-size: 18px;
        color: #1D2331;
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
</style>