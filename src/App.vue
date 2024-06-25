<script setup>
import headerStyle from '@/views/header/index.vue'
import AdSense from './components/AdSense.vue'
</script>

<template>
  <div>
    <headerStyle></headerStyle>
    <router-view></router-view>
    <AdSense class="ad-left" ad-slot="9524179685"/>
    <AdSense class="ad-right" ad-slot="9524179685"/>
    <AdSense class="ad-bottom" ad-slot="9520839519"/>
  </div>
</template>

<style lang="scss">
*:not(.content) {
  user-select: none;
}

.arRightType {
  float: right;
  text-align: right;
    padding-right: 20px;
  &::before {
    right: 0;
  }
}

.ad-left, .ad-right {
  width: 300px;
  height: 600px; /* 你可以根据需要调整宽度 */
  position: fixed;
  top: 80px; /* 使广告在页面滚动时保持在视口中 */
}
.ad-left {
  left:20px;
}
.ad-right {
  right:20px;
}
</style>
