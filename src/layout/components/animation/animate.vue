<template>
  <div id="app">
    <canvas id="mycanvas"></canvas>
    <div id="text">WARP SPEED</div>
  </div>
</template>

<script>
import Link from "@/layout/components/head/link.vue";

export default {
  name: 'App',
  components: {Link},
  data() {
    return {
      t: 0,
      arr: [],
      num: 300,
      w: window.innerWidth,
      h: window.innerHeight * 1.5
    };
  },
  methods01: {
    generate(q) {
      for (let i = 0; i < q; i++) {
        this.arr.push({
          x: (Math.random() * 2 * this.w),
          y: (Math.random() * 2 * this.h),
          len: Math.max((Math.random() * 3), 0.5),
          alpha: 0.8
        });
      }
    },
    regenerate(a) {
      const n = this.arr[a];
      n.x = (Math.random() * this.w);
      n.y = (Math.random() * this.h);
      n.len = Math.max((Math.random() * 2), 0.5);
      n.alpha = 0.8;
    },
    paint(a) {
      const n = this.arr[a];
      const radgrad = this.$refs.mycanvas.getContext('2d').createRadialGradient(n.x, n.y, 0, n.x, n.y, n.len * 8);
      radgrad.addColorStop(0, `hsla(${a},90%,50%,1)`);
      radgrad.addColorStop(0.25, `hsla(${a},90%,50%,.25)`);
      radgrad.addColorStop(0.5, `hsla(${a},90%,50%,.05)`);
      radgrad.addColorStop(1, `hsla(${a},90%,50%,0)`);

      // draw shape
      this.$refs.mycanvas.getContext('2d').fillStyle = radgrad;
      this.$refs.mycanvas.getContext('2d').beginPath();
      this.$refs.mycanvas.getContext('2d').arc(n.x, n.y, n.len * 8, 0, 2 * Math.PI);
      this.$refs.mycanvas.getContext('2d').closePath();
      this.$refs.mycanvas.getContext('2d').fill();
      this.$refs.mycanvas.getContext('2d').fillStyle = "hsla(" + a + ",90%,60%,0.8)";
      this.$refs.mycanvas.getContext('2d').beginPath();
      this.$refs.mycanvas.getContext('2d').arc(n.x, n.y, n.len, 0, 2 * Math.PI);
      this.$refs.mycanvas.getContext('2d').closePath();
      this.$refs.mycanvas.getContext('2d').fill();
    },
    move(a) {
      const n = this.arr[a];
      n.x += Math.sin((n.x / this.w) * 2 * Math.PI) * 2 * Math.max(Math.abs(1.5 * Math.sin(this.t * 0.125 * Math.PI)), 1) * n.len;
      n.y += Math.sin((n.y / this.h) * 2 * Math.PI) * 2 * Math.max(Math.abs(1.5 * Math.sin(this.t * 0.125 * Math.PI)), 1) * n.len;
      n.alpha = Math.sin((Math.abs(n.x - (this.w / 2))) / (this.w / 2) * Math.PI);
      if (n.alpha <= 0.01)
        this.regenerate(a);
    },
    go() {
      this.$refs.mycanvas.getContext('2d').fillStyle = "rgba(0,0,0,0.9)";
      this.$refs.mycanvas.getContext('2d').fillRect(0, 0, this.w, this.h);
      for (let i = 0; i < this.arr.length; i++) {
        this.paint(i);
        this.move(i);
      };
    },
    init() {
      this.$nextTick(() => {
        window.requestAnimationFrame(this.init);
        this.go();
      });
    }
  },
  mounted() {
    this.generate(this.num);
    this.init();
    window.addEventListener('resize', this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods02: {
    onResize() {
      this.w = window.innerWidth;
      this.h = window.innerHeight * 1.5;
      this.init();
    }
  }
};
</script>

<style scoped>
body {
  margin: 0;
  background: #000;
  overflow: hidden;
}
#mycanvas {
  animation: cinematic 10s infinite ease-in-out;
  -webkit-filter: brightness(1) saturate(0.9);
  position: absolute;
  top: -25%;
}
#text {
  transform: translateY(-50%);
  top: 50%;
  text-align: center;
  width: 100%;
  position: absolute;
  color: rgba(255, 255, 255, 0.5);
  font-family: "Open sans";
  font-weight: 700;
  font-size: 30px;
  whitespace: nowrap;
  letter-spacing: 1.5em;
  animation: zoom 10s infinite linear;
}
@-webkit-keyframes cinematic {
  0% {
    transform: rotateZ(20deg);
  }
  75% {
    opacity: 1;
  }
  100% {
    transform: rotateZ(-20deg);
    opacity: 0;
  }
}
@-webkit-keyframes zoom {
  0% {
    opacity: 0;
    transform: scale(0.5) translateY(-50%);
    -webkit-filter: blur(10px);
  }
  7.5% {
    opacity: 1;
    transform: scale(1) translateY(-50%);
    -webkit-filter: none;
  }
  90% {
    -webkit-filter: none;
    opacity: 1;
  }
  95% {
    opacity: 0.3;
    transform: scale(1.5) translateY(-50%);
    -webkit-filter: blur(10px);
  }
  100% {
    opacity: 0;
    transform: scale(2);
  }
}


</style>

