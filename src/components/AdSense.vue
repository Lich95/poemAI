<template>
  <div class="adsense-container">
    <ins
      class="adsbygoogle"
      style="display: inline-block;"
      :style="getStyle(adSlot)"
      data-ad-client="ca-pub-9781574167315838"
      :data-ad-slot="adSlot"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  </div>
</template>

<script>
export default {
  name: "AdSense",
  props: {
    adSlot: {
      type: String,
      required: true
    }
  },
  methods:{
    getStyle(adSlot){
      console.log(123,adSlot);
      if(adSlot=='9520839519'){
        return 'width:1200px;height:82px'
      }else if (adSlot=='9524179685'){
        return 'width:300px;height:600px'
      }else if (adSlot=='7827954630'){
        return 'width:430px;height:50px'
      }
    }
  },  
  mounted() {
    if (window.adsbygoogle) {
      window.adsbygoogle.push({});
    } else {
      const script = document.createElement("script");
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      script.async = true;
      script.onload = () => {
        (adsbygoogle = window.adsbygoogle || []).push({});
      };
      document.head.appendChild(script);
    }
  },
};
</script>

<style>
.adsense-container {
  margin: 20px 0;
}
.adsbygoogle{
  text-align: center;
}
</style>
