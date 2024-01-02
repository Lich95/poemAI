<template>
    <div>
      <el-radio-group v-model="getCheckRadio">
        <el-radio-button v-for="item in radioList" :label="item.label" :key="item.label">
          {{ item.text }}
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
    font-size: 0;
    flex-wrap: wrap;
    align-items: center;
}
::v-deep .el-radio-button__inner{
    width:18vh;
    margin:5px;
    padding:15px;
    border:1px solid #ccc;
    border-radius:5px ;
    background:#f5f1f1;
}
::v-deep .el-radio-button__original-radio:checked+.el-radio-button__inner{
    color:#606266;
    border:1px solid #333;
    border-radius:5px ;
    background:#f5f1f1;
    box-shadow:none;
}
::v-deep .el-radio-button__inner:hover{
    color:#606266 ;
}
  </style>
  