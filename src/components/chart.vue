<script>
import {Bar, Gauge, Linear, Ring, Rose, Error, MLinear, MSlider} from "./charts"
import {testData} from "@/components/TestDetail";
import {removeNonLetters} from "@/utils/string";
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
      required: true,
    },
    /**
     * the type of the chart,
     * chosen from ['bar', 'gauge', 'line', 'ring', 'rose', 'mlinear', 'mslider']
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
      required: true,
      default: ''
    }
  },
  mounted() {
    // step1: get and formatter the type of the chart
    const chosenType = removeNonLetters(this.type.toLowerCase());
    if (['bar', 'gauge', 'line', 'ring', 'rose', 'mlinear', 'mslider'].includes(chosenType)) {
      this.chartType = chosenType;
    } else {
      this.chartType = 'error';
    }
    // step2: transform the data to the option of the chart
    this.chartOption = toOptions(this.detail);
  },
  components: {
    Bar, Gauge, Linear, Ring, Rose, Error, MLinear, MSlider
  },
  data() {
    return {
      chartData: testData,
      chartOption: [],
      chartType: 'error'     /** 1. switching test type */
    }
  },
}
</script>

<template>
  <Block height="6rem">
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
    <div v-else-if="chartType === 'mlinear'" style="width: 100%; height: 100%;">
      <MLinear :options="chartOption"/>
    </div>
    <div v-else-if="chartType === 'mslider'" style="width: 100%; height: 100%;">
      <MSlider :options="chartOption"/>
    </div>
    <div v-else>
      <Error/>
    </div>
  </Block>
</template>
