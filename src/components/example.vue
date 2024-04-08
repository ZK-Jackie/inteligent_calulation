<template>
  <Block height="6rem">
    <Chart type="linear" :detail="gaugeData"/>
  </Block>
</template>

<script>
import Chart from '@/components/chart.vue'
import {lineData} from "@/components/TestDetail";

export default {
  components: {Chart},
  data() {
    return {
      gaugeData: lineData
    }
  }
}

</script>