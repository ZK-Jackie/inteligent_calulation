<script>
import * as echarts from "echarts";
// import {getCharts} from '@/api/charts'

export default {
  name: 'chartItem',
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
        color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab', '#06b4ab', '#06c8ab', '#06dcab', '#06f0ab'],
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
          color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab', '#06b4ab', '#06c8ab', '#06dcab', '#06f0ab'],
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
      :id="'chart-item-ring-'+ name"
      style="width: 100%; height: 100%;">
  </div>
</template>