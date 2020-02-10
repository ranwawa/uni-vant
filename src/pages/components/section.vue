<!-- author: ranwawa -->
<!-- since: 2020/1/16 -->
<!-- desc:  -->
<!-- remark:  -->
<template>
  <view class="uv-doc-section">
    <view class="uv-doc-section">
      <view
        v-if="title"
        class="uv-doc-section_title"
      >
        {{ title }}
      </view>
      <view class="uv-doc-section_body">
        <slot />
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'uv-section',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>
<style
  lang="scss"
  scoped
>

</style>
