<template>
    <div>
        <p class="typeTitle">
            {{ route.params.GeneratedPoemType }}
        </p>

        <div style="margin:0 auto;width:1200px;text-align: center">

            <waterfall class="wfDv"></waterfall>
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
}
</style>