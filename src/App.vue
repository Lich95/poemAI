<script setup>
import headerStyle from '@/views/header/index.vue'
</script>

<template>
  <div>
    <headerStyle></headerStyle>
    <router-view></router-view>
  </div>
</template>

<style>
*:not(.content) {
  user-select: none;
}
</style>
