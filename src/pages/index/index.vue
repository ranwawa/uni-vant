<template>
  <view class="content">
    <view>
      <uv-button
        id="abcde"
        icon="chat"
        loading
        loading-text="abc"
      >
        这是一个按钮2
      </uv-button>
      adfb
    </view>
  </view>
</template>

<script>
import uvButton from '@/components/button.vue';
import uvIcon from '@/components/icon';
import uvLoading from '@/components/loading.vue';

export default {
  components: {
    uvLoading,
    uvButton,
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
