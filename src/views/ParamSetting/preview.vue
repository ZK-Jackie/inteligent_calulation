<template>
  <div class="preview-views">
    <ul v-if="stage === 1">
      <!--      <li v-for="(item, index) in chartDetails"-->
      <!--          :key="index"-->
      <!--      >-->
      <!--        <Block class="preview-charts"-->
      <!--               height="4rem"-->
      <!--               width="4.182rem"-->
      <!--               :title="index.toString()"-->
      <!--        >-->
      <!--          <Chart :detail="item"-->
      <!--                 :type="item[0].displayMode"-->
      <!--          >-->
      <!--          </Chart>-->
      <!--        </Block>-->
      <li>
        <Block class="preview-charts" height="4rem" width="4.182rem" title="不同生育模式下不同年龄的人数预测情况">
          <ul class="select-ul2">
            <li :class="{ active: activeItem3 === 1}" style="font-size: 12px" @click="activeItem3 = 1">男</li>
            <li :class="{ active: activeItem3 === 2}" style="font-size: 12px" @click="activeItem3 = 2">女</li>
          </ul>
          <ul class="select-ul">
            <li :class="{ active: activeItem2 === 1}" style="font-size: 12px" @click="handleItemClick2(1)">
              高生育模式
            </li>
            <li :class="{ active: activeItem2 === 2}" style="font-size: 12px" @click="handleItemClick2(2)">
              中生育模式
            </li>
            <li :class="{ active: activeItem2 === 3}" style="font-size: 12px" @click="handleItemClick2(3)">
              低生育模式
            </li>
          </ul>
          <Chart v-if="activeItem3===1 && activeItem2===1" type="ring" :detail="population11"/>
          <Chart v-else-if="activeItem3===1 && activeItem2===2" type="ring" :detail="population12"/>
          <Chart v-else-if="activeItem3===1 && activeItem2===3" type="ring" :detail="population13"/>
          <Chart v-else-if="activeItem3===2 && activeItem2===1" type="ring" :detail="population21"/>
          <Chart v-else-if="activeItem3===2 && activeItem2===2" type="ring" :detail="population22"/>
          <Chart v-else-if="activeItem3===2 && activeItem2===3" type="ring" :detail="population23"/>
        </Block>
      </li>
      <li>
        <Block class="preview-charts" height="4rem" width="4.182rem" title="广东省城镇养老保险未来收入和支出">
          <Chart type="bar" :detail="income_and_expense"/>
        </Block>
      </li>
      <li>
        <Block class="preview-charts" height="4rem" width="4.182rem" title="广东省城镇职工的参保人数">
          <Chart type="linear" :detail="participants"/>
        </Block>
      </li>
      <li>
        <Block class="preview-charts" title="人均基本养老金情况" height="4rem" width="4.182rem">
          <BasicPension/>
        </Block>
      </li>
      <li>
        <Block class="preview-charts" title="人均个人养老金情况" height="4rem" width="4.182rem">
          <ul class="select-ul">
            <li :class="{ active: activeItem === 1}" style="font-size: 12px" @click="handleItemClick(1)">老中人</li>
            <li :class="{ active: activeItem === 2}" style="font-size: 12px" @click="handleItemClick(2)">新中人</li>
            <li :class="{ active: activeItem === 3}" style="font-size: 12px" @click="handleItemClick(3)">新人</li>
          </ul>
          <Chart v-if="activeItem===1" type="rose" :detail="pieData_pension01"/>
          <Chart v-else-if="activeItem===2" type="rose" :detail="pieData_pension02"/>
          <Chart v-else-if="activeItem===3" type="rose" :detail="pieData_pension03"/>
        </Block>
      </li>
      <li>
        <Block class="preview-charts" title="人均过渡养老金情况" height="4rem" width="4.182rem">
          <Chart type="radar" :detail="RadarData"/>
        </Block>
      </li>
    </ul>

    <div v-else-if="stage === 2" style="height: auto; width: 15rem; margin-top: 2rem">
      <Chart type="loading" detail=""></Chart>
    </div>

    <ul v-if="stage === 3">
      <li>
        <Block class="preview-charts" height="4rem" width="4.182rem" title="不同生育模式下不同年龄的人数预测情况">
          <ul class="select-ul2">
            <li :class="{ active: activeItem3 === 1}" style="font-size: 12px">男</li>
            <li :class="{ active: activeItem3 === 2}" style="font-size: 12px">女</li>
          </ul>
          <ul class="select-ul">
            <li :class="{ active: activeItem2 === 1}" style="font-size: 12px">
              高生育模式
            </li>
            <li :class="{ active: activeItem2 === 2}" style="font-size: 12px">
              中生育模式
            </li>
            <li :class="{ active: activeItem2 === 3}" style="font-size: 12px">
              低生育模式
            </li>
          </ul>
          <Chart v-if="activeItem3===1 && activeItem2===1" type="ring" :detail="population31"/>
          <Chart v-else-if="activeItem3===1 && activeItem2===2" type="ring" :detail="population32"/>
          <Chart v-else-if="activeItem3===1 && activeItem2===3" type="ring" :detail="population33"/>
          <Chart v-else-if="activeItem3===2 && activeItem2===1" type="ring" :detail="population41"/>
          <Chart v-else-if="activeItem3===2 && activeItem2===2" type="ring" :detail="population42"/>
          <Chart v-else-if="activeItem3===2 && activeItem2===3" type="ring" :detail="population43"/>
        </Block>
      </li>
      <li>
        <Block class="preview-charts" height="4rem" width="4.182rem" title="广东省城镇养老保险未来收入和支出">
          <Chart type="bar" :detail="income_and_expense2"/>
        </Block>
      </li>
      <li>
        <Block class="preview-charts" height="4rem" width="4.182rem" title="广东省城镇职工的参保人数">
          <Chart type="linear" :detail="participants2" :key="1"/>
        </Block>
      </li>
      <li>
        <Block class="preview-charts" title="人均基本养老金情况" height="4rem" width="4.182rem">
          <Chart type="linear" :detail="lineData_basic01" :key="2"/>
        </Block>
      </li>
      <li>
        <Block class="preview-charts" title="人均个人养老金情况" height="4rem" width="4.182rem">
          <ul class="select-ul">
            <li :class="{ active: activeItem === 1}" style="font-size: 12px">老中人</li>
            <li :class="{ active: activeItem === 2}" style="font-size: 12px">新中人</li>
            <li :class="{ active: activeItem === 3}" style="font-size: 12px">新人</li>
          </ul>
          <Chart v-if="activeItem===1" type="rose" :detail="pieData_pension04"/>
          <Chart v-else-if="activeItem===2" type="rose" :detail="pieData_pension05"/>
          <Chart v-else-if="activeItem===3" type="rose" :detail="pieData_pension06"/>
        </Block>
      </li>
      <li>
        <Block class="preview-charts" title="人均过渡养老金情况" height="4rem" width="4.182rem">
          <Chart type="radar" :detail="RadarData2"/>
        </Block>
      </li>
    </ul>

  </div>
