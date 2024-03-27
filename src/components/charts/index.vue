<script>
import { Bar, Gauge, iLine, Ring, Rose, Error } from "./index"
export default {
  name: "chart-component",
  props: {
    data: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: ''
    },
    name: {
      type: String,
      required: false,
      default: ''
    }
  },
  components:{
    Bar, Gauge, iLine, Ring, Rose, Error
  },
  data(){
    return {
      chartType: 'Error'
    }
  },
  mounted() {
    switch (this.type.toLowerCase()) {
      case "bar":
        this.chartType = 'bar';
        break;
      case "gauge":
        this.chartType = 'gauge';
        break;
      case "line":
        this.chartType = 'line';
        break;
      case "ring":
        this.chartType = 'ring';
        break;
      case "rose":
        this.chartType = 'rose';
        break;
      default:
        this.chartType = 'error';
        break;
    }
  },
}
</script>

<template>
  <div v-if="chartType === 'bar'">
    <Bar :title="'name'" :data="data"/>
  </div>
  <div v-else-if="chartType === 'gauge'">
    <Gauge :name="name" :data="data"/>
  </div>
  <div v-else-if="chartType === 'line'">
    <iLine :name="name" :data="data"/>
  </div>
  <div v-else-if="chartType === 'ring'">
    <Ring :name="name" :data="data"/>
  </div>
  <div v-else-if="chartType === 'rose'">
    <Rose :name="name" :data="data"/>
  </div>
  <div v-else>
    <Error />
  </div>
</template>
