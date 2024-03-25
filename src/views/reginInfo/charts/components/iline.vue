<script>
import * as echarts from "echarts";
// import {getCharts} from '@/api/charts'

export default {
  name: 'chartItem',
  // functional: true,
  props: {
    data: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      required: true,
    }
  },
  mounted() {
    this.loadChartData();
  },
  methods: {
    loadChartData() {
      // this.getCharts();
      this.loadChart();
    },
    loadChart() {
      const that = this;
      const eCharts = echarts.init(document.getElementById('chart-item-' + that.chartTitle));
      const data = JSON.parse(JSON.stringify(that.data));
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#dddc6b'
            }
          }
        },
        legend: {
          top: '0%',
          data: data.seriesName,
          color: 'rgba(255,255,255,.5)',
          fontSize: '12',
        },
        grid: {
          left: '10',
          top: '30',
          right: '10',
          bottom: '10',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            color: "rgba(255,255,255,.6)",
            fontSize: 12,
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.2)'
            }
          },
          data: data.keys
        }, {
          axisPointer: {show: false},
          axisLine: {show: false},
          position: 'bottom',
          offset: 20,
        }],
        yAxis: [{
          type: 'value',
          axisTick: {show: false},
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.1)'
            }
          },
          axisLabel: {
            color: "rgba(255,255,255,.6)",
            fontSize: 12,
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.1)'
            }
          }
        }],
        series: []
      };
      // 填充数据
      option.series[0] = {
        name: data.seriesName[0],
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          color: '#0184d5',
          width: 2
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(1, 132, 213, 0.4)'
          }, {
            offset: 0.8,
            color: 'rgba(1, 132, 213, 0.1)'
          }], false),
          shadowColor: 'rgba(0, 0, 0, 0.1)',
        },
        itemStyle: {
          color: '#0184d5',
          borderColor: 'rgba(221, 220, 107, .1)',
          borderWidth: 12
        },
        data: data.values[0]
      };
      if (data.series > 1) {
        option.series[1] = {
          name: data.seriesName[1],
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            color: '#00d887',
            width: 2

          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(0, 216, 135, 0.4)'
            }, {
              offset: 0.8,
              color: 'rgba(0, 216, 135, 0.1)'
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',

          },
          itemStyle: {
            color: '#00d887',
            borderColor: 'rgba(221, 220, 107, .1)',
            borderWidth: 12
          },
          data: data.values[1]
        };
      }

      // 使用刚指定的配置项和数据显示图表。
      eCharts.setOption(option);
      window.addEventListener("resize", function () {
        eCharts.resize();
      });
    }
  },
}
</script>

<template>
  <div
      class="chart-item-line"
      :id="'chart-item-line-'+ name"
      style="width: 100%; height: 100%;">
  </div>
</template>