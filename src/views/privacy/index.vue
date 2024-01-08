<template>
    <div  style="padding:1em;padding-top: 64px;">

        <div v-html="$t('privacyContent')"></div>
        
        <button @click="scrollToTop" class="toTopBtn" v-show="topBtnShow">
            <el-icon>
                <ArrowUpBold />
            </el-icon>
        </button>
    </div>
</template>
<script setup>

import { ref, onMounted, onBeforeUnmount, watch } from "vue";
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

});
// 在组件销毁前移除滚动事件监听
onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
});


</script>
<style scoped lang="scss">

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

</style>   
