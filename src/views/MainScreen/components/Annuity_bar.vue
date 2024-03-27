<template>
  <div id="scope">
    <div class="allnav" id="echart"  style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
export default {
  methods: {
    echarts() {
      var that = this;
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('echart'));
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '0%',
          right: '2%',
          bottom: '1%',
          top: '7.8%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: [
            '人保养老',
            '长江养老',
            '太平养老',
            '泰康养老',
            '平安养老',
            '国泰养老'
          ]
        },
        series: [
          {
            name: '2022',
            type: 'bar',
            data: [100, 1020, 1588, 1899, 4288, 6091.16]
          },
          {
            name: '2023',
            type: 'bar',
            data: [210, 1678, 2389, 2388, 5199, 6991.18],
            itemStyle: {
              color: '#909fe6'
            }
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
  },
    mounted() {
      this.echarts();
    }
}
</script>

<style scoped>
#scope{
  width: 100%;
  height: 98%;
}
</style>

