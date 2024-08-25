<script setup>
import headerStyle from "@/views/header/index.vue";
import AdSense from "@/components/AdSense.vue";
import Home from '@/views/homePage/index.vue';
</script>

<template>
  <div>
    <Home />
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

</style>
