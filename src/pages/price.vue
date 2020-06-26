<!--
 * @file 价格组件示例页面
 * @version 0.0.1
 * @author 冉娃娃 <274544338@qq.com>
 * @since 2020/6/26 18:51
-->
<template>
  <view class="uv-doc">
    <uv-platform html weixin />
    <uv-section title="基础用法">
      <uv-price></uv-price>
      <uv-price amount="168"></uv-price>
      <uv-price amount="168.8888"></uv-price>
    </uv-section>
    <uv-section title="尺寸">
      <uv-price amount="168.8888" size="22"></uv-price>
    </uv-section>
    <uv-section title="颜色">
      <uv-price amount="168.8888" color="#000"></uv-price>
    </uv-section>
    <uv-section title="小数点位数">
      <uv-price amount="168.8888" :decimal="4"></uv-price>
    </uv-section>
  </view>
</template>

<script>
import UvPrice from "../components/price.vue";

export default {
  components: {
    UvPrice,
  },
};
</script>

<style lang="scss" scoped></style>
