<!-- author: ranwawa -->
<!-- since: 2020/1/16 -->
<!-- desc:  -->
<!-- remark:  -->
<template>
  <view class="uv-doc">
    <uv-section title="加载类型">
      <uv-loading custom-class="demo-loading" />
      <uv-loading
        type="spinner"
        custom-class="demo-loading"
      />
    </uv-section>
    <uv-section title="自定义颜色">
      <uv-loading
        custom-class="demo-loading"
        color="blue"
      />
      <uv-loading
        type="spinner"
        custom-class="demo-loading"
        color="blue"
      />
    </uv-section>
    <uv-section title="加载文案">
      <uv-loading custom-class="demo-loading">
        ...加载中
      </uv-loading>
    </uv-section>
    <uv-section title="垂直排列">
      <uv-loading
        custom-class="demo-loading"
        vertical
      >
        ...加载中
      </uv-loading>
    </uv-section>
  </view>
</template>
<script>
import uvLoading from '@/components/loading.vue';

export default {
  name: 'loading',
  components: {
    uvLoading,
  },
};
</script>
<style lang="scss">
  // 尽量别在父组件操作子组件样式,多端兼容性很难搞
  // 下面的代码在微信小程序会失效
  /*.uv-loading + .uv-loading {*/
  /*  margin-left: 16px;*/
  /*}*/
  .demo-loading {
    margin-right: 16px;
  }
</style>
