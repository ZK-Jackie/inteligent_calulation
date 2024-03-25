<template>
    <div >
      <VueSeamlessScroll :data="listData" :class-option="optionSingleHeight" class="seamless-warp">
        <!--上述代码实现滚动效果，数据由listData提供,后面来设置每个列表的高度-->
        <div class="list">
          <div class="item" v-for="(item,index) in listData" :key="index" @click="click_item(item)">
            <div class="info">
              <div v-if="item.importance==1" class="mood importance">重要</div>
              <div v-else-if="item.importance==2" class="mood normal">一般</div>
              <div v-else class="mood not_importance">不重要</div>
              <div class="source">{{item.source_name}}</div>
              <div class="date">{{item.publish_time}}</div>
              <div class="title">{{item.title}}</div>
            </div>
          </div>
        </div>
      </VueSeamlessScroll>
    </div>
</template>

<script>

import VueSeamlessScroll from 'vue-seamless-scroll';

export default {
  components:{
    VueSeamlessScroll
  },
  data() {
    return{
      //先写死，直接用JSON格式提供对应的数据，后期再写活一点
      listData: [
        { importance:1,
          source_name:"中华人民共和国中央人民政府",
          publish_time:"2008-03-28",
          title:"国务院关于完善企业职工基本养老保险制度的决定(国发〔2005〕38号)",
          url:"https://www.gov.cn/zhengce/content/2008-03/28/content_7376.htm"},
        { importance: 2,
          source_name: "中华人民共和国中央人民政府",
          publish_time: "2010-10-28",
          title: "中华人民共和国社会保险法",
          url:"https://www.gov.cn/guoqing/2021-10/29/content_5647616.htm"},
        { importance: 1,
          source_name: "人社通",
          publish_time: "1997-07-16",
          title: "国务院关于建立统一的企业职工基本养老保险制度的决定(国发〔1997〕26号)",
          url:"https://m12333.cn/policy/yi.html"},
        { importance: 1,
          source_name: "南昌市人民政府",
          publish_time:"1991-06-25",
          title: "国务院关于企业职工养老保险制度改革的决定（国发［1991]33号）",
          url:"https://www.nc.gov.cn/ncszf/rsjr/199106/1d3f99267afc4adca768099da7f03ffe.shtml"},
        { importance: 1,
          source_name: "人社通",
          publish_time: "2006-06-29",
          title:"国务院关于深化企业职工养老保险制度改革的通知(国发〔1995〕6号)",
          url:"https://m12333.cn/policy/sbfi.html"},
        { importance: 2,
          source_name: "法制网",
          publish_time: "2022-03-01",
          title:"完善立法保障养老保险“全国一盘棋”",
          url:"http://epaper.legaldaily.com.cn/fzrb/content/20220301/Articel06003GN.htm"
        }
      ],
    }
  },
  computed: {
    optionSingleHeight () {
      return {
        singleHeight: 40
      }
    }
  },
  methods:{
    click_item(item){
      if(item.url){
        window.open(item.url,'_blank')
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.seamless-warp {
  height: 3.24rem;
  overflow: hidden;
}
.list{
  padding: 0 .15rem;
}
.item{
  width: 100%;
  height: .55rem;
  line-height: .5rem;
  position: relative;
  display: flex;
  align-items: center;
  .info{
    display: flex;
    .mood{
      font-size: 16px;
      margin-right: .32rem;
    }
    .importance {
      color: #36bea6;
    }
    .normal {
      color: #ffbc34;
    }
    .not_importance {
      color: #f62d51;
    }
    .source{
      color: #03b4f5;
      font-size: 16px;
      margin-right: .3rem;
    }
    .date{
      color: #03b4f5;
      font-size: 15px;
      margin-right: .3rem;
    }
    .title{
      flex: 1;
      color: #fff;
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.item:hover{
  cursor: pointer;
}

</style>