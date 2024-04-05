<template>
  <ul class="regin-info-settings">
    <li>
      <Block height="9rem" title="参数选择">
        <Selector :button-list="buttonList"
               @select="handleSelection"/>
      </Block>
    </li>
    <li>
      <Block height="6rem" width="100%" title="计划预览">
        <Preview/>
      </Block>
      <ul style="display: flex">
        <li style="width: 70%; margin-right: .15rem">
          <Block height="2.85rem" title="参数调配">
            <Modifier class="modifier"/>
          </Block>
        </li>
        <li style="width: 30%">
          <Block height="2.85rem" title="计划调配">
            <Plan/>
          </Block>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import Selector from "./selector.vue";
import Preview from "./preview.vue";
import Block from "@/components/block.vue";
import Plan from "@/views/reginInfo/settings/plan.vue";

export default {
  components: {
    Block, Selector, Preview, Plan
  },
  data() {
    return {
      buttonList: [1, 2, 3, 4, 5, 5, 6, 7, 8],
      chooseIndex: 0,

    }
  },
  methods: {
    handleSelection(index) {
      // console.log(index)
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
.regin-info-settings > li {
  float: left;
  padding: 0 .1rem;
  width: 30%;
}

.regin-info-settings > li:nth-child(2) {
  width: 70%;
  padding: 0
}

.modifier {
  height: 100%;
  width: 100%;
}
</style>