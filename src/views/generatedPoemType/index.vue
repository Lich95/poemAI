<template>
    <div style="padding:1em;padding-top: 20px;">
        <p class="typeTitle">
            <span class="numbers"> {{ typeNums }} </span>
            &nbsp;
            <span class="typeName"> {{ route.params.GeneratedPoemType }}</span>
        </p>

        <div class="wfdiv">

            <waterfall class="wfDv" :waterfallList="waterfallList" v-if="waterfallList.length"></waterfall>
            <el-pagination background layout="prev, pager, next" style="margin:40px 0;justify-content: center;"
                v-model:current-page="currentPage" :page-size="pageSize" :total="totals"
                @current-change="handleCurrentChange" />
        </div>


    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import i18n from '@/hooks/i18n'
import { useRoute, useRouter } from 'vue-router';
import waterfall from "@/components/waterfall/index.vue";
import { throttledApiRequest } from '@/api/index.js';
const router = useRouter()
const route = useRoute();
const currentPage = ref(1)
const totals = ref(100)
const pageSize = ref(20)
const waterfallList = ref([])
const typeNums = ref(0)

const handleCurrentChange = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth', // 可以添加平滑滚动效果
    });
    throttledApiRequest('/api/v1/demo', 'post', { "language": i18n.global.locale ? i18n.global.locale : 'en', nums: pageSize.value, pages: currentPage.value, type: route.params.GeneratedPoemType }).then(res => {
        waterfallList.value = JSON.parse(res.data.data).data
        typeNums.value = JSON.parse(res.data.data).count
        totals.value = JSON.parse(res.data.data).count
    })
}
onMounted(() => {
    setTimeout(() => {
        throttledApiRequest('/api/v1/demo', 'post', { "language": i18n.global.locale ? i18n.global.locale : 'en', type: route.params.GeneratedPoemType, nums: pageSize.value, pages: currentPage.value }).then(res => {
            waterfallList.value = JSON.parse(res.data.data).data
            typeNums.value = JSON.parse(res.data.data).count
            totals.value = JSON.parse(res.data.data).count

            let beforeTitle = document.title.replace('%s1', totals.value).replace('%s2', route.params.GeneratedPoemType)
            const metaDescriptionTag = document.querySelector('meta[name="description"]');
            let befroreDescp = metaDescriptionTag.getAttribute('content').replace('%s1', totals.value).replace('%s2', route.params.GeneratedPoemType)

            document.title = beforeTitle;
            metaDescriptionTag.setAttribute('content', befroreDescp);

        })


    }, 0);
})

</script>
<style scoped lang="scss">
.typeTitle {
    text-align: center;
    color: #1D2331;
    margin: 35px 0 30px;
    font-size: 22px;
    font-weight: 700;
    line-height: 30px;
    font-weight: 700;
    color: #1D2331;

    .numbers {
        color: #7730D0;
    }
}

.wfdiv {
    display: grid;
    justify-content: center;
}


@media only screen and (max-width: 767px) {

    .wfdiv {
        display: block;
    }
}
</style>