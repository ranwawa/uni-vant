<template>
  <view class="uv-parent">
    这是父组件
    <view>
      {{ str }}
      <slot />
    </view>
  </view>
</template>

<script>
export default {
  name: 'uv-parent',
  data() {
    return {
      componentName: 'uv-parent',
      tabs: [],
      str: '',
    };
  },
  watch: {
    tabs(newValue, oldValue) {
      console.log(newValue);
      this.str = JSON.stringify(newValue);
    },
  },
  mounted() {
    this.$on('test', function () {
      console.log(123);
    });
  }
};
</script>

<style
  scoped
  lang="scss"
>

</style>