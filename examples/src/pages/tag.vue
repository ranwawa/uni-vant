<template>
  <view class="uv-doc">
    <uv-platform
      html
      android
    />
    <uv-section title="基础用法">
      <uv-tag>标签</uv-tag>
      <uv-tag type="primary">标签</uv-tag>
      <uv-tag type="success">标签</uv-tag>
      <uv-tag type="danger">标签</uv-tag>
      <uv-tag type="warning">标签</uv-tag>
    </uv-section>
    <uv-section title="空心样式">
      <uv-tag plain>标签</uv-tag>
      <uv-tag plain type="primary">标签</uv-tag>
      <uv-tag plain type="success">标签</uv-tag>
      <uv-tag plain type="danger">标签</uv-tag>
      <uv-tag plain type="warning">标签</uv-tag>
    </uv-section>
    <uv-section title="圆角样式">
      <uv-tag round>标签</uv-tag>
      <uv-tag round type="primary">标签</uv-tag>
      <uv-tag round type="success">标签</uv-tag>
      <uv-tag round type="danger">标签</uv-tag>
      <uv-tag round type="warning">标签</uv-tag>
    </uv-section>
    <uv-section title="标记样式">
      <uv-tag mark>标签</uv-tag>
      <uv-tag mark type="primary">标签</uv-tag>
      <uv-tag mark type="success">标签</uv-tag>
      <uv-tag mark type="danger">标签</uv-tag>
      <uv-tag mark type="warning">标签</uv-tag>
    </uv-section>
    <uv-section title="自定义颜色">
      <uv-tag color="#f2826a">标签</uv-tag>
      <uv-tag color="#f2826a" plain>标签</uv-tag>
      <uv-tag color="#7232dd">标签</uv-tag>
      <uv-tag color="#7232dd" plain>标签</uv-tag>
      <uv-tag color="#ffe1e1" text-color="#ad0000">标签</uv-tag>
    </uv-section>
    <uv-section title="标签大小">
      <uv-tag type="danger">标签</uv-tag>
      <uv-tag type="danger" size="medium">标签</uv-tag>
      <uv-tag type="danger" size="large">标签</uv-tag>
    </uv-section>
    <uv-section title="可关闭标签">
      <uv-tag type="danger" closeable>标签</uv-tag>
    </uv-section>
  </view>
</template>

<script>
import uvTag from '@/components/tag.vue';

export default {
  name: 'tag',
  components: {
    uvTag,
  },
};
</script>

<style
  scoped
  lang="scss"
>
  /deep/ .uv-tag {
    margin-right: 10px;
  }
</style>
