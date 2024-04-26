<template>
    <div>
        <div class="water wf1" v-if="wfl[0].length" ref="wf1">
            <div v-for="item in wfl[0]" @click="goDetail(item.id)">
                <span>{{ item.theme }}</span>
                <div>{{ item.content }}</div>
                <el-button :class="item.type" class="typeFont" v-if="this.$route.name == 'Home'">{{ $t(typeinit(item.type))
                    }}</el-button>
                <el-button class="copyBtn" v-else @click="copyContent(item.content)">Copy</el-button>
            </div>
        </div>
        <div class="water wf2" v-if="wfl[1].length" ref="wf2">
            <div v-for="item in wfl[1]" @click="goDetail(item.id)">
                <span>{{ item.theme }}</span>
                <div>{{ item.content }}</div>
                <el-button :class="item.type" class="typeFont" v-if="this.$route.name == 'Home'">{{ $t(typeinit(item.type))
                    }}</el-button>
                <el-button class="copyBtn" v-else @click="copyContent(item.content)">Copy</el-button>
            </div>
        </div>
        <div class="water wf3" v-if="wfl[2].length" ref="wf3">
            <div v-for="item in wfl[2]" @click="goDetail(item.id)">
                <span>{{ item.theme }}</span>
                <div>{{ item.content }}</div>
                <el-button :class="item.type" class="typeFont" v-if="this.$route.name == 'Home'">{{ $t(typeinit(item.type))
                    }}</el-button>
                <el-button class="copyBtn" v-else @click="copyContent(item.content)">Copy</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import ClipboardJS from 'clipboard';
import { ElMessage } from 'element-plus'
import i18n from '@/hooks/i18n'
const { t } = i18n.global;

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
            default: []
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
            console.log(123, this.waterfallList.length);
            if (this.waterfallList.length > 3) {
                this.wfl[0].push(this.waterfallList[0])
                this.wfl[1].push(this.waterfallList[1])
                this.wfl[2].push(this.waterfallList[2])
                for (let i = 3; i < this.waterfallList.length; i++) {
                    setTimeout(() => {
                        let heights = [
                            this.$refs.wf1.offsetHeight,
                            this.$refs.wf2.offsetHeight,
                            this.$refs.wf3.offsetHeight]
                        let numIndex = heights.findIndex(x => x == Math.min(...heights));
                        this.wfl[numIndex].push(this.waterfallList[i])

                    }, 0);
                }
            } else {
                this.waterfallList.forEach((item, index) => {
                    this.wfl[index] = [item]
                })
            }


        },
        goDetail(id) {

            this.$router.push({ name: 'generatedPoemId', params: { id: id } });
        },
        copyContent(txt) {
            // const clipboard = new ClipboardJS('.copyBtn', {
            //     text() {
            //         return txt
            //     }
            // })
            // clipboard.on('success', () => {
            //     ElMessage({
            //         showClose: true,
            //         message: t('poemai_copy_success_toast'),
            //         center: true,
            //         type: 'success'
            //     })
            //     clipboard.destroy();
            // })
            // clipboard.on('error', () => {
            //     ElMessage({
            //         showClose: true,
            //         message: 'error',
            //         center: true,
            //         type: 'success'
            //     })
            //     clipboard.destroy();
            // })




            const textArea = document.createElement("textarea");
            textArea.style.position = 'fixed';
            textArea.style.top = 0;
            textArea.style.left = 0;
            textArea.style.width = '2em';
            textArea.style.height = '2em';
            textArea.style.padding = 0;
            textArea.style.border = 'none';
            textArea.style.outline = 'none';
            textArea.style.boxShadow = 'none';
            textArea.style.background = 'transparent';
            textArea.value = txt

            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                var successful = document.execCommand('copy');
                ElMessage({
                    showClose: true,
                    message: t('poemai_copy_success_toast'),
                    center: true,
                    type: 'success'
                })
            } catch (err) {
                ElMessage({
                    showClose: true,
                    message: 'error',
                    center: true,
                    type: 'success'
                })
            }

            document.body.removeChild(textArea);
        },
        typeinit(txt) {
            switch (txt) {
                case 'haiku':
                    return 'poemai_haiku';
                case 'freeverse':
                    return 'poemai_free_verse';
                case 'acrostic':
                    return 'poemai_acrostic';
                case 'sonnet':
                    return 'poemai_sonnet';
                case 'limerick':
                    return 'poemai_limerick';
                case 'lovepoem':
                    return 'poemai_love_poem';

            }

            // 
            // 
            // 
            // 
            // 
        }
    },
    mounted() {
        this.init()
    }
};
</script>


<style scoped lang="scss">
div.water {
    display: inline-flex;
    width: 30%;
    flex-direction: column;
    gap: 25px;
    text-align: left;


    &>div {
        border: 1px solid #e5e5e5;
        background-color: #fff;
        color: #525B71;
        border-radius: 16px;
        padding: 22px 20px;
        cursor: pointer;

        span {
            font-size: 20px;
            font-weight: 700;
            line-height: 24px;
            color: #1D2331;

        }

        div {
            margin: 12px 0;
            word-break: break-all;
            font-weight: 400;
            font-size: 16px;
            line-height: 26px;
            color: #525B71;

        }

        .el-button {
            border: 0;
            padding: 4px 6px 4px 6px;
            gap: 10px;
            height: 20px;
            border-radius: 4px;
            color: #fff;
            font-size: 12px;
            line-height: 12px;
            font-weight: 400;
            ;
        }

        .copyBtn {
            padding: 12px 16px;
            border-radius: 16px;
            gap: 4px;
            border: 1px solid #1D2331;
            color: #1D2331;
            float: right;
            font-size: 12px;
            ;
        }
    }
}

.wf2 {
    margin: 0 25px
}

@media only screen and (max-width: 767px) {

    div.water {
        width: 100%;
    }

    .wf2 {
        margin: 25px 0;
    }

}


.haiku {
    background-color: #FF856B
}

.freeverse {
    background-color: #43DFA8
}

.acrostic {
    background-color: #5B60FD
}

.sonnet {
    background-color: #FF565E
}

.limerick {
    background-color: #64D7FC
}

.lovepoem {
    background-color: #FF7FA0
}
</style>