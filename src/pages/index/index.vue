<template>
  <view class="content">
    <image
      class="logo"
      src="/static/logo.png"
    ></image>
    <view>
      <u-button
        type="danger"
        plain
      >
        这是一个按钮
      </u-button>
    </view>
  </view>
</template>

<script>
import uButton from '@/components/button.vue';

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

<style></style>
