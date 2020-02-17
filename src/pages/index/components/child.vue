<template>
  <view class="uv-child" >
    这是子组件
  </view>
</template>

<script>

export default {
  name: 'uv-child',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  created() {
  },
  mounted() {
    setTimeout(() => {
      this.$emit('test');
    }, 0)
  }
};
</script>

<style
  scoped
  lang="scss"
>
</style>e