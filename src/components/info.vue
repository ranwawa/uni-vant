<!-- author: ranwawa -->
<!-- since: 2020/1/15 -->
<!-- desc: 提示信息 -->
<!-- remark: 一般用于新消息通知或状态提示 -->
<template>
  <view
    v-if="isShowUvInfo"
    :class="classes"
    :style="customStyle"
    class="uv-info"
  >
    {{ uvInfo }}
  </view>
</template>
<script>
import { bem } from './utils';

export default {
  name: 'UvInfo',
  props: {
    // 小红点
    dot: {
      type: Boolean,
      default: false,
    },
    // 提示文字
    info: {
      type: [String, Number],
      default: '',
    },
    // 自定义样式
    customStyle: {
      type: String,
      default: '',
    },
    // 外部样式类
    customClass: {
      type: String,
      default: '',
    },
  },
  computed: {
    isShowUvInfo() {
      return this.info !== '' || this.dot;
    },
    uvInfo() {
      return this.dot ? '' : this.info;
    },
    classes() {
      const bemClass = bem('info', {
        dot: this.dot,
      });
      return `${this.customClass} ${bemClass}`;
    },
  },
};
</script>
<style
  lang="scss"
  scoped
>
  @import "sass/index";

  $comp: #{$PREFIX}info;


  #{$comp} {
    position: absolute;
    top: 0;
    right: 0;
    box-sizing: border-box;
    min-width: $info-size;
    padding: $info-padding;
    transform: translate(50%, -50%);
    transform-origin: 100%;
    text-align: center;
    white-space: nowrap;
    color: $info-color;
    border: $info-border-width solid $white;
    border-radius: $info-size;
    background: $info-background-color;
    font-family: $info-font-family;
    font-size: $info-font-size;
    font-weight: $info-font-weight;
    line-height: call($info-size - $info-border-width * 2);

    &-dot {
      width: $info-dot-size;
      min-width: 0;
      height: $info-dot-size;
      border-radius: 100%;
      background-color: $info-dot-color;
    }
  }
</style>
