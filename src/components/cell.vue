<!-- author: ranwawa -->
<!-- since: 2020/1/21 -->
<!-- desc: 单元格组件 -->

<template>
  <view
    :class="computedClass"
    :style="customStyle"
    class="uv-cell"
    :hover-class="`uv-cell-hover ` + hoverClass "
    hover-stay-item="70"
    @click="$emit('click')"
  >
    <!-- 左侧图标 -->
    <uv-icon
      v-if="icon"
      class="uv-cell_left-icon-wrap"
      :name="icon"
      custom-class="van-cell_left-icon"
    />
    <slot
      v-else
      name="icon"
    />
    <!-- 左侧标题 -->
    <div
      :class="titleClass"
      class="uv-cell-title"
    >
      <template v-if="title">
        {{ title }}
      </template>
      <slot
        v-else
        name="title"
      ></slot>
    </div>
  </view>
</template>
<script>
import bem from '@/components/utils';
import mixins from '@/components/utils/mixins';
import uvIcon from './icon';

export default {
  name: 'cell',
  components: {
    uvIcon,
  },
  mixins: {
    mixins,
  },
  props: {
    // 左侧标题样式类
    titleClass: {
      type: String,
      default: '',
    },
    // 描述信息样式类
    labelClass: {
      type: String,
      default: '',
    },
    // 右侧内容样式类
    valueClass: {
      type: String,
      default: '',
    },
    // 右侧图标样式类
    rightIconClass: {
      type: String,
      default: '',
    },
    // 交互样式类
    hoverClass: {
      type: String,
      default: '',
    },
    // 左侧图标
    icon: {
      type: String,
      default: '',
    },
    // 左侧标题
    title: {
      type: String,
      default: '',
    },
    // 标题宽度
    titleWidth: {
      type: [String, Number],
      default: '',
    },
    // 右侧内容
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    computedClass() {
      const {
        customClass,
      } = this;
      const bemClass = bem('cell');
      return `${customClass} ${bemClass}`;
    },
  },
};
</script>
<style
  lang="scss"
  scoped
>
  @import './sass/index';

  $comp: #{$PREFIX}cell;

  $cell-line-height: 24px;
  $cell-icon-size: 16px;

  #{$comp} {
    &_left-icon-wrap,
    &_right-icon-wrap {
      display: flex;
      align-items: center;
      height: $cell-line-height;
      font-size: $cell-icon-size;
    }

    &_left-icon-wrap {
      margin-right: 5px;
    }
  }
</style>
