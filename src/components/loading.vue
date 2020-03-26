<!-- author: ranwawa -->
<!-- since: 2020/1/16 -->
<!-- desc: 加载 -->
<!-- remark: 主要用于用户等待时的提醒 -->

<template>
  <view
    :class="classes"
    class="uv-loading"
  >
    <view
      v-if="type === 'circular'"
      :style="computedStyle"
      class="uv-loading-icon uv-loading-icon_circular"
    />
    <view
      v-else
      :style="computedStyle"
      class="uv-loading-icon uv-loading-icon_spinner"
    >
      <view class="uv-loading-icon_dot" />
      <view class="uv-loading-icon_dot" />
      <view class="uv-loading-icon_dot" />
      <view class="uv-loading-icon_dot" />
      <view class="uv-loading-icon_dot" />
      <view class="uv-loading-icon_dot" />
      <view class="uv-loading-icon_dot" />
      <view class="uv-loading-icon_dot" />
      <view class="uv-loading-icon_dot" />
      <view class="uv-loading-icon_dot" />
      <view class="uv-loading-icon_dot" />
      <view class="uv-loading-icon_dot" />
    </view>
    <view
      :style="computedTxtStyle"
      class="uv-loading-text"
    >
      <slot />
    </view>
  </view>
</template>
<script>
import { addUnit, bem, computeStyle } from './utils/index';

export default {
  name: 'UvLoading',
  props: {
    // 颜色
    color: {
      type: String,
      default: 'inherit',
    },
    // 图标类型
    type: {
      type: String,
      default: 'circular',
      validator(value) {
        return ['circular', 'spinner'].includes(value);
      },
    },
    // 图标大小
    size: {
      type: [String, Number],
      default: 30,
    },
    // 文本大小
    textSize: {
      type: [String, Number],
      default: 14,
    },
    // 是否垂直对齐
    vertical: {
      type: Boolean,
      default: false,
    },
    // 自定义类
    customClass: {
      type: String,
      default: '',
    },
  },
  computed: {
    classes() {
      const bemClass = bem('loading', {
        vertical: this.vertical,
      });
      return `${this.customClass} ${bemClass}`;
    },
    computedStyle() {
      const size = addUnit(this.size);
      return computeStyle({
        color: this.color,
        width: size,
        height: size,
      });
    },
    computedTxtStyle() {
      const size = addUnit(this.textSize);
      return computeStyle({
        'font-size': size,
      });
    },
  },
};
</script>
<style>
  /* todo 虚拟节点的地方,可能还要做非微信小程序端的兼容 */
  :host {
    font-size: 0;
    line-height: 1;
  }
</style>
<style
  lang="scss"
  scoped
>
  @import "./sass/index";

  $comp: #{$PREFIX}loading;


  @keyframes van-rotate {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  #{$comp} {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: $loading-spinner-color;
    font-size: $font-size-md;

    &-icon {
      position: relative;
      box-sizing: border-box;
      width: $loading-spinner-size;
      max-width: 100%;
      height: $loading-text-font-size;
      max-height: 100%;
      animation: van-rotate $loading-spinner-animation-duration linear infinite;

      &_spinner {
        animation-timing-function: steps(12);
      }

      &_circular {
        border: 1px solid transparent;
        border-top-color: currentColor;
        border-radius: 100%;
      }

      &_dot {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        &::before {
          display: block;
          width: px2rpx(2);
          height: 25%;
          margin: 0 auto;
          content: ' ';
          border-radius: 40%;
          background-color: currentColor;
        }

        @for $i from 1 through 12 {
          &:nth-child(#{$i}) {
            transform: rotate($i * 30deg);
            opacity: 1 - (0.75 / 12) * ($i - 1);
          }
        }
      }


    }

    &-text {
      margin-left: $padding-xs;
      color: $loading-text-color;
      font-size: $loading-text-font-size;
      line-height: $loading-text-line-height;

      &:empty {
        display: none;
      }

    }

    &_vertical {
      flex-direction: column;

      #{$comp}-text {
        margin: $padding-xs 0 0;
      }
    }
  }
</style>
