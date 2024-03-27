<script>
import { UUID } from '@/utils/string'
export default {
  name: 'BarChart',
  props: {
    data: {
      type: Object,
      required: true,
      default: [
        {
          dataId: 1,
          displayMode: "bar",
          startTime: "2020",
          endTime: "2026",
          predictStartTime: "2024",
          predictEndTime: "2026",
          chartOption: {
            dataId: 1,
            dataName: "series1",
            displayableMode: ["bar", "line"],
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
          displayMode: "bar",
          startTime: "2020",
          endTime: "2026",
          predictStartTime: "2024",
          predictEndTime: "2026",
          chartOption: {
            dataId: 2,
            dataName: "series2",
            displayableMode: ["bar", "line"],
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
    async loadChartData() {
      // try{
      //   await this.$store.dispatch('GetActiveTemplate');
      //   this.data = this.$store.state.screen.detail[0].data;
      //   this.title = this.$store.state.screen.detail[0].detailName;
      //   console.log(this.data);
      //   console.log(this.title);
      this.loadChart();
      // }catch (e) {
      //   console.error(e)
      // }
    },
    loadChart() {
      const that = this;
      const chart = this.$echarts.init(document.getElementById('chart-item-bar-' + that.id));
      const data = JSON.parse(JSON.stringify(that.data));
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '0%',
          top: '10px',
          right: '0%',
          bottom: '4%',
          containLabel: true
        },
        legend: {
          data: [],
        },
        xAxis: [{
          type: 'category',
          data: [],
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,.1)",
              width: 1,
              type: "solid"
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            show: true,
            splitNumber: 15,
            color: "rgba(255,255,255,.6)",
            fontSize: '12',
          },
        }],
        yAxis: [{
          type: 'value',
          axisLabel: {
            formatter: '{value}' + data[0].chartOption.valueUnit,
            show: true,
            color: "rgba(255,255,255,.6)",
            fontSize: '12',
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,.1	)",
              width: 1,
              type: "solid"
            },
          },
          splitLine: {
            lineStyle: {
              color: "rgba(255,255,255,.1)",
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
        type: 'bar',
        name: data[0].dataName,
        data: data[0].data[1],
        barWidth: '35%', //柱子宽度
        itemStyle: {
          color: data[0].dataColor,
          opacity: 1,
          borderRadius: 5,
        }
      };
      // 3. 若为预测数据，则设置条纹样式
      if (data[0].isPredict) {
        option.series[0].barCategoryGap = '35%';
        option.series[0].itemStyle = {
          color: data[0].dataColor,
          opacity: 1,
          borderRadius: 5,
          borderType: 'dashed',
          borderWidth: 1,
          borderColor: data[0].dataColor,
        }
      }
      if (data.series > 1) {
        // 1. 系列名字
        option.legend[1] = data[1].dataName
        // 2. 系列样式及数据
        option.series[1] = {
          type: 'bar',
          name: data[1].dataName,
          data: data[1].data[1],
          barWidth: '35%', //柱子宽度
          itemStyle: {
            color: data[1].dataColor,
            opacity: 1,
            borderRadius: 5,
          }
        };
        if (data[1].isPredict) {
          option.series[1].barCategoryGap = '35%';
          option.series[1].itemStyle = {
            color: data[1].dataColor,
            opacity: 1,
            borderRadius: 5,
            borderType: 'dashed',
            borderWidth: 1,
            borderColor: data[1].dataColor,
          }
        }
      }

      // 使用刚指定的配置项和数据显示图表。
      chart.setOption(option);
      window.addEventListener("resize", function () {
        chart.resize();
      });
    }
  },
}
</script>

<template>
  <div class="chart-item-bar"
       :id="'chart-item-bar-' + id"
       style="width: 100%; height: 100%;">
  </div>
</template>