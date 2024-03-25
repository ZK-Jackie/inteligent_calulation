<template>
  <div class="main-box">
    <ul class="clearfix">
      <li>
        <div class="all-box" style="height: 9.6rem">
　　       <div class="all-title">模块标题样式</div>
          <div class="allnav" id="echart1" style="width: 100%; height: 100%"></div>
          <div class="all-box-foot"></div>
        </div>
      </li>

      <li>
        <div class="all-box" style="height: 4.725rem">
          <div class="all-title">政策热点词云图</div>
          <div class="image-container">
            <img ref="image" src="@/assets/WordCloud.jpg" alt="词云图"/>
          </div>
          <div class="all-box-foot"></div>
        </div>
        <div class="all-box" style="height: 4.725rem">
          <div class="all-title">热点政策报告</div>
          <div style="position: relative">
            <el-button icon="el-icon-search" circle size="small" @click="showSearchInput = !showSearchInput"></el-button>
            <el-input v-if="showSearchInput" ref="searchInput" class="search-input" placeholder="请输入感兴趣的内容"
                      prefix-icon="el-icon-search" v-model="input" ></el-input>
          </div>
          <PopularDocument/>
          <div class="all-box-foot"></div>
        </div>
      </li>

    </ul>
  </div>
</template>

<script>
import * as echarts from "echarts";
import PopularDocument from "@/views/PoliciesInfo/PopularDocument.vue";

export default {
  components:{
    PopularDocument
  },
  data(){
    return{
      showSearchInput:false,
      input:""
    }
  },
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
        this.echarts_1()
      },2000)
    },

  },
  mounted() {
    this.load();
    this.$refs.image.onload = () => {
      this.$refs.image.classList.add('loaded');
    };
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

.main-box > ul > li:first-child {
  width: 35%;
}

.main-box > ul > li:nth-child(2) {
  width: 65%;
}

 .image-container {
   width: 830px;
   height: 270px;
   background-image: -webkit-radial-gradient(ellipse farthest-corner at center center, #1b44e4 0%, #020f3a 100%);
   background-image: radial-gradient(ellipse farthest-corner at center center, #1b44e4 0%, #020f3a 100%);
   display: flex;
   justify-content: center;
   align-items: center;
   overflow: hidden;
 }
.image-container img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  opacity: 0; /* 初始设置为透明 */
  transition: opacity 1s; /* 添加透明度过渡效果，持续1秒 */
}

.image-container img.loaded {
  opacity: 1; /* 加载完成后设置为完全不透明 */
}

.search-input {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

</style>