<!--
 * @file
 * @version 0.0.1
 * @author 冉娃娃 <274544338@qq.com>
 * @since 2020/6/24 10:48
-->
<template>
  <view class="uv-doc">
    <uv-platform
      html
      weixin
    />
    <uv-section title="基础用法">
      <uv-nav-bar title="标题" left-arrow/>
    </uv-section>
  </view>
</template>

<script>
import UvNavBar from '../components/nav-bar.vue';

export default {
  components: {
    UvNavBar,
  },
};
</script>

<style scoped>

</style>
