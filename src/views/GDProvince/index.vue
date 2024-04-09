<template>
  <div class="main-box">
    <ul class="clearfix">
      <li>
        <Block height="3.2rem" title="模块标题样式">
          <div class="allnav" id="echart1" style="width: 100%; height: 100%"></div>
        </Block>
        <Block height="3.2rem" title="模块标题样式">
          <div class="allnav" id="echart2"  style="width: 100%; height: 100%"></div>
        </Block>
       　　<Block height="3.2rem">
          <div style="height: 100%; width: 100%">
            <div class="sy" id="fb1"></div>
            <div class="sy" id="fb2"></div>
            <div class="sy" id="fb3"></div>
          </div>
      </Block>
      </li>
      <li>
        <div class="bar">
          <div class="barbox">
            <!--下述区域属于显示对应收入的区域-->
            <ul class="clearfix">
              <li class="pulll_left counter" style="font-family: 'DS DIGHTAL'">{{num1}}
                <!--嵌套对应的环比的数据-->
                <transition name="fade">
                  <div class="icon-color" v-if="showElement">环比
                    <img src="@/assets/icondown.png" height="12">
                    4.7%
                  </div>
                </transition>
              </li>
              <li class="pulll_left counter" style="font-family: 'DS DIGHTAL'">{{num2}}
                <transition name="fade">
                  <div class="icon-color" v-if="showElement">环比
                    <img src="@/assets/iconup.png" height="12">
                    3.5%
                  </div>
                </transition>
              </li>
            </ul>
          </div>
          <div class="barbox2">
            <ul class="clearfix">
              <li class="pulll_left">2023年养老保险总收入情况</li>
              <li class="pulll_left">2023年养老保险总支出情况</li>
            </ul>
          </div>
        </div>
        <div class="map">
          <!--展示地图的地方-->
          <Guangdong/>
          <div class="map2"><img src="@/assets/jt.png"/></div>
        </div>
      </li>
      <li>
        <Block title="预测金额" height="3.4rem">
          <Chart type="bar" :detail="barData"/>
        </Block>
        <Block title="预测" height="3.2rem">
         <Chart type="line" :detail="lineData"/>
        </Block>
        <Block title="模块标题样式" height="2.7rem">
          <Chart type="ring" :detail="pieData"/>
        </Block>
      </li>
    </ul>
  </div>
</template>

<script>
import * as echarts from "echarts";
import Block from "@/components/block.vue";
import Guangdong from "@/views/GDProvince/components/Guangdong.vue";
import Chart from '@/components/chart.vue';
import {barData} from "@/components/TestDetail";
import {lineData} from "@/components/TestDetail";
import {pieData} from "@/components/TestDetail";

