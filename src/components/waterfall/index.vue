<template>
    <div>
        <ul>
                <li v-for="item in waterfallList">
                    <h4>{{ item.title }}</h4>
                    <div>{{ item.content }}</div>
                    <el-button>{{ item.type }}</el-button>
                </li>
        </ul>
    </div>
</template>

<script>
import { computed } from 'vue';

export default {
    props: {
        typeIcon: {
            type: Boolean,
            default: false
        },
        copyIcon: {
            type: Boolean,
            default: false
        },
        waterfallList: {
            type: Array,
            default: [{title:1,content:2,type:3},{title:1,content:'22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222',type:3},{title:1,content:2,type:3},{title:1,content:2,type:3},{title:1,content:2,type:3},{title:1,content:2,type:3},{title:1,content:2,type:3},{title:1,content:2,type:3},{title:1,content:2,type:3},{title:1,content:2,type:3},{title:1,content:2,type:3},{title:1,content:2,type:3},]
        }
    },
    data() {
        return {
            waterfallCol: 3,
            wfl:[],
        };
    },
    methods: {
        init(){

        },
    },
    mounted() { 

        this.init()

    }
};
</script>


<style scoped>
ul li{
    float: left;
    width: 200px;
}
</style>