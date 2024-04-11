<template>
    <div id="poems">
        <span class="catalogTitle">
            {{ $t('poemai_category') }}
        </span>

        <div class="allTypes">
            <div v-for="item in types" @click="goTypes(item)">{{ item }}</div>
            <div @click="goTypes('All')">{{ $t('poemai_more') }}</div>
        </div>


        <span class="allPoemsTitle">
            {{ $t('poemai_all_poems') }}
        </span>

        <div class="allPoems">

            <waterfall class="wfDv" :waterfallList="waterfallList"></waterfall>
            <el-pagination background layout="prev, pager, next" :total="1000"
                style="margin:40px 0;justify-content: center;" />
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
import waterfall from "@/components/waterfall/index.vue";
import { useRouter } from 'vue-router';
import i18n from '@/hooks/i18n'
const router = useRouter()
const waterfallList = ref([{
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
And bring back balance to each day`
}, {
    id: '112',
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
And bring back balance to each day`
}, {
    id: '113',
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
And bring back balance to each day`
}])
const types = ref(['Free Verse Poem Example', 'Haiku Poem Example', 'Acrostic Poem Example', 'Sonnet Poem Example', 'Limerick Poem Example', 'Love Poem Example', 'Poem for wedding', 'Poem for anniversary', 'Poem for anniversary'])

const goTypes = (type) => {
    // 
    if (type != 'All') {
        router.push({ name: 'generatedPoemType', params: { language: i18n.global.locale || 'en', GeneratedPoemType: type } });
    } else {
        router.push({ name: 'generatedPoemCategory', params: { language: i18n.global.locale || 'en' } });

    }
}

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
    color: #1D2331;
    font-size: 22px;
    line-height: 30px;
}

.allTypes {
    display: flex;
    flex-direction: row;
    gap: 10px;
    flex-wrap: wrap;
    padding: 0 4em;

    &>div {
        padding: 12px 16px 12px 16px;
        border-radius: 8px;
        box-shadow: 0px 4px 12px 0px #0000000D;
        background: #FFFFFF;

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
    padding:0
}

    .allPoems {
        display: block;
    }

}
</style>