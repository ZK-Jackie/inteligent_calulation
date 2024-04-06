<script>
import {UUID} from "@/utils/string";
import {formatNumber} from "@/utils/number";

export default {
  name: 'GaugeChart',
  props: {
    id: {
      type: String,
      required: false,
      default: UUID()
    },
    /**
     * the specific data and style of the chart
     * @type {Array} Need an array consists of max to two JSON elements
     */
    options: {
      type: Array,
      required: true,
      default: []
    }
  },
  watch: {
    options: {
      handler: function (newVal) {
        if (newVal) {
          this.loadChartData();
        }
      },
      deep: true
    }
  },
  mounted() {
    this.loadChartData();
  },
  methods: {
    loadChartData() {
      this.loadChart();
    },
    loadChart() {
      alert()
      const that = this;
      const chart = this.$echarts.init(document.getElementById('chart-item-gauge-' + that.id));
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
                color: [] // 设置项1：色系
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
              color: 'rgba(255,255,255,.6)',
              fontSize: 20,
              distance: -60,
              rotate: 'tangential',
              formatter: ''  // 设置项2：刻度标签
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
            data: []
          }
        ]
      };
      // 填充数据
      /**********色系***********/
      option.series[0].axisLine.lineStyle.color = [
        [0.25, that.options[0].dataColor[0]],
        [0.5, that.options[0].dataColor[1]],
        [0.75, that.options[0].dataColor[2]],
        [1, that.options[0].dataColor[3]]
      ];
      /*********刻度标签*********/
      option.series[0].axisLabel.formatter = function (value) {
        if (value === 0.875) {
          return that.options[0].xAxisTags[3];
        } else if (value === 0.625) {
          return that.options[0].xAxisTags[2];
        } else if (value === 0.375) {
          return that.options[0].xAxisTags[1];
        } else if (value === 0.125) {
          return that.options[0].xAxisTags[0];
        }
        return '';
      }
      /*********数据*********/
      option.series[0].data = [
        {
          value: formatNumber(that.options[0].data[1], that.options[0].numPrecision),
          name: that.options[0].data[0]
        }
      ];
      // 使用刚指定的配置项和数据显示图表
      chart.setOption(option);
      window.addEventListener("resize", function () {
        chart.resize();
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