<!-- author: ranwawa -->
<!-- since: 2020/2/18 -->
<!-- desc:  -->
<!-- remark:  -->
<template>
  <view class="uv-doc">
    <uv-platform
      html
      weixin
      android
    />
    <uv-section title="基础用法">
      <uv-button @click="handleClick('show1')">显示遮罩层</uv-button>
    </uv-section>
    <uv-section title="嵌入内容">
      <uv-button @click="handleClick('show2')">嵌入内容</uv-button>
    </uv-section>
    <uv-overlay
      :show="show1"
      @click="handleHide('show1')"
    />
    <uv-overlay
      :show="show2"
      @click="handleHide('show2')"
    >
      <view class="content" @click.stop/>
    </uv-overlay>
  </view>
</template>
<script>
import uvButton from '@/components/button.vue';
import uvOverlay from '@/components/overlay.vue';

export default {
  name: 'overlay',
  components: {
    uvButton,
    uvOverlay,
  },
  data() {
    return {
      show1: false,
      show2: false,
    };
  },
  methods: {
    handleClick(prop) {
      this[prop] = !this[prop];
    },
    handleHide(prop) {
      this[prop] = !this[prop];
    },
  },
};
</script>
<style
  lang="scss"
  scoped
>
  .content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 400rpx;
    height: 400rpx;
    margin: auto;
    background-color: #fff;
  }
</style>
