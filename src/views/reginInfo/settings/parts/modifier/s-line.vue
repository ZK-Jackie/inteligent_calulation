<template>
  <div id="echarts1" style="width: 100%; height: 100%" />
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      paramInfo: {
        id: "1",
        name: "参保率",
        type: "percentage",
        settingType: "line",
        minValue: 0,
        maxValue: 1,
        defaultValue: [
          ["年份", "出生率"],
          [2015, 0.502],
          [2016, 0.603],
          [2017, 0.704],
          [2018, 0.805],
          [2019, 0.907],
          [2020, 0.804],
          [2021, 0.710],
          [2022, 0.612],
          [2023, 0.555],
          [2024, 0.466]
        ]
      }
    }
  },
  methods: {
    echarts_1() {
      var chartDom = document.getElementById('echarts1');
      var lineChart = this.$echarts.init(chartDom);
      var option;

      let symbolSize = 20;
      const data = this.paramInfo.defaultValue;
      option = {
        //悬浮于点上的提示框
        tooltip: {
          triggerOn: 'none',
          formatter: function (params) {
            return (
                '年份: ' +
                params.data[0].toFixed(0) +
                '<br/>大小: ' +
                (params.data[1] * 100).toFixed(1) + '%'
            );
          }
        },
        grid: {
          top: '4%',
          bottom: '12%'
        },
        xAxis: {
          min: 2015,
          max: 2024,
          type: 'value',
          splitNumber: 9,
          axisLine: {
            onZero: false,
            lineStyle: {
              color: "rgba(255,255,255,.1)",
              width: 1,
              type: "solid"
            },
          },
          axisLabel: {
            interval: 0,
            // rotate:50,
            show: true,
            // splitNumber: 9,
            color: "rgba(255,255,255,.6)",
            fontSize: '12',
          },
        },
        yAxis: {
          min: 0.00,
          max: 1.00,
          type: 'value',
          axisLine: {
            onZero: false,
            lineStyle: {
              color: "rgba(255,255,255,.1	)",
              width: 1,
              type: "solid"
            },
          },
          axisLabel: {
            show: true,
            color: "rgba(255,255,255,.6)",
            fontSize: '12',
            formatter: function (value) {
              return (value * 100).toFixed(0) + '%';
            }
          }
        },
        series: [
          {
            id: 'a',
            type: 'line',
            smooth: true,
            symbolSize: symbolSize,
            data: data
          }
        ]
      };
      setTimeout(function () {
        // Add shadow circles (which is not visible) to enable drag.
        lineChart.setOption({
          graphic: data.map(function (item, dataIndex) {
            return {
              type: 'circle',
              position: lineChart.convertToPixel('grid', item),
              shape: {
                cx: 0,
                cy: 0,
                r: symbolSize / 2
              },
              invisible: true,
              draggable: true,
              ondrag: function (dx, dy) {
                onPointDragging(dataIndex, [this.x, this.y]);
              },
              onmousemove: function () {
                showTooltip(dataIndex);
              },
              onmouseout: function () {
                hideTooltip(dataIndex);
              },
              z: 100
            };
          })
        });
      }, 0);
      window.addEventListener('resize', updatePosition);
      lineChart.on('dataZoom', updatePosition);

      function updatePosition() {
        lineChart.resize();
        lineChart.setOption({
          graphic: data.map(function (item, dataIndex) {
            return {
              position: lineChart.convertToPixel('grid', item)
            };
          })
        });
      }

      function showTooltip(dataIndex) {
        lineChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: dataIndex
        });
      }

      function hideTooltip(dataIndex) {
        lineChart.dispatchAction({
          type: 'hideTip'
        });
      }

      function onPointDragging(dataIndex, pos) {
        // TODO 1. 避免用户拖出范围

        // TODO 2. 用户自定义数值

        // TODO 3. 增加无穷大/无穷小项，任何大于100或小于0的数值都会固定在无穷大、无穷小处
        const newY = lineChart.convertFromPixel('grid', pos)[1];
        const oldX = data[dataIndex][0];
        data[dataIndex] = [oldX, newY];
        // Update data
        lineChart.setOption({
          series: [
            {
              id: 'a',
              data: data
            }
          ]
        });
      }

      option && lineChart.setOption(option);
    },
    load() {
      this.echarts_1();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.load();
    });
  }
}
</script>

<style scoped>
.modifier-chart {
  width: 100%;
  height: 100%;
  margin-top: -0.1rem;
  margin-left: 0.1rem;
}
</style>