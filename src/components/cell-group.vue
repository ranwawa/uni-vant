<template>
  <view class="cell-group">
    <view
      v-if="title"
      class="uv-cell-group-title"
    >
      {{ title }}
    </view>
    <view
      class="uv-cell-group"
      :id="customId"
      :class="computedClass"
      :style="customStyle"
    >
      <slot />
    </view>
  </view>
</template>

<script>
import { baseMixin } from './utils/mixins';

export default {
  name: 'UvCellGroup',
  mixins: [baseMixin],
  props: {
    // 标题
    title: {
      type: String,
      default: '',
    },
    // 上下边框
    border: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    computedClass() {
      const cls = this.border ? ' uv-hairline-top-bottom' : '';
      console.log(`${this.customClass || ''}${cls}`);
      return `${this.customClass || ''}${cls}`;
    },
  },
};
</script>

<style
  scoped
  lang="scss"
>
  @import "./sass/_index.scss";

  $comp: #{$PREFIX}cell-group;

  #{$comp} {
    &-title {
      padding: $cell-group-title-padding;
      font-size: $cell-group-title-font-size;
      line-height: $cell-group-title-line-height;
      color: $cell-group-title-color;
    }
  }
</style>
