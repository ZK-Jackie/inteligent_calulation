<script>
import {UUID} from "@/utils/string";

export default {
  name: 'RingPieChart',
  props: {
    data: {
      type: Object,
      required: true,
      default: [
        {
          dataId: 1,
          displayMode: "ring",
          startTime: "2020",
          endTime: "2026",
          predictStartTime: "2024",
          predictEndTime: "2026",
          chartOption: {
            dataId: 1,
            dataName: "series1",
            displayableMode: ["ring"],
            keyLabel: "x",
            keyUnit: "年",
            valueLabel: "y",
            valueUnit: "元",
            numPrecision: 1.0,
            maxValue: 800,
            minValue: 0,
            dataColor: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab', '#06b4ab', '#06c8ab', '#06dcab', '#06f0ab'],
            isPredict: false,
            isInfo: false,
            data: [
              [2020, 2021, 2022, 2023, 2024, 2025, 2026],
              [100, 200, 300, 400, 500, 600, 700]
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
      const eCharts = this.$echarts.init(document.getElementById('chart-item-ring-' + that.id));
      const data = JSON.parse(JSON.stringify(that.data));
      // console.log(that.chartData);
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)",
          position: function (p) {   //其中p为当前鼠标的位置
            return [p[0] + 10, p[1] - 10];
          }
        },
        legend: {
          top: '70%',
          itemWidth: 10,
          itemHeight: 10,
          data: data.keys,
          textStyle: {
            color: 'rgba(255,255,255,.5)',
            fontSize: '12',
          }
        },
        series: []
      };
      // 填充数据
      // 1. 修正格式
      let data0 = [];
      for (let i = 0; i < data.keys.length; i++) {
        data0.push({value: data.values[0][i], name: data.keys[i]});
      }
      option.series[0] = {
        name: data.seriesName[0],
        type: 'pie',
        center: ['50%', '42%'],
        radius: ['40%', '60%'],
        color: data[0].dataColor,
        label: {show: false},
        labelLine: {show: false},
        data: data0
      }
      if (data.series > 1) {
        let data1 = [];
        for (let i = 0; i < data.keys.length; i++) {
          data1.push({value: data.values[1][i], name: data.keys[i]});
        }
        option.series[1] = {
          name: data.seriesName[1],
          type: 'pie',
          center: ['50%', '42%'],
          radius: ['15%', '30%'],
          color: data[0].dataColor,
          label: {show: false},
          labelLine: {show: false},
          data: data1
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
      class="chart-item-ring"
      :id="'chart-item-ring-'+ id"
      style="width: 100%; height: 100%;">
  </div>
</template>