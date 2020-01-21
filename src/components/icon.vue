<!-- author: ranwawa -->
<!-- since: 2020/1/16 -->
<!-- desc: 图标 -->
<!-- remark:  -->
<template>
  <view
    class="uv-icon"
    @click="$emit('click')"
  >
    <uv-info
      v-if="isShowInfo"
      :dot="dot"
      :info="info"
      custom-class="uv-icon-info"
    />
    <image
      v-if="isImage"
      :class="classes"
      :style="computedStyle"
      class="van-icon-image"
      mode="aspectFit"
      :src="name"
    />
    <view
      v-else
      :class="classes"
      :style="computedStyle"
    />
  </view>
</template>
<script>
import uvInfo from '@/components/info.vue';
import { addUnit, computeStyle } from './utils/index';
import mixins from '@/components/utils/mixins';

export default {
  name: 'icon',
  mixins: [mixins],
  components: {
    uvInfo,
  },
  props: {
    // 图标名/链接
    name: {
      type: String,
      default: '',
    },
    // 右上角小红点
    dot: {
      type: Boolean,
      default: false,
    },
    // 右上角文字
    info: {
      type: String,
      default: '',
    },
    // 图标颜色
    color: {
      type: String,
      default: 'inherit',
    },
    // 尺寸
    size: {
      type: [String, Number],
      default: 'inherit',
    },
    // 自定义样式
    customStyle: {
      type: String,
      default: '',
    },
    // 类前缀
    classPrefix: {
      type: String,
      default: 'van-icon',
    },
    // 外部样式类
    customClass: {
      type: String,
      default: '',
    },
  },
  computed: {
    isShowInfo() {
      return this.dot || this.info;
    },
    isImage() {
      return this.name.indexOf('/') !== -1;
    },
    classes() {
      let pre = this.classPrefix;
      let icon = this.isImage ? '' : `${pre}-${this.name}`;
      return `${pre} ${icon} ${this.customClass}`;
    },
    computedStyle() {
      const size = addUnit(this.size);
      const other = {};
      if (this.size !== 'inherit') {
        if (this.isImage) {
          other.width = size;
          other.height = size;
        } else {
          other['font-size'] = size;
        }
      }
      if (this.color !== 'inherit') {
        other.color = this.color;
      }
      const style = computeStyle(other);
      return `${this.customStyle} ${style}`;
    },
  },
};
</script>
<style>
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

</style>
<style
  lang="scss"
  scoped
>
  @import "./sass/index";
  /* todo 本地资源会增加首包大小,也无法及时同步 */
  @import "./sass/font";

  $comp: #{$PREFIX}icon;

  #{$comp} {
    position: relative;
    display: inline-block;
    // fix the vertical align with text
    line-height: 1;
  }
</style>
