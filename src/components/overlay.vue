<template>
  <uv-transition
    class="uv-overlay"
    :custom-class="customClass"
    :custom-id="customId"
    :show="show"
    :duration="duration"
    :style="computedStyle"
    @click.native="handleClick"
    @touchmove.stop
  >
    <slot />
  </uv-transition>

</template>

<script>
import { baseMixin, bem } from './utils/index';
import uvTransition from './transition';

export default {
  name: 'uv-overlay',
  components: {
    uvTransition
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
  },
  methods: {
    handleClick() {
      this.$emit('click');
    },
  },
};
</script>

<style
  scoped
  lang="scss"
>
  @import './sass/_index.scss';

  $comp: #{$PREFIX}overlay;

  #{$comp} {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $overlay-background-color;
  }
</style>