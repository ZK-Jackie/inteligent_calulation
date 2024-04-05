<script>
import {UUID} from "@/utils/string";
import {formatNumber} from "@/utils/number";

export default {
  name: "ModifierLinear",
  props: {
    id: {
      type: String,
      default: () => UUID()
    },
    options: {
      type: Array,
      required: true
    }
  },
  watch: {
    options: {
      handler: function (newVal) {
        if (newVal) {
          console.log(newVal);
          this.loadChart();
        }
      },
      deep: true
    }
  },
  mounted() {
    this.loadChart();
  },
  data() {
    return {
      selectorValue: '',
      selectorOptions: [
        {
          value: '1',
          label: '选项1'
        },
        {
          value: '2',
          label: '选项2'
        },
        {
          value: '3',
          label: '选项3'
        }
      ]
    }
  },
  methods: {
    loadChart() {
      const that = this;
      const chart = this.$echarts.init(document.getElementById('modifier-linear-' + this.id));
      //点大小
      const symbolSize = 10;
      //数据
      const data = this.options[0].data;

      let option = {
        grid: {
          left: '1%',
          top: '8%',
          right: '1%',
          bottom: '8%',
          containLabel: true
        },
        xAxis: [
          {
            min: -1,
            max: 4,
            type: 'value',
            axisLine: {
              onZero: false,
              lineStyle: {
                color: 'rgba(255,255,255,.1)',
                width: 1,
                type: 'solid'
              }
            },
            axisLabel: {
              color: 'rgba(255,255,255,.6)',
              fontSize: '12',
              showMaxLabel: false,
              showMinLabel: false
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.2)'
              }
            }
          }
        ],
        yAxis: [
          {
            min: 100,
            max: 400,
            type: 'value',
            axisLine: {
              onZero: false,
              lineStyle: {
                color: 'rgba(255,255,255,.1	)',
                width: 1,
                type: 'solid'
              }
            },
            axisLabel: {
              formatter: '{value}' /**设置项5：y轴数据单位**/,
              show: true,
              color: 'rgba(255,255,255,.6)',
              fontSize: 12
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.2)'
              }
            }
          }
        ],
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: 0,
            filterMode: 'none',
            bottom: '0%',
            minSpan: 50,     /*单位是百分比*/
            maxSpan: 50,     /*单位是百分比*/
          },
          // {
          //   type: 'inside',
          //   xAxisIndex: 0,
          //   filterMode: 'none'
          // },
        ],
        series: [
          {
            type: 'line',
            smooth: true,
            symbolSize: symbolSize,
            data: data,
            label: {
              show: true,
              position: 'top',
              color: 'rgba(255,255,255,.6)',
              formatter: ''
            },
          }
        ]
      };
      setTimeout(function () {
        // Add shadow circles (which is not visible) to enable drag.
        chart.setOption({
          graphic: data.map(function (item, dataIndex) {
            return {
              type: 'circle',
              position: chart.convertToPixel('grid', item),
              shape: {
                cx: 0,
                cy: 0,
                r: symbolSize / 2
              },
              invisible: true,
              draggable: true,
              ondrag: function (dx, dy) {
                onPointDragging(dataIndex, [this.x, this.y]);
              },
              ondragend: function (dx, dy) {
                onPointDragEnd(dataIndex, [this.x, this.y]);
              },
              onmousemove: function () {
                showTooltip(dataIndex);
              },
              onmouseout: function () {
                hideTooltip(dataIndex);
              },
              z: 100
            };
          })
        });
      }, 0);
      window.addEventListener('resize', updatePosition);
      chart.on('dataZoom', updatePosition);

      /**************数据填充*************/
      //tooltip显示精度
      option.series[0].label.formatter = function (params) {
        return formatNumber(params.value[1], params.value[2]) + params.value[3];
      }
      //x最值
      option.xAxis[0].min = data[0][0] - 1;
      option.xAxis[0].max = data[data.length - 1][0] + 1;
      //x标签
      option.xAxis[0].axisLabel.formatter = function (value) {
        return that.options[0].xAxisTags[value] + that.options[0].keyUnit;
      }
      //y最值
      option.yAxis[0].min = that.options[0].minValue;
      option.yAxis[0].max = that.options[0].maxValue;
      //y标签
      option.yAxis[0].axisLabel.formatter = function (value) {
        return formatNumber(value, that.options[0].numPrecision);
      }
      //zoom
      if (data.length >= 6) {
        option.dataZoom[0].minSpan = Math.floor(6 / data.length * 100);
        option.dataZoom[0].maxSpan = Math.floor(6 / data.length * 100);
      } else {
        option.dataZoom[0].minSpan = 100;
        option.dataZoom[0].maxSpan = 100;
      }

      /************数据填充结束************/

      /**************控制函数*************/
      function updatePosition() {
        chart.setOption({
          graphic: data.map(function (item, dataIndex) {
            return {
              position: chart.convertToPixel('grid', item)
            };
          })
        });
      }

      function showTooltip(dataIndex) {
        chart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: dataIndex
        });
      }

      function hideTooltip(dataIndex) {
        chart.dispatchAction({
          type: 'hideTip'
        });
      }

      function onPointDragging(dataIndex, pos) {
        // 获取新的坐标
        let newY = chart.convertFromPixel('grid', pos)[1];
        // 检查新的坐标是否在图表的范围内
        if (newY < option.yAxis[0].min || newY > option.yAxis[0].max) {
          // 如果不在范围内，就不更新数据点的位置
          return;
        }
        // 保持x坐标不变
        const oldX = data[dataIndex][0];
        data[dataIndex] = [oldX, newY, that.options[0].numPrecision, that.options[0].valueUnit];
        // 更新同步数据
        chart.setOption({
          series: [{
            data: data
          }]
        });
        // 更新显示位置
        chart.setOption({
          graphic: data.map(function (item, itemIndex) {
            return {
              position: itemIndex === dataIndex ? chart.convertToPixel('grid', [oldX, newY]) : chart.convertToPixel('grid', item)
            };
          })
        });
      }

      function onPointDragEnd(dataIndex, pos) {
        // 获取新的坐标
        let newY = chart.convertFromPixel('grid', pos)[1];
        // 检查新的坐标是否在图表的范围内
        if (newY < option.yAxis[0].min || newY > option.yAxis[0].max) {
          // 如果不在范围内，就将数据点的位置重置为边界上的位置
          newY = newY < option.yAxis[0].min ? option.yAxis[0].min : option.yAxis[0].max;
          const oldX = data[dataIndex][0];
          data[dataIndex] = [oldX, newY, that.options[0].numPrecision, that.options[0].valueUnit];
          chart.setOption({
            series: [{
              data: data
            }]
          });
        }
      }

      /************控制函数结束***********/

      option && chart.setOption(option);
    }
  },
}

</script>

<template>
  <div class="modifier-linear">
    <div class="modifier-linear-top">
      <el-select v-model="selectorValue"
                 placeholder="请选择"
                 style="margin: 0.1rem">
        <el-option
            v-for="item in selectorOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" plain>重置</el-button>
    </div>
    <div :id="'modifier-linear-' + id" style="width: 100%; height: 100%">
    </div>
  </div>
</template>