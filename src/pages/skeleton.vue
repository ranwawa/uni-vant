<!--
 * @file 骨架屏演示页面
 * @version 0.0.1
 * @author 冉娃娃 <274544338@qq.com>
 * @since 2020/6/15 13:9
-->
<template>
  <view class="uv-doc">
    <uv-platform html weixin />
    <uv-section title="基础用法">
      <uv-skeleton title :row="3" />
    </uv-section>
    <uv-section title="显示头像">
      <uv-skeleton title avatar :row="3" />
    </uv-section>
    <uv-section title="显示子组件">
      <uv-skeleton :loading="isLoadingSkeleton" title avatar :row="3">
        <view>实际内容</view>
      </uv-skeleton>
      <uv-button size="small" @click="isLoadingSkeleton = !isLoadingSkeleton">
        {{ isLoadingSkeleton ? "显示" : "隐藏" }}
      </uv-button>
    </uv-section>
  </view>
</template>

<script>
import UvSkeleton from "@/components/skeleton.vue";
import UvButton from "@/components/button.vue";

export default {
  components: {
    UvSkeleton,
    UvButton,
  },
  data() {
    return {
      isLoadingSkeleton: true,
    };
  },
};
</script>

<style lang="scss" scoped></style>
