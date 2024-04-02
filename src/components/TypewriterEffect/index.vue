<template>
  <div class="typewriter">
    <p ref="typewriterText"></p>
  </div>
</template>
  
<script>
export default {
  props: {
    textContent: {
      type: String,
      required: true
    },
    speed: {
      type: Number,
      default: 50
    },
    delay: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      currentIndex: 0,
      textNum: 0,
      texts: [],
      colors:[
        '#FF7FA0',
        "#64D7FC",
        "#FF565E",
        "#5B60FD",
        "#FF856B",
        "#43DFA8"
      ]
    };
  },
  methods: {
    splitText() {
      this.texts = this.textContent.split(',');
      console.log(this.texts);
      this.typeWriter();
    },
    typeWriter() {
      const currentText = this.texts[this.currentIndex];

      if (this.textNum ==0) {
        this.$refs.typewriterText.innerHTML = '';
      }
      if (this.currentIndex < this.texts.length) {
        if (this.textNum < currentText.length && currentText) {
          this.$refs.typewriterText.innerHTML += currentText.charAt(this.textNum);
          this.$refs.typewriterText.style.color = this.colors[this.currentIndex]
          this.textNum++;
          setTimeout(this.typeWriter, this.speed);
        } else {
          // 当前文本的打字效果完成，重置并继续下一个文本
          this.currentIndex++;
          this.textNum = 0;
          setTimeout(this.typeWriter, this.delay * 1000);
        }
      } else {
        this.currentIndex = 0;
        this.$refs.typewriterText.innerHTML = '';
        this.typeWriter()
      }
    },
    restartTypewriter() {
      // 重置打字机效果
      this.currentIndex = 0;
      this.$refs.typewriterText.innerHTML = '';
      this.typeWriter();
    }
  },
  watch: {
    textContent: function () {
      // 当textContent改变时重置打字效果
      this.currentIndex = 0;
      this.$refs.typewriterText.innerHTML = '';
      this.splitText();
    }
  },
  mounted() {
    this.splitText();
  },
  beforeRouteLeave(to,from,next){
    clearTimeout(this.typeTimer);
    next();
  }
};
</script>
  
<style scoped>
.typewriter {
  overflow: hidden;
  white-space: nowrap;
  font-size: 1.5em;
  /* font-family: 'Courier New', monospace; */
  position: relative;
}

.typewriter p {
  display: inline-block;
  margin: 0;
  padding: 0px;
}

.typewriter p::after {
  content: '';
  display: inline-block;
  width: 2px;
  /* Adjust the width as needed */
  height: 1em;
  /* Adjust the height as needed */
  background-color: #000;
  animation: blink 1s step-end infinite;
  position: absolute;
  top: 4px;
}

@keyframes blink {

  10% {
    opacity: 1;
  }

  45% {
    opacity: 0;
  }

  90% {
    opacity: 1;
  }
}
</style>
  