</template>

<script>
import {previewTestData} from "@/views/ParamSetting/TestDetail";
import Chart from "@/components/chart.vue";
import BasicPension from "@/views/GDProvince/components/BasicPension.vue";
import {H_population101, M_population102, L_population103,RadarData1} from '@/views/GDProvince/gdData1.js';
import {income_and_expense01, participants01} from "@/views/GDProvince/gdData";
import {
  income_and_expense02,
  participants02,
  H_population201,
  L_population203,
  M_population202,
  pieData_pension201,
  RadarData2,
  pieData_pension202,
  pieData_pension203,
  lineData_basic01
} from "@/views/GDProvince/gdData2";
import {
  barData,
  lineData,
  pieData,
  pieData_pension01,
  pieData_pension02,
  pieData_pension03,
} from "@/components/TestDetail";

let tempArr11 = [];
tempArr11.push(H_population101[0]);
let tempArr12 = [];
tempArr12.push(M_population102[0]);
let tempArr13 = [];
tempArr13.push(L_population103[0]);
let tempArr21 = [];
tempArr21.push(H_population101[1]);
let tempArr22 = [];
tempArr22.push(M_population102[2]);
let tempArr23 = [];
tempArr23.push(L_population103[3]);

let tempArr31 = [];
tempArr31.push(H_population201[0]);
let tempArr32 = [];
tempArr32.push(M_population202[0]);
let tempArr33 = [];
tempArr33.push(L_population203[0]);
let tempArr41 = [];
tempArr41.push(H_population201[1]);
let tempArr42 = [];
tempArr42.push(M_population202[2]);
let tempArr43 = [];
tempArr43.push(L_population203[3]);

