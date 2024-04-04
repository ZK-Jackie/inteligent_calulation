<template>
  <div>
    <div v-for="(component, index) in $slots.default" :key="index">
      <div class="all-box" :style="{height: height, width: width}">
        <div class="all-title" v-if="title !== ''">{{ title }}</div>
        <!--<component :is="component"></component>-->
        <slot> {{component}} </slot>
        <div class="all-box-foot"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HocBlock',
  props: {
    height: {
      type: String,
      required: false,
      default: 'auto'
    },
    width: {
      type: String,
      required: false,
      default: 'auto'
    },
    title:{
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>

</style>