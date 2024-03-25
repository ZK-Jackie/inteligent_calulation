<script>
import * as echarts from "echarts";
import {arraySum} from "@/utils/array";

export default {
  // functional: true,
  props: {
    data: {
      type: Object,
      required: true
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
      // getCharts()
      /* TODO 图表数据校验
      * 1. series数量对应情况：series.length === seriesName.length，series.length === values.length
      * 2. key&value数量对应：keys.length === values[].length
      * 若出错，返回感叹号错误提示和错误码
      * */
      this.loadChart();
    },
    loadChart() {
      const that = this;
      const eCharts = echarts.init(document.getElementById('chart-item-' + that.chartTitle));
      const data = JSON.parse(JSON.stringify(that.data));
      const pointer = arraySum(data.values[0]) / 100;
      const option = {
        series: [
          {
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            center: ['50%', '75%'],
            radius: '90%',
            min: 0,
            max: 1,
            splitNumber: 8,
            axisLine: {
              lineStyle: {
                width: 6,
                color: [
                  [0.25, '#7CFFB2'],
                  [0.5, '#58D9F9'],
                  [0.75, '#FDDD60'],
                  [1, '#FF6E76']
                ]
              }
            },
            pointer: {
              icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
              length: '12%',
              width: 20,
              offsetCenter: [0, '-60%'],
              itemStyle: {
                color: 'auto'
              }
            },
            axisTick: {
              length: 12,
              lineStyle: {
                color: 'auto',
                width: 2
              }
            },
            splitLine: {
              length: 20,
              lineStyle: {
                color: 'auto',
                width: 5
              }
            },
            axisLabel: {
              color: '#464646',
              fontSize: 20,
              distance: -60,
              rotate: 'tangential',
              formatter: function (value) {
                if (value === 0.875) {
                  return '危险';
                } else if (value === 0.625) {
                  return '一般';
                } else if (value === 0.375) {
                  return '良好';
                } else if (value === 0.125) {
                  return '极佳';
                }
                return '';
              }
            },
            title: {
              offsetCenter: [0, '-10%'],
              fontSize: 20
            },
            detail: {
              fontSize: 30,
              offsetCenter: [0, '-35%'],
              valueAnimation: true,
              formatter: function (value) {
                return Math.round(value * 100) + '';
              },
              color: 'inherit'
            },
            data: [
              {
                value: pointer,
                name: data.seriesName[0]
              }
            ]
          }
        ]
      };
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
      class="chart-item-gauge"
      :id="'chart-item-gauge-'+ name"
      style="width: 100%; height: 100%;">
  </div>
</template>