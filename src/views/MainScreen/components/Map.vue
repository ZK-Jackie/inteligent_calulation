<template>
  <div id="china-map">
    <div>
<!--      加入有关时间线的界面-->
    </div>
  </div>
</template>

<script>
import china from '@/assets/china';

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
      var myChart = this.$echarts.init(document.getElementById('china-map'));
      this.$echarts.registerMap('china', china);
      this.myChart = myChart
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c} (亿元)',
          showDelay: 0,
          transitionDuration: 2,
        },
        visualMap: {
          right:'2%',
          bottom:'30%',
          min: 800,
          max: 7800,
          inRange: {
            color: [
              '#e0f7fd',
              '#b2ebf8',
              '#80dee3',
              '#4dd0ce',
              '#26c6b9'
            ]
          },
          text: ['High', 'Low'],
          textStyle:{
            color:'lightblue',
            fontSize:12,
          },
          calculable:true
        },
        series: [
          {
            name: '中国各省养老保险收入情况',
            type: 'map',
            map: 'china',
            selectedMode: 'multiple',//表示可以同时选中多个区域
            emphasis: {
              label: {
                show: true
              }
            },
            data: [
              {
                name: '北京市',
                value: 3435.8
              },
              {
                name: '天津市',
                value: 1225
              },
              {
                name: '河北省',
                value: 2293.8
              },
              {
                name: '山西省',
                value: 1413
              },
              {
                name: '内蒙古自治区',
                value: 1248.3
              },
              {
                name: '辽宁省',
                value: 2761
              },
              {
                name: '吉林省',
                value: 1216.2
              },
              {
                name: '黑龙江',
                value: 1851.8
              },
              {
                name: '上海',
                value: 3705.5
              },
              {
                name: '江苏省',
                value: 4846.9
              },
              {
                name: '浙江省',
                value: 3796.8
              },
              {
                name: '安徽省',
                value: 1883.8
              },
              {
                name: '福建省',
                value: 1220.7
              },
              {
                name: '江西省',
                value: 1389.9
              },
              {
                name: '山东省',
                value: 3558.8
              },
              {
                name: '河南省',
                value: 2292
              },
              {
                name: '湖北省',
                value: 2549.7
              },
              {
                name: '湖南省',
                value: 2019.5
              },
              {
                name: '广东省',
                value: 6419.7
              },
              {
                name: '广西省',
                value: 1313.1
              },
              {
                name: '海南省',
                value: 428.7
              },
              {
                name: '重庆市',
                value: 1688.2
              },
              {
                name: '四川省',
                value: 3701.9
              },
              {
                name: '贵州省',
                value: 928.6
              },
              {
                name: '云南省',
                value: 1153.9
              },
              {
                name: '西藏自治区',
                value: 171.5
              },
              {
                name: '陕西省',
                value: 1696.2
              },
              {
                name: '甘肃省',
                value: 718.2
              },
              {
                name: '青海省',
                value: 291
              },
              {
                name: '宁夏省',
                value: 347.7
              },
              {
                name: '新疆维吾尔自治区',
                value: 1407.8
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
#china-map{
  height: 9.8rem;
  width: 100%;
  z-index: 10;
}
</style>