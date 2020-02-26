<!-- author: ranwawa -->
<!-- since: 2020/2/24 -->
<!-- desc:  -->
<!-- remark:  -->
<template>
  <view class="uv-doc">
    <uv-platform
      html
      weixin
    />
    <uv-section title="基础用法">
      <uv-result />
    </uv-section>
    <uv-section title="自定义文字">
      <uv-result
        page-title="审核中"
        content-title="已成功提交申请"
        content-desc="预计7个工作日内完成入驻审核，请耐心等待~"
        button-text="返回首页"
        button-url="/pages/index"
      />
    </uv-section>
    <uv-section title="切换风格">
      <uv-result type="success"/>
      <uv-result type="info"/>
      <uv-result type="warning"/>
      <uv-result type="danger"/>
    </uv-section>
  </view>
</template>
<script>
import uvResult from '@/components/result.vue';

export default {
  name: 'result',
  components: {
    uvResult,
  },
};
</script>
<style
  lang="scss"
  scoped
>
 /deep/ .uv-result {
   margin: 20px auto;
 }
</style>
