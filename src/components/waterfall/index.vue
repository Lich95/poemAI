<template>
    <div>
        <div class="water wf1">
            <div v-for="item in wfl[0]">
                <h4>{{ item.title }}</h4>
                <div>{{ item.content }}</div>
                <el-button>{{ item.type }}</el-button>
            </div>
        </div>
        <div class="water wf2">
            <div v-for="item in wfl[1]">
                <h4>{{ item.title }}</h4>
                <div>{{ item.content }}</div>
                <el-button>{{ item.type }}</el-button>
            </div>
        </div>
        <div class="water wf3">
            <div v-for="item in wfl[2]">
                <h4>{{ item.title }}</h4>
                <div>{{ item.content }}</div>
                <el-button>{{ item.type }}</el-button>
            </div>
        </div>
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
            default: [{ title: 1, content: 2, type: 3 }, { title: 1, content: '2222啊谁说的发生发撒法沙发沙发啊谁说的发生发撒法沙发沙发啊谁说的发生发撒法沙发沙发啊谁说的发生发撒法沙发沙发啊谁说的发生发撒法沙发沙发啊谁说的发生发撒法沙发沙发2', type: 3 }, { title: 1, content: '说的发生发撒法沙发沙发啊谁说的发生发撒法沙发沙发啊谁说的发生发撒法沙发沙发', type: 3 }, { title: 1, content: 2, type: 3 }, { title: 1, content: 2, type: 3 }, { title: 1, content: 2, type: 3 }, { title: 1, content: 2, type: 3 }, { title: 1, content: 2, type: 3 }, { title: 1, content:'2222啊谁说的发生发撒法沙发沙发啊谁说的发生发撒法沙发沙发啊谁说的发生发撒法沙发沙发啊谁说的发生发撒法沙发沙发啊谁说的发生发撒法沙发沙发啊谁说的发生发撒法沙发沙发2', type: 3 }, { title: 1, content: 2, type: 3 }, { title: 1, content: 2, type: 3 }, { title: 1, content: 2, type: 3 },]
        }
    },
    data() {
        return {
            waterfallCol: 3,
            wfl: [[], [], []],
        };
    },
    methods: {
        init() {
            this.wfl[0].push(this.waterfallList[0])
            this.wfl[1].push(this.waterfallList[1])
            this.wfl[2].push(this.waterfallList[2])
            for (let i = 3; i < this.waterfallList.length; i++) {
                setTimeout(() => {
                    let heights = [document.getElementsByClassName('wf1')[0].offsetHeight, document.getElementsByClassName('wf2')[0].offsetHeight, document.getElementsByClassName('wf3')[0].offsetHeight]
                    console.log(heights);
                    let numIndex = heights.findIndex(x => x == Math.min(...heights));
                    this.wfl[numIndex].push(this.waterfallList[i])
                }, 0);
            }
        },
    },
    mounted() {
        this.init()
    }
};
</script>


<style scoped lang="scss">
div.water {
    display: inline-flex;
    width: 300px;
    flex-direction: column;

    div {
        word-break: break-all;
    }
}
</style>