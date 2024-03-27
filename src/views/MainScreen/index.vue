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
          <Gauge name="基金安全指数" data="20%"></Gauge>
          <!-- 导入对应的模块，给对应的echart方法，便于个性化线性不同省份的情况-->
        </Block>
      </li>
      <li>
        <div class="bar">
          <div class="barbox">
             <!--下述区域属于显示对应收入的区域-->
            <ul class="clearfix">
              <li class="pulll_left counter" style="font-family: 'DS DIGHTAL'">12581189</li>
              <li class="pulll_left counter" style="font-family: 'DS DIGHTAL'">3912410</li>
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
import Guangdong from "@/views/MainScreen/components/Guangdong.vue";
import Block from "@/components/hoc/block.vue";
import Map from '@/views/MainScreen/components/Map.vue';
import Gauge from'@/views/reginInfo/charts/components/gauge.vue';

export default {
  components: {Gauge,Map,Block,Guangdong, Annuity_bar, PublicSentiment},
  methods: {
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
    }
  },
  mounted() {
    this.load();
  }
}
</script>

<style scoped>

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