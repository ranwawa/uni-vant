<!--
 * @file 导航栏
 * @version 0.0.1
 * @author 冉娃娃 <274544338@qq.com>
 * @since 2020/6/24 10:29
-->
<template>
  <view
    class="uv-nav-bar"
    :class="computedRootClass"
    :style="computedRootStyle"
  >
    <view class="uv-nav-bar__status" :style="{ height: safeTop }"></view>
    <view class="uv-nav-bar__wrapper">
      <view class="uv-nav-bar__left" @click="handleClickLeft">
        <uv-icon
          v-if="leftArrow"
          custom-class="uv-nav-tab__arrow"
          name="arrow-left"
        ></uv-icon>
        <text v-if="leftText" class="uv-nav-bar__text">
          {{ leftText }}
        </text>
        <slot name="left"></slot>
      </view>
      <view class="uv-nav-bar__title">
        {{ title }}
        <slot name="title"></slot>
      </view>
      <view class="uv-nav-bar__right" @click="handleClickRight">
        <text v-if="rightText" class="uv-nav-bar__text">
          {{ rightText }}
        </text>
        <slot name="right"></slot>
      </view>
    </view>
  </view>
</template>

<script>
import UvIcon from "./icon.vue";
import { baseMixin, bem } from "./utils";

export default {
  name: "navBar",
  components: {
    UvIcon,
  },
  mixins: [baseMixin],
  data() {
    return {
      safeTop: 0,
    };
  },
  props: {
    leftArrow: {
      type: Boolean,
      default: false,
    },
    leftText: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    rightText: {
      type: String,
      default: "",
    },
    border: {
      type: Boolean,
      default: true,
    },
    fixed: {
      type: Boolean,
      default: false,
    },
    sticky: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: Boolean,
      default: false,
    },
    zIndex: {
      type: [String, Number],
      default: 1,
    },
  },
  computed: {
    computedRootStyle() {
      return `z-index: ${this.zIndex}; ${this.customStyle};`;
    },
    computedRootClass() {
      const bemClass = bem("nav-bar", {
        fixed: !this.sticky && this.fixed, // 优先使用sticky
        border: this.border,
        sticky: this.sticky,
      });
      return `${this.customClass} ${bemClass}`;
    },
  },
  created() {
    this.setSafeArea();
  },
  methods: {
    handleClickLeft() {
      this.$emit("click-left");
    },
    handleClickRight() {
      this.$emit("click-right");
    },
    setSafeArea() {
      const { top } = this.getSafeArea();
      this.safeTop = `${top}px`;
      // 这里不能使用rpx,因为小程序胶囊上边距在各尺寸下是固定的px,如果用rpx的法,在大屏会无法对齐
    },
    getSafeArea() {
      const { safeArea } = uni.getSystemInfoSync();
      return (
        safeArea || {
          top: 0, // 安全区域左上角横坐标
          right: 0, // 安全区域右下角横坐标
          bottom: 0, // 安全区域左上角纵坐标
          left: 0, // 安全区域右下角纵坐标
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./sass/index";

$comp: #{$PREFIX}nav-bar;
#{$comp} {
  position: relative;
  z-index: $nav-bar-z-index;
  background-color: $nav-bar-background-color;

  .van-icon {
    color: $nav-bar-icon-color;
  }

  &__wrapper {
    position: relative;
    display: flex;
    align-items: center;
    height: $nav-bar-height;
    padding-top: env(safe-area-inset-top);
    background: inherit;
    line-height: 1.5;
    text-align: center;
    user-select: none;
  }

  &-fixed {
    position: fixed;
  }

  &-sticky {
    position: sticky;
  }

  &-fixed,
  &-sticky {
    top: 0;
    left: 0;
    width: 100%;
  }

  &-border::after {
    @include hairline-bottom;
  }

  &__title {
    max-width: 60%;
    margin: 0 auto;
    font-weight: $font-weight-bold;
    font-size: $nav-bar-title-font-size;
  }

  &__left,
  &__right {
    position: absolute;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    padding: 0 $padding-md;
    font-size: $font-size-md;
    cursor: pointer;

    &:active {
      opacity: $active-opacity;
    }
  }

  &__left {
    left: 0;
  }

  &__right {
    right: 0;
  }

  &__text {
    color: $nav-bar-text-color;
    line-height: 1.5;
  }
}
</style>
