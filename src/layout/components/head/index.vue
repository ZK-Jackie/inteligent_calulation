<template>
  <div class="head">
    <p>{{ breadcrumbList }}</p>
    <h1 class="title">{{ title }}</h1>
    <div class="right">
      <span class="time" v-html="formattedTime"></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Intelligent Calculation Model',
      currentTime: new Date(),
      breadcrumbList: [],
      blink: false
    }
  },
  computed: {
    formattedTime() {
      const dt = this.currentTime;
      const y = dt.getFullYear();
      const mt = (dt.getMonth() + 1).toString().padStart(2, '0'); //获取月份
      const day = dt.getDate().toString().padStart(2, '0'); //获取日期
      const h = dt.getHours().toString().padStart(2, '0'); //获取时
      const m = dt.getMinutes().toString().padStart(2, '0'); //获取分
      const s = dt.getSeconds().toString().padStart(2, '0'); //获取秒
      const w = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][dt.getDay()]; //获取星期
      return y + "年" + mt + "月" + day + "日" + " " + w + " " + h + ":" + m + (this.blink ? ":" : "<span style='opacity: 0;'>:</span>") + s;
    }
  },
  watch:{
    $route(){
      this.getTitle();
      // this.getBreadcrumb();
    }
  },
  methods: {
    getTitle(){
      this.title = this.$route.meta.title;
    },
    getBreadcrumb(){
      this.breadcrumbList = this.$route.matched.filter(item => item.meta.miniTitle);
    },
    refreshClock() {
      setInterval(() => {
        this.currentTime = new Date();
      }, 1000);
      setInterval(() => {
        this.blink = !this.blink;
      }, 700);
    }
  },
  mounted() {
    this.refreshClock();
  }
}
</script>

<style scoped>
.head {
  height: 1.05rem;
  background: url(@/assets/head_bg.png) no-repeat center center;
  background-size: 100% 100%;
  position: relative;
  z-index: 100;
}

.head .title {
  color: #fff;
  text-align: center;
  font-size: .4rem;
  line-height: .8rem;
}

.head .right {
  position: absolute;
  right: .3rem;
  top: 0;
  line-height: .75rem;
}

.head .right .time {
  color: rgba(255, 255, 255, .7);
  font-size: .18rem;
  padding-right: .1rem;
}

</style>