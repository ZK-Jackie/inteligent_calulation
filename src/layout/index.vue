<template>
  <div>
    <Head />
    <Background class="background" />
    <MainApp class="main-box"/>
  </div>
</template>

<script>
import {Background, Head, MainApp} from "./components";

export default {
  components: {
    Background,
    MainApp,
    Head,
  },
}

</script>

<style scoped>
.background {
  opacity: 0.2;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  height: 99%;
  z-index: 1;
}

.main-box {
  padding: .1rem .1rem 0rem .1rem;
}
</style>