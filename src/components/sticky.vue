<template>
  <view
    class="uv-sticky"
    :class="customClass"
    :style="computedRootStyle"
    :id="customId"
  >
    <view
      :class="computedWrapClass"
      :style="computedWrapStyle"
    >
      <slot />
    </view>
  </view>
</template>

<script>
import { baseMixin, bem, getRect } from './utils/index';

const ROOT_ELEMENT = '.uv-sticky';
export default {
  name: 'uv-sticky',
  mixins: [baseMixin, getRect],
  data() {
    return {
      contentObserver: null,
      containerObserver: null,
      height: 0,
      fixed: false,
      wrapStyle: '',
      containerStyle: '',
    };
  },
  props: {
    // 吸顶时与顶部的距离，单位px
    offsetTop: {
      type: Number,
      default: 0,
    },
    // 吸顶时的 z-index
    zIndex: {
      type: Number,
      default: 99,
    },
    // todo 这个是干什么用的?
    // 一个函数，返回容器对应的 NodesRef 节点
    container: {
      type: Function,
      default: null,
    },
    // 是否禁用固定功能
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedRootStyle() {
      return `${this.customStyle}${this.containerStyle}`;
    },
    computedWrapClass() {
      return bem('sticky-wrap', { fixed: this.fixed });
    },
    computedWrapStyle() {
      return this.wrapStyle;
    },
  },
  mounted() {
    this.initObserver();
  },
  watch: {
    offsetTop() {
      this.observeContent();
    },
    container() {
      if (this.height) {
        this.observeContainer();
      }
    },
    fixed() {
      this.$nextTick(() => {
        this.setStyle();
      });
    },
    disabled(newValue) {
      newValue ? this.disconnectObserver() : this.initObserver();
    },
  },
  methods: {
    async initObserver() {
      if (this.disabled) {
        return;
      }
      this.disconnectObserver();
      const rect = await this.getRect(ROOT_ELEMENT);
      this.height = rect.height;
      this.$nextTick(() => {
        this.observeContent();
        this.observeContainer();
      });
    },
    disconnectObserver(observerName) {
      if (observerName) {
        this[observerName] && this[observerName].disconnect();
      } else {
        this.contentObserver && this.contentObserver.disconnect();
        this.containerObserver && this.containerObserver.disconnect();
      }
    },
    createObserver(observerName, top) {
      this.disconnectObserver(observerName);
      const observer = uni.createIntersectionObserver({
        thresholds: [0, 1],
      });
      this.contentObserver = observer;
      observer
        .relativeToViewport({ top })
        .observe(
          ROOT_ELEMENT,
          res => {
            this.setFixed(res.boundingClientRect.top);
          },
        );
    },
    observeContent() {
      if (this.disabled) {
        return;
      }
      const { offsetTop } = this;
      this.createObserver('contentObserver', -offsetTop);
    },
    async observeContainer() {
      if (this.disabled) {
        return;
      }
      if (typeof this.container !== 'function') {
        return;
      }
      const { height } = this;
      const rect = await this.getContainerRect();
      this.containerHeight = rect.height;
      this.createObserver('containerObserver', this.containerHeight - height);
    },
    getContainerRect() {
      const nodesRef = this.container();
      return new Promise(resolve => {
        nodesRef
          .boundingClientRect(resolve)
          .exact();
      });
    },
    setFixed(top) {
      const { offsetTop, height, containerHeight } = this;
      // todo 这一坨后面再来细究
      const fixed =
        containerHeight && height
          ? top > height - containerHeight && top < offsetTop
          : top < offsetTop;
      this.fixed = fixed;
      this.$emit(
        'scroll',
        {
          scrollTop: top,
          isFixed: fixed,
        },
      );
    },
    setStyle() {
      const { offsetTop, height, fixed, zIndex } = this;
      this.wrapStyle = '';
      this.containerStyle = '';
      if (fixed) {
        this.wrapStyle = `top: ${offsetTop}px;`;
        this.containerStyle = `height: ${height}px; z-index: ${zIndex};`;
      }
    },
  },
  destroyed() {
    this.disconnectObserver();
  },
};
</script>

<style
  scoped
  lang="scss"
>
  @import './sass/_index.scss';

  $comp: #{$PREFIX}sticky;

  #{$comp} {
    position: relative;

    &-wrap-fixed {
      position: fixed;
      right: 0;
      left: 0;
    }
  }
</style>