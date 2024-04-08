<template>
  <div class="preview-views">
    <ul>
      <li v-for="(item, index) in chartDetails"
          :key="index"
      >
        <Block class="preview-charts"
               height="4rem"
               width="4.182rem"
               :title="index.toString()"
        >
          <Chart :detail="item"
                 :type="item[0].displayMode"
          >
          </Chart>
        </Block>
      </li>
    </ul>
  </div>
</template>

<script>
import {previewTestData} from "@/views/reginInfo/settings/TestDetail";
import Chart from "@/components/chart.vue";

export default {
  components: {
    Chart
  },
  data() {
    return {
      chartDetails: [],
      activeButtonIndex: 0
    }
  },
  methods: {},
  mounted() {
    this.chartDetails = previewTestData;
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