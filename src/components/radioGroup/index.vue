<template>
  <div style="margin: 0 auto;
    max-width: calc(760px + 2em);">
    <el-radio-group v-model="getCheckRadio">
      <el-radio-button v-for="item in radioList.filter(x => x.showBol)" :label="item.label" :key="item.label">
        <div class="radioBtnDiv">
          <img :src="item.img" alt="">
          <span>{{ $t(item.text) }}</span>
        </div>
      </el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
import { computed,watch } from 'vue';
import i18n from '@/hooks/i18n'


export default {
  props: {
    checkRadio: {
      type: String,
      required: true
    },
    radioList: {
      type: Array,
      default: []
    }
  },
  computed: {
    getCheckRadio: {
      get() {
        return this.checkRadio;
      },
      set(newV) {
        this.$emit('changeCheck', newV);
      }
    }
  },
  data() {
    return {};
  },
  mounted() {
    // 使用 watch 监听 i18n.global.locale 的变化
    watch(() => i18n.global.locale, (newLocale, oldLocale) => {
      this.updateRadioListVisibility(newLocale);
    });
    
    // 初始时执行一次更新
    this.updateRadioListVisibility(i18n.global.locale);
  },
  methods: {
    updateRadioListVisibility(locale) {
      this.radioList.forEach(item => {
        if (locale === 'ja' || locale === 'ko' || locale === 'th' || locale === 'ar' || locale === 'tr') {
          if (item.label === 'acrostic' || item.label === 'limerick') {
            item.showBol = false;
          } else {
            item.showBol = true;
          }
        } else {
          item.showBol = true;
        }
      });
    }
  }
};
</script>

<style scoped>
::v-deep .el-radio-group {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  gap: 12px
}

::v-deep .el-radio-button__inner {
  width: 255px;
  height: 72px;
  padding: 15px;
  border: 2px solid transparent;
  box-shadow: 0px 4px 12px 0px #0000000D;
  border-radius: 5px;
  background: #FFFFFF;
  border-radius: 16px !important;
  padding-left: 0;
  border-left: 2px solid transparent !important;
}

::v-deep .el-radio-button__original-radio:checked+.el-radio-button__inner {
  color: #606266;
  border: 2px solid #1D2331;
  border-left: 2px solid #1D2331 !important;
  background: #fff;
  box-shadow: none;
  font-family: 'other-bold-font-family' !important;
}

::v-deep .el-radio-button__inner:hover {
  color: #606266;
}

.radioBtnDiv {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  font-size: 18px;
}

.radioBtnDiv img {
  width: 92px;
  height: 72px;
  -webkit-user-drag: none
}



@media only screen and (max-width: 767px) {
  .radioBtnDiv img {
    display: none;
  }

  .radioBtnDiv {

    justify-content: center;
    align-items: center;
  }

  ::v-deep .el-radio-button__inner {
    white-space: pre-wrap;
    text-align: center;
    padding: 10px;
    justify-content: space-evenly;
    width: 106px!important;
    height: 48px!important;
  }
}
</style>