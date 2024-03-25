<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!--      <keep-alive :include="cachedViews">-->
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
    <iframe-toggle/>
  </section>
</template>

<script>
import iframeToggle from "./IframeToggle/index"

export default {
  name: 'MainApp',
  components: { iframeToggle },
  computed: {
    // cachedViews() {
    //   return this.$store.state.tagsView.cachedViews
    // },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 70px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
//.el-popup-parent--hidden {
//  .fixed-header {
//    padding-right: 6px;
//  }
//}
//
/*chrome滚动条样式*/
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  position: absolute
}

::-webkit-scrollbar-thumb {
  background-color: #5bc0de
}

::-webkit-scrollbar-track {
  background-color: #ddd
}
</style>
