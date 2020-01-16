<template>
  <view class="content">
    <view>
      <u-button
        type="danger"
        plain
      >
        这是一个按钮
      </u-button>
      11
      <uv-loading color="red">
        loading
      </uv-loading>
    </view>
  </view>
</template>

<script>
import uButton from '@/components/button.vue';
import uvIcon from '@/components/icon';
import uvLoading from '@/components/loading.vue';

export default {
  components: {
    uvLoading,
    uButton,
    uvIcon,
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
