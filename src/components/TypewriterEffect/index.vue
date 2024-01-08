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
      };
    },
    methods: {
      typeWriter() {

        if (this.currentIndex < this.textContent.length) {
          this.$refs.typewriterText.innerHTML += this.textContent.charAt(this.currentIndex);
          this.currentIndex++;
          setTimeout(this.typeWriter, this.speed);
        } else {
          // 打字机效果结束后，设置定时器延迟重新显示
          setTimeout(this.restartTypewriter, this.delay*1000);
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
      textContent: function() {
        // Reset the typing effect when textContent changes
        this.currentIndex = 0;
        this.$refs.typewriterText.innerHTML = '';
        this.typeWriter();
      }
    },
    mounted() {
      this.typeWriter();
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
    width: 2px; /* Adjust the width as needed */
    height: 1em; /* Adjust the height as needed */
    background-color: #000;
    animation: blink 1s step-end infinite;
    position: absolute;
    top:4px;
  }
  
  @keyframes blink {
    
    10% {
      opacity: 1;
    }
    45% {
      opacity: 0;
    }
    90%{
      opacity: 1;
    }
  }
  </style>
  