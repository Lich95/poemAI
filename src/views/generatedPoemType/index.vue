<template>
    <div style="padding:1em;padding-top: 20px;">
        <p class="typeTitle">
            <span class="numbers">12412 </span>
            <span class="typeName"> {{ route.params.GeneratedPoemType }}</span>
        </p>

        <div class="wfdiv">

            <waterfall class="wfDv"></waterfall>
            <el-pagination background layout="prev, pager, next" :total="1000" style="margin:40px 0;justify-content: center;"/>
        </div>

        
    </div>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';
import waterfall from "@/components/waterfall/index.vue";
const router = useRouter()
const route = useRoute();


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
    color:#1D2331;

    .numbers{
        color:#7730D0;
    }
}
.wfdiv{
    display: grid;
    justify-content: center;
}


@media only screen and (max-width: 767px) {
    
.wfdiv{
    display: block;}
}
</style>