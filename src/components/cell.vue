<!-- author: ranwawa -->
<!-- since: 2020/1/21 -->
<!-- desc: 单元格组件 -->

<template>
  <view
    :class="computedClass"
    :style="customStyle"
    :hover-class="computedHoverClass"
    :id="customId"
    hover-stay-item="70"
    @click="handleClick"
  >
    <!-- 左侧图标 -->
    <uv-icon
      v-if="icon"
      :name="icon"
      custom-class="uv-cell_left-icon uv-cell_left-icon-wrap"
    />
    <slot
      v-else
      name="icon"
    />
    <!-- 左侧标题 -->
    <view
      :class="titleClass"
      :style="computedTitleStyle"
      class="uv-cell-title"
    >
      <!-- 上面的标题 -->
      <template v-if="title">
        {{ title }}
      </template>
      <slot
        v-else
        name="title"
      />
      <!-- 下面的说明 -->
      <view
        v-if="computedIsShowLabel"
        class="uv-cell-label"
        :class="labelClass"
      >
        <slot
          v-if="useLabelSlot"
          name="label"
        />
        <template v-else-if="label">
          {{ label }}
        </template>
      </view>
    </view>
    <!-- 右侧值 -->
    <view
      class="uv-cell-value"
      :class="valueClass"
    >
      <template v-if="computedIsShowValue">
        {{ value }}
      </template>
      <slot v-else />
    </view>
    <!-- 右侧图标 -->
    <uv-icon
      v-if="isLink"
      :name="computedRightIconName"
      :custom-class="computedRightIconClass"
    />
    <slot
      v-else
      name="right-icon"
    />
    <slot name="extra" />
  </view>
</template>
<script>
import { bem } from './utils';
import { baseMixin } from './utils/mixins';
import uvIcon from './icon.vue';

export default {
  name: 'uv-cell',
  components: {
    uvIcon,
  },
  mixins: [baseMixin],
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
    // 标题下描述信息
    label: {
      type: String,
      default: '',
    },
    // 是否启用描述信息插槽
    useLabelSlot: {
      type: Boolean,
      default: false,
    },
    // 右侧内容
    value: {
      type: [String, Number],
      default: '',
    },
    // 是否显示箭头
    isLink: {
      type: Boolean,
      default: false,
    },
    // 箭头方向
    arrowDirection: {
      type: String,
      default: '',
      validate(value) {
        return ['', 'up', 'down', 'left'].includes(value);
      },
    },
    // 单元格大小
    size: {
      type: String,
      default: '',
      validate(value) {
        return ['', 'large'].includes(value);
      },
    },
    // 是否显示必填标记
    required: {
      type: Boolean,
      default: false,
    },
    // 内容垂直居中
    center: {
      type: Boolean,
      default: false,
    },
    // 下边框
    border: {
      type: Boolean,
      default: true,
    },
    // 点击反馈
    clickable: {
      type: Boolean,
      default: false,
    },
    // 跳转链接
    url: {
      type: String,
      default: '',
    },
    // 跳转方法
    linkType: {
      type: String,
      default: 'navigateTo',
      validate(value) {
        return ['navigateTo', 'redirectTo', 'switchTab', 'navigateBack']
          .includes(value);
      },
    },
  },
  computed: {
    computedClass() {
      // todo 混合导入的customClass为什么是undefined
      const {
        customClass,
        size,
        center,
        required,
        border,
        clickable,
        isLink,
      } = this;
      const bemClass = bem('cell', [
        size,
        {
          center,
          required,
          borderless: !border,
          clickable: isLink || clickable,
        },
      ]);
      return `${customClass ? `${customClass} ` : ''}${bemClass}`;
    },
    computedHoverClass() {
      return `uv-cell-hover ${this.hoverClass}`;
    },
    computedIsShowValue() {
      return this.value || this.value === 0;
    },
    computedIsShowLabel() {
      return this.useLabelSlot || this.label;
    },
    computedRightIconName() {
      return this.arrowDirection
        ? `arrow-${this.arrowDirection}`
        : 'arrow';
    },
    computedTitleStyle() {
      return this.titleWidth
        ? `max-width: ${this.titleWidth}; min-width: ${this.titleWidth};`
        : '';
    },
    computedRightIconClass() {
      return `${this.rightIconClass} uv-cell_right-icon`;
    },
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e.detail);
      this.jumpLink();
    },
    jumpLink(urlKey = 'url') {
      const url = this[urlKey];
      if (url) {
        uni[this.linkType]({ url });
      }
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


  #{$comp} {
    position: relative;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: $cell-vertical-padding $cell-horizontal-padding;
    background-color: $cell-background-color;
    color: $cell-text-color;
    font-size: $cell-font-size;
    line-height: $cell-line-height;

    &::after {
      @include hairline-bottom($border-color, $padding-md);
    }

    &-borderless::after {
      display: none;
    }

    &-label {
      margin-top: $cell-label-margin-top;
      color: $cell-label-color;
      font-size: $cell-label-font-size;
      line-height: $cell-label-line-height;
    }

    &-title,
    &-value {
      flex: 1;

      &:empty {
        display: none;
      }
    }

    &-value {
      overflow: hidden;
      color: $cell-value-color;
      text-align: right;
      vertical-align: middle;
    }

    &-required {
      overflow: visible;

      &::before {
        position: absolute;
        left: $padding-xs;
        color: $cell-required-color;
        font-size: $cell-label-font-size;
        content: '*';
      }
    }

    &-center {
      align-items: center;
    }

    &-clickable.uv-cell-hover {
      background-color: $cell-active-color;
    }

    &-large {
      padding: {
        top: $cell-large-vertical-padding;
        bottom: $cell-large-vertical-padding;
      };

      #{$comp}-label,
      #{$comp}-title {
        font-size: $cell-large-title-font-size;
      }
    }
  }
</style>
