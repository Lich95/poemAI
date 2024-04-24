<script setup>
import headerStyle from '@/views/header/index.vue'
</script>

<template>
  <div>
    <headerStyle></headerStyle>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
*:not(.content) {
  user-select: none;
}

.arRightType {
  float: right;
  text-align: right;

  &::before {
    right: 0;
  }
}
</style>
