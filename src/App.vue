<template>
  <div id="app">
    <router-view class="main-box"/>
  </div>
</template>

<script>
import layout from '@/layout'

export default {
  name: 'App',
  components: {
    layout
  },
  methods: {
    resizeFont() {
      let width = window.innerWidth;
      document.documentElement.style.fontSize = `${width / 20}px`;
    }
  },
  mounted() {
    this.resizeFont();
    window.addEventListener('resize', this.resizeFont);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeFont);
  },
}
</script>

<style>
.main-box {
  padding: .1rem .1rem 0rem .1rem;
}
</style>