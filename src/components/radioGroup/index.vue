<template>
    <div style="margin: 0 auto;
    max-width: calc(760px + 2em);">
      <el-radio-group v-model="getCheckRadio">
        <el-radio-button v-for="item in radioList" :label="item.label" :key="item.label">
          <div class="radioBtnDiv">
            <img :src="item.img" alt="">
          <span>{{ item.text }}</span>
        </div>
        </el-radio-button>
      </el-radio-group>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  
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
    methods: {},
    mounted() {}
  };
  </script>
  
  <style scoped>
::v-deep .el-radio-group {
  display: inline-flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    gap:12px
}
::v-deep .el-radio-button__inner{
    width:255px;
    height: 72px;
    padding:15px;
    border:2px solid transparent;
    box-shadow: 0px 4px 12px 0px #0000000D;
    border-radius:5px ;
    background:#FFFFFF;
    border-radius: 16px !important;
    padding-left: 0;
    border-left:2px solid transparent !important;
}
::v-deep .el-radio-button__original-radio:checked+.el-radio-button__inner{
    color:#606266;
    border:2px solid #1D2331;
    border-left:2px solid #1D2331 !important;
    background:#fff;
    box-shadow:none;
    font-family: 'other-bold-font-family'!important;
}
::v-deep .el-radio-button__inner:hover{
    color:#606266 ;
}
.radioBtnDiv{
  display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  font-size: 18px;
}
.radioBtnDiv img{
  width: 92px;
  height: 72px;
  -webkit-user-drag:none
}



@media only screen and (max-width: 767px) {
   .radioBtnDiv img{
    display: none;

   }
}



  </style>
  