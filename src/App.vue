<script setup>import headerStyle from "@/views/header/index.vue";
import AdSense from "./components/AdSense.vue";
import { onMounted, onBeforeUnmount ,ref} from 'vue';


const googletag = ref(null);
onMounted(async () => {
  try {
    await loadGPTScript();
    if (googletag.value && googletag.value.queryIds) {
      googletag.value.queryIds.push(() => {
        googletag.value.pubads().enableSingleRequest();
        googletag.value.enableServices();
      });
    } else {
      console.error('googletag or queryIds not properly initialized');
    }
  } catch (error) {
    console.error('Error loading GPT script:', error);
  }

  handleVisibilityChange()
});

const loadGPTScript = () => {
  return new Promise((resolve, reject) => {
    if (!window.googletag) {
      window.googletag = { queryIds: [] };
      const script = document.createElement("script");
      script.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
      script.async = true;
      script.onload = () => {
        googletag.value = window.googletag;
        resolve();
      };
      script.onerror = (error) => reject(error);
      document.head.appendChild(script);
    } else {
      googletag.value = window.googletag;
      resolve();
    }
  });
};
const refreshAds = () => {
  if (googletag.value && googletag.value.queryIds) {
    googletag.value.queryIds.push(() => {
      googletag.value.pubads().refresh();
    });
  } else {
    console.error('googletag or queryIds not properly initialized');
  }
};
const handleVisibilityChange = () => {
  const intervalId = setInterval(() => {
    if (document.visibilityState === 'visible' && googletag.value) {
      refreshAds()
    }
  }, 60000);

  onBeforeUnmount(() => {
    clearInterval(intervalId);
  });
};
</script>

<template>
  <div>
    <headerStyle></headerStyle>
    <router-view></router-view>
    <AdSense class="ad-left" ad-slot="9524179685" />
    <AdSense class="ad-right" ad-slot="9524179685" />
    <!-- <AdSense class="ad-bottom" ad-slot="9520839519" /> -->
    <!-- <AdSense class="ad-bottom-mobile" ad-slot="7827954630" /> -->
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
  /* 你可以根据需要调整宽度 */
  position: fixed;
  top: 80px;
  /* 使广告在页面滚动时保持在视口中 */
}

.ad-left {
  left: 10px;
}

.ad-right {
  right: 10px;
}
// .ad-bottom-mobile{
//   position: fixed;
//   bottom: 0;
//   width: 100%;
//   display: none;
// }

@media only screen and (max-width: 767px) {

  .ad-left,
  .ad-right,
  .ad-bottom {
    display: none;
  }
  // .ad-bottom-mobile{
  //   // display: block;
  // }
}
</style>
