<template>
  <div id="poems">
    <span class="catalogTitle">
      {{ $t("poemai_category") }}
    </span>

    <div class="allTypes">
      <div v-for="item in types" @click="goTypes(item)" style="cursor: pointer">
        {{ item }}
      </div>
      <div @click="goTypes('All')" style="cursor: pointer">{{ $t("poemai_more") }}</div>
    </div>

    <span class="allPoemsTitle">
      {{ $t("poemai_all_poems") }}
    </span>

    <div class="allPoems">
      <waterfall
        class="wfDv"
        :waterfallList="waterfallList"
        v-if="waterfallList.length"
      ></waterfall>
      <el-pagination
        background
        layout="prev, pager, next"
        style="margin: 40px 0; justify-content: center"
        v-model:current-page="currentPage"
        :page-size="pageSize"
        :total="totals"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import waterfall from "@/components/waterfall/index.vue";
import { useRouter, useRoute } from "vue-router";
import i18n from "@/hooks/i18n";
import { throttledApiRequest } from "@/api/index.js";
const router = useRouter();
const waterfallList = ref([]);
const types = ref([]);
const route = useRoute();

const currentPage = ref(1);
const totals = ref(100);
const pageSize = ref(20);
const handleCurrentChange = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // 可以添加平滑滚动效果
  });
  throttledApiRequest("/api/v1/demo", "post", {
    language: i18n.global.locale ? i18n.global.locale : "en",
    nums: 20,
    pages: currentPage.value,
  }).then((res) => {
    waterfallList.value = JSON.parse(res.data.data).data;
    totals.value = JSON.parse(res.data.data).count;
  });
};
const goTypes = (type) => {
  //
  if (type != "All") {
    router.push({
      name: "generatedPoemType",
      params: { language: i18n.global.locale || "en", GeneratedPoemType: type },
    });
  } else {
    router.push({ name: "category", params: { language: i18n.global.locale || "en" } });
  }
};
const sliceS = () => {
  console.log('now',);
  
  throttledApiRequest("/api/v1/category_by_lang", "post", {
    language: route.params.language,
  }).then((res) => {
    types.value = JSON.parse(res.data.data).map((x) => x.name);
  });

  throttledApiRequest("/api/v1/demo", "post", {
    language:route.params.language,
    nums: 20,
    pages: currentPage.value,
  }).then((res) => {
    waterfallList.value = JSON.parse(res.data.data).data;
    totals.value = JSON.parse(res.data.data).count;

    let beforeTitle = document.title.replace("%s", totals.value);
    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    let befroreDescp = metaDescriptionTag
      .getAttribute("content")
      .replace("%s", totals.value);

    document.title = beforeTitle;
    metaDescriptionTag.setAttribute("content", befroreDescp);
  });
};
onMounted(() => {
    sliceS()
});

watch(
  () => route.params.language,
  (newRoute, oldRoute) => {
    console.log(newRoute, oldRoute,23)
    
    waterfallList.value = [];
    sliceS()
  }
);
</script>
<style scoped lang="scss">
#poems {
  // width: 1240px;
  text-align: center;
  margin: 0 auto;
  padding: 0px 4em;
}

.catalogTitle,
.allPoemsTitle {
  display: block;
  margin: 48px 0 20px;
  font-weight: 700;
  color: #1d2331;
  font-size: 22px;
  line-height: 30px;
}

.allTypes {
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
  padding: 0 4em;

  & > div {
    padding: 12px 16px 12px 16px;
    border-radius: 8px;
    box-shadow: 0px 4px 12px 0px #0000000d;
    background: #ffffff;
  }
}

.allPoems {
  display: grid;
  justify-content: center;
}

@media only screen and (max-width: 767px) {
  #poems {
    padding: 0 1em;
  }

  .allTypes {
    padding: 0;
  }

  .allPoems {
    display: block;
  }
}
</style>
