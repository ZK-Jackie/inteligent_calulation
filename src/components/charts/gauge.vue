<script>
import {arraySum} from "@/utils/array";
import {UUID} from "@/utils/string";

export default {
  props: {
    data: {
      type: Object,
      required: true,
      default: [
        {
          dataId: 1,
          displayMode: "gauge",
          startTime: null,
          endTime: null,
          predictStartTime: null,
          predictEndTime: null,
          chartOption: {
            dataId: 1,
            dataName: "gauge1",
            displayableMode: ["gauge"],
            keyLabel: null,
            keyUnit: null,
            valueLabel: null,
            valueUnit: null,
            numPrecision: 1.0,
            maxValue: 100,
            minValue: 0,
            dataColor: ['#7CFFB2', '#58D9F9', '#FDDD60', '#FF6E76'],
            isPredict: true,
            isInfo: false,
            data: [
              ["2024-3-28T00:25:52"],
              [80]
            ]
          }
        },
      ]
    },
    id: {
      type: String,
      required: false,
      default: UUID()
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
      const eCharts = this.$echarts.init(document.getElementById('chart-item-gauge-' + that.id));
      const data = JSON.parse(JSON.stringify(that.data));
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
                  [0.25, data[0].chartOption.dataColor[0]],
                  [0.5, data[0].chartOption.dataColor[1]],
                  [0.75, data[0].chartOption.dataColor[2]],
                  [1, data[0].chartOption.dataColor[3]]
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
                value: data[0].chartOption.data[1][0],
                name: data[0].chartOption.dataName
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
      :id="'chart-item-gauge-'+ id"
      style="width: 100%; height: 100%;">
  </div>
</template>