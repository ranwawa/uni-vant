<template>
  <uv-transition
    :style="computedStyle"
    :custom-class="computedCustomClass"
    :custom-style="computedCustomStyle"
    :custom-id="customId"
    :show="show"
    :duration="duration"
    @click="handleClick"
    @touchmove.stop
  >
    <slot />
  </uv-transition>

</template>

<script>
import { baseMixin, bem } from './utils/index';
import uvTransition from './transition.vue';

export default {
  name: 'UvOverlay',
  components: {
    uvTransition,
  },
  mixins: [baseMixin],
  props: {
    // 是否展示遮罩层
    show: {
      type: Boolean,
      default: false,
    },
    // 动画时长，单位秒
    // todo 这里文档上说的是s,实际用的是ms
    duration: {
      type: Number,
      default: 300,
    },
    // z-index 层级
    zIndex: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    computedStyle() {
      const { customStyle, zIndex } = this;
      return `z-index: ${zIndex};${customStyle}`;
    },
    computedCustomClass() {
      return `uv-overlay ${this.customClass}`;
    },
    computedCustomStyle() {
      return `${this.customClass}${this.computedStyle}`;
    },
  },
  methods: {
    handleClick() {
      this.$emit('click');
    },
  },
};
</script>
