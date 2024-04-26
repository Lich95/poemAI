<template>
    <div style="text-align: center;" class="alb">
        <div class="title">{{ $t('poemai_all_categories') }}</div>
        <div class="types">
            <div v-for="item in types" @click="goTypes(item)">
                <span class="typeName">{{ item.name }}</span>
                <span class="numbers">{{item.count}}</span>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref,onMounted } from "vue";
import { useRouter } from 'vue-router';
import i18n from '@/hooks/i18n'
import { throttledApiRequest } from '@/api/index.js';
const router = useRouter()
const types = ref([])

const goTypes = (type) => {
    // 
    router.push({ name: 'generatedPoemType', params: { language: i18n.global.locale || 'en', GeneratedPoemType: type.name } });
}

onMounted(() => {
    setTimeout(() => {
        throttledApiRequest('http://poemgenerator-ai.com:8093/api/v1/category_by_lang', 'post', { "language": i18n.global.locale ? i18n.global.locale : 'en' }).then(res => {
            types.value = JSON.parse(res.data.data)
            console.log(types.value);
        })
    }, 0);
})

</script>
<style scoped lang="scss">
.alb {
    // width: 1240px;
    padding:20px 4em 0;
    margin: 0 auto;
}

.title {
    margin: 50px 0 20px;
    font-size: 26px;
    font-weight: 700;
    line-height: 36px;
}

.types {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-between;

    &>div {
        cursor: pointer;
        width: 28%;
        background-color: #fff;
        height: 34px;
        line-height: 34px;
        color: #6C7078;
        box-shadow: 0px 4px 12px 0px #0000000D;
        padding: 12px 24px 12px 24px;
        border-radius: 8px;
        text-align: left;

        &>span:last-child {
            float: right;
        }

        .typeName {
            color: #6C7078;
            font-weight: 500;
        }

        .numbers {
            color: #7730D0;
            font-weight: 500;
        }
    }

}


@media only screen and (max-width: 767px) {
    .alb {
        padding:20px 1em 0;
    }
    .types {
        &>div{
            width: 80%;
    margin: 0 auto;
        }
    }

}
</style>