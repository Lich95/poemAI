<template>
    <div >
        <div class="water wf1">
            <div v-for="item in wfl[0]" @click="goDetail(item.id)">
                <span>{{ item.title }}</span>
                <div>{{ item.content }}</div>
                <el-button :class="item.type" v-if="item.type">{{ item.type }}</el-button>
                <el-button class="copyBtn" v-else @click="copyContent(item.content)">Copy</el-button>
            </div>
        </div>
        <div class="water wf2">
            <div v-for="item in wfl[1]" @click="goDetail(item.id)">
                <span>{{ item.title }}</span>
                <div>{{ item.content }}</div>
                <el-button :class="item.type" v-if="item.type">{{ item.type }}</el-button>
                <el-button class="copyBtn" v-else @click="copyContent(item.content)">Copy</el-button>
            </div>
        </div>
        <div class="water wf3">
            <div v-for="item in wfl[2]" @click="goDetail(item.id)">
                <span>{{ item.title }}</span>
                <div>{{ item.content }}</div>
                <el-button :class="item.type" v-if="item.type">{{ item.type }}</el-button>
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
            default: [{
                id: '111', title: 'Love Poem for husband', content: `In summer's heat, I find no solace
A time for sun and fun, it's all a facade
The warmth that's supposed to bring us joy
Only brings me chills, and makes me annoyed
The days are long, the nights are short
I crave the coolness of the morning dew
But even then, the sun rises high
And steals away my peaceful mood anewThe world is bright, but not so warm
shade, where I can rest
From the harsh rays that burn like storms
And make my heart feel oppressed
Oh, how I wish for autumn's breeze
To bring some relief from summer's sway
When leaves will fall, and skies will gray
And bring back balance to each day`, type: 'Haiku'
            }, {
                id: '112',
                title: 'Love Poem for husband', content: `In summer's heat2222, I find no solace
A time for sun and fun, it's all a facade
The warmth that's supposed to bring us joy
Only brings me chills, and makes me annoyed
The days are long, the nights are short
I crave the coolness of the morning dew
But even then, the sun rises high
And steals away my peaceful mood anewThe world is bright, but not so warm
shade, where I can rest
From the harsh rays that burn like storms
And make my heart feel oppressed
Oh, how I wish for autumn's breeze
To bring some relief from summer's sway
When leaves will fall, and skies will gray
And bring back balance to each day
In summer's heat, I find no solace
A time for sun and fun, it's all a facade
The warmth that's supposed to bring us joy
Only brings me chills, and makes me annoyed
shade, where I can rest
From the harsh rays that burn like storms
And make my heart feel oppressed
Oh, how I wish for autumn's breeze
To bring some relief from summer's sway
When leaves will fall, and skies will gray
And bring back balance to each day`, type: 'FreeVerse'
            }, {
                id: '113',
                title: 'Love Poem for husband', content: `In summer's he33at, I find no solace
A time for sun and fun, it's all a facade
The warmth that's supposed to bring us joy
Only brings me chills, and makes me annoyed
The days are long, the nights are short
I crave the coolness of the morning dew
But even then, the sun rises high
And steals away my peaceful mood anewThe world is bright, but not so warm
shade, where I can rest
From the harsh rays that burn like storms
And make my heart feel oppressed
Oh, how I wish for autumn's breeze
To bring some relief from summer's sway
When leaves will fall, and skies will gray
And bring back balance to each day`,
            }, {
                id: '114',
                title: 'Love Poem for husband', content: `In summer's heat, I find no solace
A time for sun and fun, it's all a facade
The warmth that's supposed to bring us joy
Only brings me chills, and makes me annoyed
The days are long, the nights are short
I crave the coolness of the morning dew
But even then, the sun rises high
And steals away my peaceful mood anewThe world is bright, but not so warm
shade, where I can rest
From the harsh rays that burn like storms
And make my heart feel oppressed
Oh, how I wish for autumn's breeze
To bring some relief from summer's sway
When leaves will fall, and skies will gray
And bring back balance to each day`, type: 'Sonnet'
            }]
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
        goDetail(id) {

            this.$router.push({ name: 'generatedPoemId', params: { id: id } });
        },
        copyContent(txt) {
            const clipboard = new ClipboardJS('.copyBtn', {
                text() {
                    return txt
                }
            })
            clipboard.on('success', () => {
                ElMessage({
                    showClose: true,
                    message: t('poemai_copy_success_toast'),
                    center: true,
                    type: 'success'
                })
                clipboard.destroy();
            })
            clipboard.on('error', () => {
                ElMessage({
                    showClose: true,
                    message: 'error',
                    center: true,
                    type: 'success'
                })
                clipboard.destroy();
            })

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
    width: 100%;
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


// @media only screen and (max-width: 767px) {
    
// div.water {
//     width: 100%;}
// }


.Haiku {
    background-color: #FF856B
}

.FreeVerse {
    background-color: #43DFA8
}

.Acrostic {
    background-color: #5B60FD
}

.Sonnet {
    background-color: #FF565E
}

.Limerick {
    background-color: #64D7FC
}

.LovePoem {
    background-color: #FF7FA0
}
</style>