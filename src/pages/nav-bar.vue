<!--
 * @file
 * @version 0.0.1
 * @author 冉娃娃 <274544338@qq.com>
 * @since 2020/6/24 10:48
-->
<template>
  <view class="uv-doc">
    <uv-platform html weixin />
    <uv-section title="基础用法">
      <uv-nav-bar
        title="标题"
        left-text="返回"
        right-text="按钮"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </uv-section>
    <uv-section title="使用插槽">
      <uv-nav-bar title="标题" left-text="返回" left-arrow>
        <template slot="right">
          <uv-icon name="search" size="18" />
        </template>
      </uv-nav-bar>
    </uv-section>
  </view>
</template>

<script>
import UvIcon from "../components/icon.vue";
import UvNavBar from "../components/nav-bar.vue";

export default {
  components: {
    UvIcon,
    UvNavBar,
  },
  methods: {
    onClickLeft() {
      uni.showToast({
        title: "左侧返回",
      });
    },
    onClickRight() {
      uni.showToast({
        title: "右侧按钮",
      });
    },
  },
};
</script>

<style scoped></style>
