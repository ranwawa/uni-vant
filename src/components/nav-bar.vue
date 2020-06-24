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
    <view
      class="uv-nav-bar__left"
      @click="handleClickLeft"
    >
      <uv-icon
        v-if="leftArrow"
        custom-class="uv-nav-tab__arrow"
        name="arrow-left"
      ></uv-icon>
      <text
        v-if="leftText"
        class="uv-nav-bar__text"
      >{{ leftText }}
      </text>
      <slot name="left"></slot>
    </view>
    <view class="uv-nav-bar__title">
      {{ title }} {{ safeTop }}
      <slot name="title"></slot>
    </view>
    <view
      class="uv-nav-bar__right"
      @click="handleClickRight"
    >
      <text
        v-if="rightText"
        class="uv-nav-tab__text"
      >
        {{ rightText }}
      </text>
      <slot name="right"></slot>
    </view>
  </view>
</template>

<script>
import UvIcon from './icon.vue';
import { baseMixin, bem } from './utils';

export default {
  name: 'navBar',
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
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    rightText: {
      type: String,
      default: '',
    },
    border: {
      type: Boolean,
      default: true,
    },
    fixed: {
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
      return `z-index: ${this.zIndex}; ${this.customStyle}; padding-top: ${this.safeTop};`;
    },
    computedRootClass() {
      const bemClass = bem('nav-bar', {
        fixed: this.fixed,
        border: this.border,
      });
      return `${this.customClass} ${bemClass}`;
    },
  },
  created() {
    this.setSafeArea();
  },
  methods: {
    handleClickLeft() {
      this.$emit('click-left');
    },
    handleClickRight() {
      this.$emit('click-right');
    },
    setSafeArea() {
      const { top } = this.getSafeArea();
      this.safeTop = `${top * 2}rpx`;
    },
    getSafeArea() {
      const { safeArea } = uni.getSystemInfoSync();
      return safeArea || {
        top: 0, // 安全区域左上角横坐标
        right: 0, // 安全区域右下角横坐标
        bottom: 0, // 安全区域左上角纵坐标
        left: 0, // 安全区域右下角纵坐标
      };
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
    display: flex;
    align-items: center;
    height: $nav-bar-height;
    line-height: 1.5;
    text-align: center;
    background-color: $nav-bar-background-color;
    user-select: none;

    .van-icon {
      color: $nav-bar-icon-color;
    }

    &__arrow {
      min-width: 1em;
      margin-right: $padding-base;
      font-size: $nav-bar-arrow-size;
    }

    &-fixed {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
    }

    &__title {
      max-width: 60%;
      margin: 0 auto;
      color: $nav-bar-title-text-color;
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
    }
  }
</style>
