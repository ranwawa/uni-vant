<!--
 * @file 骨架屏演示页面
 * @version 0.0.1
 * @author 冉娃娃 <274544338@qq.com>
 * @since 2020/6/15 13:9
-->
<template>
  <view class="uv-doc">
    <uv-platform
      html
      weixin
    />
    <uv-section title="基础用法">
      <uv-skeleton title :row="3"/>
    </uv-section>
    <uv-section title="显示头像">
      <uv-skeleton title avatar :row="3" />
    </uv-section>
  </view>

</template>

<script>
import UvSkeleton from '@/components/skeleton.vue';

export default {
  components: {
    UvSkeleton,
  },
};
</script>

<style
  lang="scss"
  scoped
>

</style>
