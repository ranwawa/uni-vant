<template>
  <view class="doc-platform">
    <uv-icon
      class-prefix="iconfont"
      name="html"
      size="24"
      :color="computedHtmlColor"
    />
    <uv-icon
      class-prefix="iconfont"
      name="weixin"
      size="24"
      :color="computedWeixinColor"
    />
    <uv-icon
      class-prefix="iconfont"
      name="zhifubao"
      size="24"
      :color="computedZhifubaoColor"
    />
    <uv-icon
      class-prefix="iconfont"
      name="baidu"
      size="24"
      :color="computedBaiduColor"
    />
    <uv-icon
      class-prefix="iconfont"
      name="douyin"
      size="24"
      :color="computedDouyinColor"
    />
    <uv-icon
      class-prefix="iconfont"
      name="qq"
      size="24"
      :color="computedQQColor"
    />
    <uv-icon
      class-prefix="iconfont"
      name="android"
      size="24"
      :color="computedAndroidColor"
    />
    <uv-icon
      class-prefix="iconfont"
      name="ios"
      size="24"
      :color="computedIosColor"
    />
  </view>
</template>

<script>
import uvIcon from '@/components/icon.vue';

const COLOR_DEFAULT = '#eee';
const COLOR = {
  HTML: '#de502c',
  WEIXIN: '#30ce39',
  ZHIFUBAO: '#06b4fd',
  BAIDU: '#3245df',
  DOUYIN: '#170b19',
  QQ: '#4cafea',
  ANDROID: '#a4c53a',
  IOS: '#adbacd',
};
export default {
  name: 'doc-platform',
  components: {
    uvIcon,
  },
  props: {
    weixin: {
      type: Boolean,
      default: false,
    },
    qq: {
      type: Boolean,
      default: false,
    },
    android: {
      type: Boolean,
      default: false,
    },
    html: {
      type: Boolean,
      default: false,
    },
    baidu: {
      type: Boolean,
      default: false,
    },
    douyin: {
      type: Boolean,
      default: false,
    },
    zhifubao: {
      type: Boolean,
      default: false,
    },
    ios: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedHtmlColor() {
      return this.html ? COLOR.HTML : COLOR_DEFAULT;
    },
    computedWeixinColor() {
      return this.weixin ? COLOR.WEIXIN : COLOR_DEFAULT;
    },
    computedZhifubaoColor() {
      return this.zhifubao ? COLOR.ZHIFUBAO : COLOR_DEFAULT;
    },
    computedBaiduColor() {
      return this.baidu ? COLOR.BAIDU : COLOR_DEFAULT;
    },
    computedDouyinColor() {
      return this.douyin ? COLOR.DOUYIN : COLOR_DEFAULT;
    },
    computedQQColor() {
      return this.qq ? COLOR.QQ : COLOR_DEFAULT;
    },
    computedAndroidColor() {
      return this.android ? COLOR.ANDROID : COLOR_DEFAULT;
    },
    computedIosColor() {
      return this.ios ? COLOR.IOS : COLOR_DEFAULT;
    },
  },
};
</script>

<style
  scoped
  lang="scss"
>
  .doc-platform {
    display: flex;
    justify-content: space-between;
    padding: 16px 0;
  }
</style>