export default {
  components: {Chart,Block,Guangdong},
  data() {
    return{
      pieData: pieData,
      barData: barData,
      lineData:lineData,
      num1: 0,
      num2: 0,
      maxNum1: 38581413,//有关最终养老金收入和支出的情况
      maxNum2: 33136439,//有关最终养老金收入和支出的情况
      showElement: false,

    }
  },
  methods: {
    startCounter() {
      let time = 0;
      setInterval(() => {
        time += 13;
        if (this.num1 < this.maxNum1) {
          const increment = time * time; // 使用二次函数来计算增量
          if (this.maxNum1 - this.num1 < increment) { // 如果接近最大值
            this.num1 = this.maxNum1; // 直接设置为最大值
          } else {
            this.num1 += increment;
          }
        }
        if(this.num2 < this.maxNum2) {
          const increment = time * time; // 使用二次函数来计算增量
          if (this.maxNum2- this.num2 < increment) { // 如果接近最大值
            this.num2 = this.maxNum2; // 直接设置为最大值
          } else {
            this.num2 += increment;
          }
        }
      }, 100) // 注意这里的时间间隔已经改为100毫秒，因为我们现在是以0.1秒为单位增加时间
    },
    echarts_1() {
      var that = this;
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('echart1'));

      var option = {
        //  backgroundColor: '#00265f',
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
        xAxis: [{
          type: 'category',
          data: ['商超门店', '教育培训', '房地产', '生活服务', '汽车销售', '旅游酒店', '五金建材'],
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
            // rotate:50,
            show: true,
            splitNumber: 15,
            textStyle: {
              color: "rgba(255,255,255,.6)",
              fontSize: '12',
            },
          },
        }],
        yAxis: [{
          type: 'value',
          axisLabel: {
            //formatter: '{value} %'
            show: true,
            textStyle: {
              color: "rgba(255,255,255,.6)",
              fontSize: '12',
            },
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
        series: [
          {
            type: 'bar',
            data: [200, 300, 300, 900, 1500, 1200, 600],
            barWidth: '35%', //柱子宽度
            // barGap: 1, //柱子之间间距
            itemStyle: {
              normal: {
                color: '#2f89cf',
                opacity: 1,
                barBorderRadius: 5,
              }
            }
          }

        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    echarts_2() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('echart2'));

      var option = {
        //  backgroundColor: '#00265f',
        tooltip: {
          trigger: 'axis',
          axisPointer: {type: 'shadow'}
        },
        grid: {
          left: '0%',
          top: '10px',
          right: '0%',
          bottom: '4%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['浙江', '上海', '江苏', '广东', '北京', '深圳', '安徽'],
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
            // rotate:50,
            show: true,
            splitNumber: 15,
            textStyle: {
              color: "rgba(255,255,255,.6)",
              fontSize: '12',
            },
          },
        }],
        yAxis: [{
          type: 'value',
          axisLabel: {
            //formatter: '{value} %'
            show: true,
            textStyle: {
              color: "rgba(255,255,255,.6)",
              fontSize: '12',
            },
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
        series: [
          {

            type: 'bar',
            data: [1500, 1200, 600, 200, 300, 300, 900],
            barWidth: '35%', //柱子宽度
            // barGap: 1, //柱子之间间距
            itemStyle: {
              normal: {
                color: '#27d08a',
                opacity: 1,
                barBorderRadius: 5,
              }
            }
          }

        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    echarts_31() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('fb1'));
      var option = {
        title: [{
          text: '年龄分布',
          left: 'center',
          textStyle: {
            color: '#fff',
            fontSize: '16'
          }
        }],
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
          data: ['0岁以下', '20-29岁', '30-39岁', '40-49岁', '50岁以上'],
          textStyle: {
            color: 'rgba(255,255,255,.5)',
            fontSize: '12',
          }
        },
        series: [
          {
            name: '年龄分布',
            type: 'pie',
            center: ['50%', '42%'],
            radius: ['40%', '60%'],
            color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab', '#06b4ab', '#06c8ab', '#06dcab', '#06f0ab'],
            label: {show: false},
            labelLine: {show: false},
            data: [
              {value: 1, name: '0岁以下'},
              {value: 4, name: '20-29岁'},
              {value: 2, name: '30-39岁'},
              {value: 2, name: '40-49岁'},
              {value: 1, name: '50岁以上'},
            ]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    echarts_32() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('fb2'));
      var option = {
        title: [{
          text: '职业分布',
          left: 'center',
          textStyle: {
            color: '#fff',
            fontSize: '16'
          }
        }],
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
          data: ['电子商务', '教育', 'IT/互联网', '金融', '学生', '其他'],
          textStyle: {
            color: 'rgba(255,255,255,.5)',
            fontSize: '12',
          }
        },
        series: [
          {
            name: '年龄分布',
            type: 'pie',
            center: ['50%', '42%'],
            radius: ['40%', '60%'],
            color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab', '#06b4ab', '#06c8ab', '#06dcab', '#06f0ab'],
            label: {show: false},
            labelLine: {show: false},
            data: [
              {value: 5, name: '电子商务'},
              {value: 1, name: '教育'},
              {value: 6, name: 'IT/互联网'},
              {value: 2, name: '金融'},
              {value: 1, name: '学生'},
              {value: 1, name: '其他'},
            ]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    echarts_33() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('fb3'));
      var option = {
        title: [{
          text: '兴趣分布',
          left: 'center',
          textStyle: {
            color: '#fff',
            fontSize: '16'
          }
        }],
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
          data: ['汽车', '旅游', '财经', '教育', '软件', '其他'],
          textStyle: {
            color: 'rgba(255,255,255,.5)',
            fontSize: '12',
          }
        },
        series: [
          {
            name: '兴趣分布',
            type: 'pie',
            center: ['50%', '42%'],
            radius: ['40%', '60%'],
            color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab', '#06b4ab', '#06c8ab', '#06dcab', '#06f0ab'],
            label: {show: false},
            labelLine: {show: false},
            data: [
              {value: 2, name: '汽车'},
              {value: 3, name: '旅游'},
              {value: 1, name: '财经'},
              {value: 4, name: '教育'},
              {value: 8, name: '软件'},
              {value: 1, name: '其他'},
            ]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    load(){
      // 延迟初始化图表，直到可以确定DOM元素已经有了正确的大小
      setTimeout(()=>{
        this.echarts_1();
        this.echarts_2();
        this.echarts_31();
        this.echarts_32();
        this.echarts_33();
      },2000)
      setTimeout(() => {
        this.showElement = true;
      }, 500);
    }
  },
  mounted() {
    this.load();
    this.startCounter();
  }
}
</script>

<style scoped>
.fade-enter-active {
  animation: zoomInOut .5s;
}
.fade-enter {
  opacity: 0;
}

@keyframes zoomInOut {
  0% {
    transform: scale(1);
    opacity: 0;
  }
  70% {
    transform: scale(2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.icon-color{
  color:#2f89cf;
  font-size: 11px;
  position: absolute;
  top:0;
  right:0;
}

.main-box {
  padding: .1rem .1rem 0rem .1rem;
}

.main-box > ul {
}

.main-box > ul > li {
  float: left;
  padding: 0 .1rem
}

.main-box > ul > li {
  width: 30%
}

.main-box > ul > li:nth-child(2) {
  width: 40%;
  padding: 0
}




.bar {
  background: rgba(101, 132, 226, .1);
  padding: .15rem;
}

.barbox li, .barbox2 li {
  width: 50%;
  text-align: center;
  position: relative;
  z-index: 100;
}

.barbox:before,
.barbox:after {
  position: absolute;
  width: .3rem;
  height: .1rem;
  content: "";
}

.barbox:before {
  border-left: 2px solid #02a6b5;
  left: 0;
  border-top: 2px solid #02a6b5;
}

.barbox:after {
  border-right: 2px solid #02a6b5;
  right: 0;
  bottom: 0;
  border-bottom: 2px solid #02a6b5;
}

.barbox li:first-child:before {
  position: absolute;
  content: "";
  height: 50%;
  width: 1px;
  background: rgba(255, 255, 255, .2);
  right: 0;
  top: 25%;
}

.barbox {
  border: 1px solid rgba(25, 186, 139, .17);
  position: relative;
}

.barbox li {
  font-size: .7rem;
  color: #ffeb7b;
  padding: .05rem 0;
  font-family: electronicFont;
  font-weight: bold;
}

.barbox2 li {
  font-size: .19rem;
  color: rgba(255, 255, 255, .7);
  padding-top: .1rem;
}

.map {
  position: relative;
  height: 7.3rem;
  z-index: 9;
}

.map4 {
  width: 200%;
  height: 7rem;
  position: relative;
  left: -50%;
  top: 4%;
  margin-top: .2rem;
  z-index: 5;
}

.map1, .map2, .map3 {
  position: absolute;
  opacity: .5
}

.map1 {
  width: 6.43rem;
  z-index: 2;
  top: .45rem;
  left: .7rem;
  animation: myfirst2 15s infinite linear;
}

.map2 {
  width: 5.66rem;
  top: .85rem;
  left: 1.2rem;
  z-index: 3;
  opacity: 0.2;
  animation: myfirst 10s infinite linear;
}

.map3 {
  width: 5.18rem;
  top: 1.07rem;
  left: 1.4rem;
  z-index: 1;
}
</style>