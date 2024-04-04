<template>
  <Block height="6rem">
    <Chart type="gauge" :detail="gaugeData"/>
  </Block>
</template>

<script>
import Chart from '@/components/chart.vue'
import {gaugeData} from "@/components/TestDetail";

export default {
  components: {Chart},
  data() {
    return {
      gaugeData: gaugeData
    }
  }
}

</script>