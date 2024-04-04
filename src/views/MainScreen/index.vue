<template>
  <div class="main-box">
    <ul class="clearfix">
      <li>
          <Block height="4.9rem" title="模块标题样式">
            <div class="allnav" id="echart1" style="width: 100%; height: 100%"></div>
          </Block>
        <Block height="4.3 rem" title="养老基金安全指数">
          <!--展示有关广东地图的活动-->
<!--          <Guangdong/>-->
          <Gauge :data="gaugeData"></Gauge>
          <!-- 导入对应的模块，给对应的echart方法，便于个性化线性不同省份的情况-->
        </Block>
      </li>
      <li>
        <div class="bar">
          <div class="barbox">
             <!--下述区域属于显示对应收入的区域-->
            <ul class="clearfix">
              <li class="pulll_left counter" style="font-family: 'DS DIGHTAL'">{{counter1}}
                <!--嵌套对应的环比的数据-->
                <transition name="fade">
                <div class="icon-color" v-if="showElement">环比
                  <img src="@/assets/icondown.png" height="12">
                  4.7%
                </div>
                </transition>
              </li>
              <li class="pulll_left counter" style="font-family: 'DS DIGHTAL'">{{counter2}}
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
          <Map/>
          <div class="map2"><img src="@/assets/jt.png"/></div>
        </div>
      </li>

      <li>
        <Block height="4.9 rem" title="舆情资讯动态展示">
          <PublicSentiment/>
          <!--展示有关词语图，简单实验一下-->
          <!-- 结果表明如果小部分使用词云图，要么效果突兀，要么就是字体无法渲染-->
          <!--          <WorldCloud/>-->
        </Block>
        <Block height="4.3rem" title="专业养老保险公司年金业务情况">
          <Annuity_bar/>
        </Block>
      </li>
    </ul>
  </div>
</template>

<script>
import * as echarts from "echarts";
import PublicSentiment from "@/views/MainScreen/components/PublicSentiment.vue";
import Annuity_bar from "@/views/MainScreen/components/Annuity_bar.vue";
import Guangdong from "@/views/GDProvince/components/Guangdong.vue";
import Map from '@/views/MainScreen/components/Map.vue';
import Gauge from '@/components/charts/gauge.vue';

export default {
  components: {Gauge,Map,Guangdong, Annuity_bar, PublicSentiment},
  data()　{
    return {
      gaugeData: {
        dataId: 1,
        displayMode: "gauge",
        startTime: null,
        endTime: null,
        predictStartTime: null,
        predictEndTime: null,
        chartOption: {
          dataId: 1,
          dataName: "gauge1",
          displayableMode: ["gauge"],
          keyLabel: null,
          keyUnit: null,
          valueLabel: null,
          valueUnit: null,
          numPrecision: 1.0,
          maxValue: 100,
          minValue: 0,
          dataColor: ['#7CFFB2', '#58D9F9', '#FDDD60', '#FF6E76'],
          isPredict: true,
          isInfo: false,
          data: [
            ["2024-3-28T00:25:52"],
            [80]
          ]
        }
      },
      counter1: 0,
      counter2: 0,
      maxCounter1: 125811899,//有关最终养老金收入和支出的情况
      maxCounter2: 39124108,//有关最终养老金收入和支出的情况
      showElement: false,
    }
  },
  methods: {
    startCounter() {
      let time = 0;
      setInterval(() => {
        time += 19;
        if (this.counter1 < this.maxCounter1) {
          const increment = time * time; // 使用二次函数来计算增量
          if (this.maxCounter1 - this.counter1 < increment) { // 如果接近最大值
            this.counter1 = this.maxCounter1; // 直接设置为最大值
          } else {
            this.counter1 += increment;
          }
        }
        if(this.counter2 < this.maxCounter2) {
          const increment = time * time; // 使用二次函数来计算增量
          if (this.maxCounter2 - this.counter2 < increment) { // 如果接近最大值
            this.counter2 = this.maxCounter2; // 直接设置为最大值
          } else {
            this.counter2 += increment;
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
    load(){
      // 延迟初始化图表，直到可以确定DOM元素已经有了正确的大小
      setTimeout(()=>{
        this.echarts_1();
      },1000)
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
.main-box > ul {
}

.main-box > ul > li {
  float: left;
  padding: 0 .1rem
}

.main-box > ul > li {
  width: 27%
}

.main-box > ul > li:nth-child(2) {
  width: 46%;
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
  height: 8rem;
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
  width: 6.93rem;
  z-index: 2;
  top: .35rem;
  left: 1.1rem;
  animation: myfirst2 15s infinite linear;
}

.map2 {
  width: 6.06rem;
  top: .85rem;
  left: 1.60rem;
  z-index: 3;
  opacity: 0.2;
  animation: myfirst 10s infinite linear;
}

.map3 {
  width: 5.70rem;
  top: 1.0rem;
  left: 1.75rem;
  z-index: 1;
}

</style>