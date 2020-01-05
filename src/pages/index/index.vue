<template>
  <view class="content">
    <image
      class="logo"
      src="/static/logo.png"
    ></image>
    <view>
      <u-button>这是一个按钮</u-button>
    </view>
  </view>
</template>

<script>
import uButton from '../../../components/button';

export default {
  components: {
    uButton,
  },
  data() {
    return {
      title: 'Hello',
    };
  },
  onLoad() {
  },
  methods: {},
};
</script>

<style>
  .content {
    text-align: center;
    height: 400 upx;
  }
  .logo {
    height: 200 upx;
    width: 200 upx;
    margin-top: 200 upx;
  }
  .title {
    font-size: 36 upx;
    color: #8f8f94;
  }
</style>
