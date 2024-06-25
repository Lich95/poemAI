<template>
  <div class="adsense-container">
    <ins
      class="adsbygoogle"
      style="display: block"
      data-ad-client="ca-pub-9781574167315838"
      data-ad-slot="9524179685"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  </div>
</template>

<script>
export default {
  name: "AdSense",
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

</style>
