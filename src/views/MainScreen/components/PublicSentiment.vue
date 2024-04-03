<template>
  <div >
      <vue-seamless-scroll :data="listData" :class-option="optionSingleHeight" class="seamless-warp">
        <div class="list">
          <div class="item" v-for="(item,index) in listData" :key="index" @click="click_item(item)">
            <div class="info">
              <div class="content-title">
                <div class="title">{{item.title}}</div>
                <span  v-if="item.importance==1" class="mood importance">重要</span>
                <span v-else-if="item.importance==2" class="mood normal">一般</span>
                <span v-else class="mood not_importance">不重要</span>
              </div>
              <div class="details">
                <span class="date">{{item.publish_time}}</span>
                <span class="source">{{item.source_name}}</span>
              </div>
            </div>
          </div>
        </div>
      </vue-seamless-scroll>
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
      listData: [
        { importance:1,
          source_name:"中华人民共和国",
          publish_time:"2008-03-28 19:03:20",
          title:"国务院关于完善企业职工",
          url:"https://www.gov.cn/zhengce/content/2008-03/28/content_7376.htm"},
        { importance: 2,
          source_name: "中华人民共和国",
          publish_time: "2010-10-28 18:03:40",
          title: "中华人民共和国社会保险法",
          url:"https://www.gov.cn/guoqing/2021-10/29/content_5647616.htm"},
        { importance: 1,
          source_name: "人社通",
          publish_time: "1997-07-16 12:03:20" ,
          title: "国务院关于建立统一的企业职工",
          url:"https://m12333.cn/policy/yi.html"},
        { importance: 1,
          source_name: "南昌市人民政府",
          publish_time:"1991-06-25 14:05:30",
          title: "国务院关于企业职工养老",
          url:"https://www.nc.gov.cn/ncszf/rsjr/199106/1d3f99267afc4adca768099da7f03ffe.shtml"},
        { importance: 3,
          source_name: "人社通",
          publish_time: "2006-06-29 09:05:40",
          title:"国务院关于深化企业职工",
          url:"https://m12333.cn/policy/sbfi.html"
        },
      ],
    }
  },
  computed: {
    optionSingleHeight () {
      return {
        singleHeight: 43.8
      }
    }
  },
  methods: {
      click_item(item){
        if(item.url){
          window.open(item.url,'_blank')
        }
      }
  }
}
</script>

<style lang="scss" scoped>
.seamless-warp {
  height: 4.25rem;
  overflow: hidden;
}
.item{
  width: 100%;
  height: .73rem;
  display: flex;
  margin-top: .08rem;
  .info{
    flex-direction: column;
    width: 100%;
    display: flex;
    padding: .05rem 0 .08rem 0;
    border: .05rem solid transparent;
    .content-title{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between; /* 让子元素左右对齐 */
    }
    .mood{
      margin-right: .05rem;
      color: #43c0ab;
      padding: .05rem .13rem;
      border-radius: .6rem;
      font-size: 12px !important;
      white-space: nowrap;
      background-color: rgba(245, 249, 255, 0.2);
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
      font-size: 15px;
      margin-top: .06rem;
    }
    .date{
      color: #03b4f5;
      font-size: 15px;
      margin-top: .06rem;
      margin-right: .3rem;
    }
    .title{
      width: calc(100% - .3rem);
      color: #ffffff;
      font-size: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .details {
      display: flex;
    }
  }
}
.item:hover{
  cursor: pointer;
}
</style>