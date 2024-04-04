<script>
import {Bar, Gauge, Linear, Ring, Rose, Error} from "./charts"
import {testData} from "@/components/TestDetail";
import {toOptions} from "@/utils/chart"

export default {
  name: "chart-component",
  props: {
    /**
     * The data of the chart, need an array with JSON element.
     * In dev mode, detail is not required.
     */
    detail: {
      type: Array,
      required: true
    },
    /**
     * the type of the chart,
     * chosen from ['bar', 'gauge', 'line', 'ring', 'rose']
     */
    type: {
      type: String,
      required: true,
      default: "error"
    },
    /**
     * the name of the chart,
     * will be the class name and vue name of the chart,
     * default is uuid
     */
    name: {
      type: String,
      required: false,
      default: ''
    }
  },
  mounted() {
    // step1: get and formatter the type of the chart
    const chosenType = this.type.toLowerCase();
    if (['bar', 'gauge', 'line', 'ring', 'rose'].includes(chosenType)) {
      this.chartType = chosenType;
    }else{
      this.chartType = 'error';
    }
    // step2: transform the data to the option of the chart
    this.chartOption = toOptions(this.detail);
  },
  components: {
    Bar, Gauge, Linear, Ring, Rose, Error
  },
  data() {
    return {
      chartData: testData,
      chartOption: [],
      chartType: ''     /** 1. switching test type */
    }
  },
}
</script>

<template>
  <div v-if="chartType === 'bar'" style="width: 100%; height: 100%;">
    <Bar :options="chartOption"/>
  </div>
  <div v-else-if="chartType === 'gauge'" style="width: 100%; height: 100%;">
    <Gauge :options="chartOption"/>
  </div>
  <div v-else-if="chartType === 'line'" style="width: 100%; height: 100%;">
    <Linear :options="chartOption"/>
  </div>
  <div v-else-if="chartType === 'ring'" style="width: 100%; height: 100%;">
    <Ring :options="chartOption"/>
  </div>
  <div v-else-if="chartType === 'rose'" style="width: 100%; height: 100%;">
    <Rose :options="chartOption"/>
  </div>
  <div v-else>
    <Error/>
  </div>
</template>
