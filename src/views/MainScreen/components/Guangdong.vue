<template>
  <div id="gd-map"></div>
</template>

<script>
import gdMap from '@/assets/Guangdong.json';

//展示有关广东养老保险相关的数据
export default {
  data() {//把对应的数据导出来
    return {
      myChart: null
    }
  },
  methods: {
    map() {
      var that = this;
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('gd-map'));
      this.$echarts.registerMap('guangdong', gdMap);
      this.myChart = myChart
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c} (亿元)',
          showDelay: 0,
          transitionDuration: 2,
        },
        visualMap: {
          left: 'right',
          min: 200,
          max: 15000,
          inRange: {
            color: [
              '#e0f7fa',
              '#b2ebf2',
              '#80deea',
              '#4dd0e1',
              '#26c6da'
            ]
          },
          text: ['High', 'Low'],
          calculable:true
        },
        series: [
          {
            name: '广东各市养老保险收入情况',
            type: 'map',
            map: 'guangdong',
            selectedMode: 'multiple',//表示可以同时选中多个区域
            emphasis: {
              label: {
                show: true
              }
            },
            data: [
              {
                name: '广州市',
                value: 120057.34
              },
              {
                name: '韶关市',
                value: 15477.48
              },
              {
                name: '深圳市',
                value: 131686.1
              },
              {
                name: '珠海市',
                value: 6992.6
              },
              {
                name: '汕头市',
                value: 44045.49
              },
              {
                name: '佛山市',
                value: 40689.64
              },
              {
                name: '江门市',
                value: 37659.78
              },
              {
                name: '湛江市',
                value: 45180.97
              },
              {
                name: '茂名市',
                value: 5204.26
              },
              {
                name: '肇庆市',
                value: 21900.9
              },
              {
                name: '惠州市',
                value: 4918.26
              },
              {
                name: '梅州市',
                value: 5881.84
              },
              {
                name: '汕尾市',
                value: 4178.01
              },
              {
                name: '河源市',
                value: 2227.92
              },
              {
                name: '阳江市',
                value: 2180.98
              },
              {
                name: '清远市',
                value: 9172.94
              },
              {
                name: '东莞市',
                value: 3368
              },
              {
                name: '中山市',
                value: 306.98
              },
              {
                name: '潮州市',
                value: 810.66
              },
              {
                name: '揭阳市',
                value: 542.2
              },
              {
                name: '云浮市',
                value: 256.38
              }
            ]
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      })
    },
    handleChartClick(params) {
      // params.data 包含了用户点击的数据
      var data = params.data;
      console.log(data);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.map();
      this.myChart.on('click', this.handleChartClick);
    });
  }
}

</script>

<style scoped>
#gd-map {
  width: 100%;
  height: 3.7rem;
}
</style>