<template>
  <view class="uv-doc">
    <uv-platform
      html
      weixin
      zhifubao
      android
    />
    <uv-section title="基础用法">
      <uv-cell
        title="展示弹出层"
        is-link
        @click="show1 = true"
      />
    </uv-section>
    <uv-section title="弹出位置">
      <uv-cell
        title="顶部弹出"
        is-link
        @click="handleClick('top')"
      />
      <uv-cell
        title="右侧弹出"
        is-link
        @click="handleClick('right')"
      />
      <uv-cell
        title="底部弹出"
        is-link
        @click="handleClick('bottom')"
      />
      <uv-cell
        title="左侧弹出"
        is-link
        @click="handleClick('left')"
      />
    </uv-section>
    <uv-section title="关闭图标">
      <uv-cell title="关闭图标" is-link @click="show3 = true" />
      <uv-cell title="自定义图标" is-link @click="show4 = true" />
      <uv-cell title="图标位置" is-link @click="show5 = true" />
    </uv-section>
    <uv-section title="圆角弹框">
      <uv-cell title="圆角弹框" is-link @click="show6 = true" />
    </uv-section>
    <uv-popup
      :show="show1"
      @close="show1 = false"
    >
      <view class="content">内容</view>
    </uv-popup>

    <uv-popup
      :show="show2"
      :position="position"
      @close="show2 = false"
    >
      <view class="content">内容</view>
    </uv-popup>
    <uv-popup
      :show="show3"
      closeable
      position="bottom"
      custom-style="height: 20%"
      @close="show3 = false"
    />

    <!-- 自定义图标 -->
    <uv-popup
      :show="show4"
      closeable
      close-icon="close"
      position="bottom"
      custom-style="height: 20%"
      @close="show4 = false"
    />

    <!-- 图标位置 -->
    <uv-popup
      :show="show5"
      closeable
      close-icon-position="top-left"
      position="bottom"
      custom-style="height: 20%"
      @close="show5 = false"
    />
    <uv-popup
      :show="show6"
      round
      position="bottom"
      custom-style="height: 20%"
      @close="show6 = false"
    />
  </view>
</template>

<script>
import uvCell from '@/components/cell.vue';
import uvPopup from '@/components/popup.vue';

export default {
  name: 'popup',
  components: {
    uvCell,
    uvPopup,
  },
  data() {
    return {
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false,
      position: 'top',
    };
  },
  methods: {
    handleClick(pos) {
      this.position = pos;
      this.show2 = true;
    },
  },
};
</script>

<style
  scoped
  lang="scss"
>
  .content {
    position: static;
    padding: 60rpx;
  }
</style>
