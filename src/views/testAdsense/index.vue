<script setup>
import headerStyle from "@/views/header/index.vue";
import AdSense from "@/components/AdSense.vue";
import Home from '@/views/homePage/index.vue';
</script>

<template>
  <div>
    <Home/>
    <AdSense class="ad-left" ad-slot="9524179685" />
    <AdSense class="ad-right" ad-slot="9524179685" />
    <AdSense class="ad-bottom" ad-slot="9520839519" />
    <AdSense class="ad-bottom-mobile" ad-slot="7827954630" />
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

.ad-left,
.ad-right {
  width: 280px;
  height: 600px; /* 你可以根据需要调整宽度 */
  position: fixed;
  top: 80px; /* 使广告在页面滚动时保持在视口中 */
}
.ad-left {
  left: 10px;
}
.ad-right {
  right: 10px;
}
.ad-bottom-mobile{
  position: fixed;
  bottom: 0;
  width: 100%;
  display: none;
}

@media only screen and (max-width: 767px) {
  .ad-left,
  .ad-right,
  .ad-bottom {
    display: none;
  }
  .ad-bottom-mobile{
    display: block;
  }
}
</style>
