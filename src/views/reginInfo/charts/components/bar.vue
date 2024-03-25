<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
      default: {
        screenId: 1,
        detailId: 1,
        detailSpot: 1,
        detailName: "模块1",
        data: [
          {
            dataId: 1,
            displayMode: "bar",
            startTime: "2020",
            endTime: "2026",
            predictStartTime: "2024",
            predictEndTime: "2026",
            chartOption:{
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
              dataColor: "#494d4d",
              isPredict: true,
              isInfo: false,
              data: [
                [2020, 2021, 2022, 2023, 2024, 2025, 2026],
                [100, 200, 300, 400, 500, 600, 700]
              ]
            },
          },
          {
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
            dataColor: "#3c8686",
            isPredict: false,
            isInfo: false,
            data: [
              [2020, 2021, 2022, 2023, 2024, 2025, 2026],
              [700, 600, 500, 400, 300, 200, 100]
            ]
          }
        ]
      }
    },
    title: {
      type: Array,
      required: true,
    }
  },
  mounted() {

    this.loadChartData();
  },
  methods: {
    async loadChartData() {
      // getCharts()
      /* TODO 图表数据校验
      * 1. series数量对应情况：series.length === seriesName.length，series.length === values.length
      * 2. key&value数量对应：keys.length === values[].length
      * 若出错，返回感叹号错误提示和错误码
      * */
      try{
        await this.$store.dispatch('GetActiveTemplate');
        this.data = this.$store.state.screen.detail[0].data;
        this.title = this.$store.state.screen.detail[0].detailName;
        console.log(this.data);
        console.log(this.title);
        this.loadChart();
      }catch (e) {
        console.error(e)
      }
    },
    loadChart() {
      const that = this;
      const chart = this.$echarts.init(document.getElementById('chart-item-bar-' + that.title));
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
        legend:{
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
            formatter: '{value}'+ data.chartOption.valueUnit,
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
      // 1. 系列名字
      option.legend[0] = data.dataName[0]
      option.series[0] = {
        type: 'bar',
        name: data.dataName[0],
        data: data.values[0],
        barWidth: '35%', //柱子宽度
        itemStyle: {
          color: '#2f89cf',
          opacity: 1,
          borderRadius: 5,
        }
      };
      if (data.series > 1) {
        option.series[1] = {
          type: 'bar',
          data: data.values[1],
          barWidth: '35%', //柱子宽度
          itemStyle: {
            color: '#27d08a',
            opacity: 1,
            borderRadius: 5,
          }
        };
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
       :id="'chart-item-bar-' + title"
       style="width: 100%; height: 100%;">
  </div>
</template>