<template>
  <div class="preview-views">
    <ul>
      <li v-for="(item, index) in chartData"
          :key="index"
      >
        <Block class="preview-charts"
               height="4rem"
               width="4.182rem"
               :title="index.toString()"
        >
<!--          <Chart-->
<!--          >-->
<!--          </Chart>-->
        </Block>
      </li>
    </ul>
  </div>
</template>

<script>
import Block from "@/components/block.vue";
import Chart from "@/components/chart.vue";

export default {
  components: {
    Block, Chart
  },
  data() {
    return {
      activeButtonIndex: 0
    }
  },
  methods: {},
  mounted() {
  }
}
</script>

<style scoped lang="scss">
.preview-views {
  display: flex;
  justify-content: center;
  align-items: center;
  //灵活换行
  flex-wrap: wrap;
}

.preview-views > ul {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  width: 100%;
  overflow: auto;
  max-height: 5.2rem;
}

/* 隐藏滚动条 */
.preview-views > ul::-webkit-scrollbar {
  display: none;
}

.preview-views > ul > li {
  position: relative;
}

.preview-views .preview-charts {
  margin: 0.1rem;
}
</style>