<script>
import {UUID} from "@/utils/string";

export default {
  name: 'LinearChart',
  props: {
    data: {
      type: Object,
      required: true,
      default: [
        {
          dataId: 1,
          displayMode: "linear",
          startTime: "2020",
          endTime: "2026",
          predictStartTime: "2024",
          predictEndTime: "2026",
          chartOption: {
            dataId: 1,
            dataName: "series1",
            displayableMode: ["bar", "linear"],
            keyLabel: "x",
            keyUnit: "年",
            valueLabel: "y",
            valueUnit: "元",
            numPrecision: 1.0,
            maxValue: 800,
            minValue: 0,
            dataColor: '#2f89cf',
            isPredict: true,
            isInfo: false,
            data: [
              [2020, 2021, 2022, 2023, 2024, 2025, 2026],
              [100, 200, 300, 400, 500, 600, 700]
            ]
          }
        },
        {
          dataId: 2,
          displayMode: "linear",
          startTime: "2020",
          endTime: "2026",
          predictStartTime: "2024",
          predictEndTime: "2026",
          chartOption: {
            dataId: 2,
            dataName: "series2",
            displayableMode: ["bar", "linear"],
            keyLabel: "x",
            keyUnit: "年",
            valueLabel: "y",
            valueUnit: "元",
            numPrecision: 1.00,
            maxValue: 700,
            minValue: 100,
            dataColor: '#27d08a',
            isPredict: false,
            isInfo: false,
            data: [
              [2020, 2021, 2022, 2023, 2024, 2025, 2026],
              [700, 600, 500, 400, 300, 200, 100]
            ]
          }
        }
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
      this.loadChart();
    },
    loadChart() {
      const that = this;
      const eCharts = this.$echarts.init(document.getElementById('chart-item-linear' + that.id));
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
          data: [],
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
          data: []
        }, {
          axisPointer: {
            show: false
          },
          axisLine: {
            show: false
          },
          position: 'bottom',
          offset: 20,
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          },
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
      // 横坐标标签
      option.xAxis[0].data = data[0].data[0]
      // 1. 系列名字
      option.legend[0] = data[0].dataName
      // 2. 系列样式及数据
      option.series[0] = {
        name: data[0].dataName,
        data: data[0].data[1],
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          color: data[0].dataColor,
          width: 2
        },
        areaStyle: {
          color: new that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(1, 132, 213, 0.4)'
          }, {
            offset: 0.8,
            color: 'rgba(1, 132, 213, 0.1)'
          }], false),
          shadowColor: 'rgba(0, 0, 0, 0.1)',
        },
        itemStyle: {
          color: data[0].dataColor,
          borderColor: 'rgba(221, 220, 107, .1)',
          borderWidth: 12
        },
      };
      // 3. 若为预测数据，则设置虚线样式
      if (data[0].isPredict) {
        option.series[0] = {
          name: data[0].dataName,
          type: 'line',
          data: data[0].data[1].slice(0, 1), // 取前三个数据点
          lineStyle: {
            type: 'solid' // 实线
          }
        };

        option.series[1] = {
          name: data[0].dataName,
          type: 'line',
          data: data[0].data[1].slice(1), // 取剩余的数据点
          lineStyle: {
            type: 'dashed' // 虚线
          }
        };
      }

      if (data.series > 1) {
        // 1. 系列名字
        option.legend[1] = data[1].dataName
        // 2. 系列样式及数据
        option.series[1] = {
          name: data[1].dataName,
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            color: data[1].dataColor,
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
            color: data[1].dataColor,
            borderColor: 'rgba(221, 220, 107, .1)',
            borderWidth: 12
          },
        };
        // 3. 若为预测数据，则设置虚线样式
        if (data[1].isPredict) {
          option.series[1] = {
            name: data[1].dataName,
            type: 'line',
            data: data[1].data[1].slice(0, 1), // 取前三个数据点
            lineStyle: {
              type: 'solid' // 实线
            }
          };

          option.series[1] = {
            name: data[1].dataName,
            type: 'line',
            data: data[1].data[1].slice(1), // 取剩余的数据点
            lineStyle: {
              type: 'dashed' // 虚线
            }
          };
        }
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
      :id="'chart-item-linear-'+ id"
      style="width: 100%; height: 100%;">
  </div>
</template>