export default {
  components: {
    BasicPension,
    Chart
  },
  data() {
    return {
      stage: 1,
      chartDetails: [],
      activeButtonIndex: 0,
      activeItem2: 1,//默认激活的项是'1'
      activeItem: 3,//默认激活的项是'3'
      activeItem3: 1,//默认激活的项是'1'
      participants: participants01,
      RadarData: RadarData1,
      RadarData2: RadarData2,
      pieData_pension01: pieData_pension01,
      pieData_pension02: pieData_pension02,
      pieData_pension03: pieData_pension03,
      population11: tempArr11,
      population12: tempArr12,
      population13: tempArr13,
      population21: tempArr21,
      population22: tempArr22,
      population23: tempArr23,
      income_and_expense: income_and_expense01,
      population31: tempArr31,
      population32: tempArr32,
      population33: tempArr33,
      population41: tempArr41,
      population42: tempArr42,
      population43: tempArr43,
      income_and_expense2: income_and_expense02,
      participants2: participants02,
      pieData_pension04: pieData_pension201,
      pieData_pension05: pieData_pension202,
      pieData_pension06: pieData_pension203,
      lineData_basic01: lineData_basic01
    }
  },
  methods: {
    handleItemClick(index) {
      this.activeItem = index; // 将 activeItem 设置为被点击的项目的索引
    },
    handleItemClick2(index) {
      this.activeItem2 = index; // 将 activeItem 设置为被点击的项目的索引
    },
  },
  mounted() {
    this.chartDetails = previewTestData;
    setTimeout(() => {
      this.stage = 2;
    }, 20000);//8秒后进入加载状态
    setTimeout(() => {
      this.stage = 3;
    }, 25000);//加载5秒进入新页面
  }
}
</script>

<style scoped lang="scss">
.preview-views {
  display: flex;
  justify-content: center;
  align-items: center;
  //灵活换行
  flex-wrap: wrap;
}

.preview-views > ul {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  width: 100%;
  overflow: auto;
  max-height: 5.2rem;
}

/* 隐藏滚动条 */
.preview-views > ul::-webkit-scrollbar {
  display: none;
}

.preview-views > ul > li {
  position: relative;
}

.preview-views .preview-charts {
  margin: 0.1rem;
}

.select-ul {
  position: absolute;
  width: 1rem;
  top: 1rem;
  right: 0;
  z-index: 999;
}

.select-ul > li {
  height: 0.4rem;
  line-height: 0.4rem;
  padding-left: 10px;
  box-sizing: border-box;
  background-color: rgba(14, 148, 234, 0.2);
  cursor: default;
  color: #cdddf7;
}

.select-ul > li.active {
  color: white;
  background: #0e94eb;
}

.select-ul2 {
  position: absolute;
  width: 1rem;
  bottom: 0.2rem;
  left: 0;
  z-index: 999;
}

.select-ul2 > li {
  height: 0.4rem;
  line-height: 0.4rem;
  padding-left: 10px;
  box-sizing: border-box;
  background-color: rgba(14, 148, 234, 0.2);
  cursor: default;
  color: #cdddf7;
}

.select-ul2 > li.active {
  color: white;
  background: #0e94eb;
}
</style>