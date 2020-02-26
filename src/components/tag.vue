<template>
  <view
    :id="customId"
    :class="computedClass"
    :style="computedStyle"
  >
    <slot />
    <uv-icon
      v-if="closeable"
      name="cross"
      custom-class="uv-tag-close"
      @click="handleClick"
    />
  </view>
</template>

<script>
import { baseMixin, bem, computeStyle } from './utils/index';
import uvIcon from './icon.vue';

const TYPE_LIST = ['default', 'primary', 'success', 'danger', 'warning'];
const SIZE_LIST = ['', 'medium', 'large'];
export default {
  name: 'uv-tag',
  mixins: [baseMixin],
  components: {
    uvIcon,
  },
  props: {
    // 类型
    type: {
      type: String,
      default: 'default',
      validate: (value) => TYPE_LIST.includes(value),
    },
    // 大小
    size: {
      type: String,
      default: '',
      validate: (value) => SIZE_LIST.includes(value),
    },
    // 标签颜色
    color: {
      type: String,
      default: '',
    },
    // 是否为空心样式
    plain: {
      type: Boolean,
      default: false,
    },
    // 是否为圆角样式
    round: {
      type: Boolean,
      default: false,
    },
    // 是否为标记样式
    mark: {
      type: Boolean,
      default: false,
    },
    // 文本颜色，优先级高于color属性
    textColor: {
      type: String,
      default: '',
    },
    // 可关闭标签
    closeable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedClass() {
      const {
        type, size, mark, plain, round, customClass,
      } = this;
      const bemClass = bem('tag', [type, size, { mark, plain, round }]);
      return `${customClass} ${
        bemClass} ${plain ? 'uv-hairline-surround' : ''}`;
    },
    computedStyle() {
      const {
        color, plain, textColor, customStyle,
      } = this;
      const style = {
        'background-color': (color && !plain) ? color : '',
        color: (textColor || (color && plain)) ? (textColor || color) : '',
      };
      console.log(`${customStyle} ${computeStyle(style)}`);
      return `${customStyle} ${computeStyle(style)}`;
    },
  },
  methods: {
    handleClick() {
      this.$emit('close');
    },
  },
};
</script>

<style
  scoped
  lang="scss"
>
  @import './sass/_index.scss';

  // Tag
  $tag-padding: .2em .5em;
  $tag-font-size: $font-size-xs;
  $tag-medium-font-size: $font-size-sm;
  $tag-large-font-size: $font-size-md;
  $tag-text-color: $white;
  $tag-border-radius: .2em;
  $tag-round-border-radius: $border-radius-max;
  $tag-dander-color: $red;
  $tag-primary-color: $blue;
  $tag-success-color: $green;
  $tag-warning-color: $orange;
  $tag-default-color: $gray-6;
  $tag-plain-background-color: $white;
  $comp: #{$PREFIX}tag;

  #{$comp} {
    display: inline-flex;
    align-items: center;
    line-height: normal;
    padding: $tag-padding;
    color: $tag-text-color;
    font-size: $tag-font-size;
    border-radius: $tag-border-radius;

    &::after {
      border-color: currentColor;
      border-radius: $tag-border-radius * 2;
    }

    &-default {
      background-color: $tag-default-color;

      &.uv-tag-plain {
        color: $tag-default-color;
      }
    }

    &-danger {
      background-color: $tag-dander-color;

      &.uv-tag-plain {
        color: $tag-dander-color;
      }
    }

    &-primary {
      background-color: $tag-primary-color;

      &.uv-tag-plain {
        color: $tag-primary-color;
      }
    }

    &-success {
      background-color: $tag-success-color;

      &.uv-tag-plain {
        color: $tag-success-color;
      }
    }

    &-warning {
      background-color: $tag-warning-color;

      &.uv-tag-plain {
        color: $tag-warning-color;
      }
    }

    &-plain {
      background-color: $tag-plain-background-color;
    }

    &-mark {
      padding-right: 0.7em;

      &,
      &::after {
        border-radius: 0 $tag-round-border-radius $tag-round-border-radius 0;
      }
    }

    &-round {
      &,
      &::after {
        border-radius: $tag-round-border-radius;
      }
    }

    &-medium {
      font-size: $tag-medium-font-size;
    }

    &-large {
      font-size: $tag-large-font-size;
    }

    &-close {
      margin-left: 2px;
    }
  }
</style>
