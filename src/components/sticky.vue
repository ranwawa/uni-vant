<template>
  <view
    :class="customClass"
    :style="computedRootStyle"
    class="uv-sticky"
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
// clip from this.data as it will throw an observe bug in vue
const OBSERVER = {
  contentObserver: null,
  containerObserver: null,
};
const ROOT_ELEMENT = '.uv-sticky';
export default {
  name: 'uv-sticky',
  mixins: [baseMixin, getRect],
  data() {
    return {
      height: 0,
      fixed: false,
      wrapStyle: '',
      containerStyle: '',
      windowTop: uni.getSystemInfoSync().windowTop,
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
      if (newValue) {
        this.disconnectObserver();
      } else {
        this.initObserver();
      }
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
      if (observerName && this[observerName]) {
        this[observerName].disconnect();
      } else {
        if (this.contentObserver) {
          this.contentObserver.disconnect();
        }
        if (this.containerObserver) {
          this.containerObserver.disconnect();
        }
      }
    },
    createObserver(observerName, top) {
      this.disconnectObserver(observerName);
      // todo 传入this后,会在h5下报错
      const observer = uni.createIntersectionObserver(
        // #ifdef MP
        this,
        // #endif
        { thresholds: [0, 1] },
      );
      OBSERVER[observerName] = observer;
      observer
        .relativeToViewport({ top: top - (this.windowTop || 0) })
        .observe(
          ROOT_ELEMENT,
          (res) => {
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
      return new Promise((resolve) => {
        nodesRef
          .boundingClientRect(resolve)
          .exact();
      });
    },
    setFixed(top) {
      const { offsetTop, height, containerHeight } = this;
      // todo 这一坨后面再来细究
      const fixed = containerHeight && height
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
      const {
        offsetTop, height, fixed, zIndex, windowTop,
      } = this;
      this.wrapStyle = '';
      this.containerStyle = '';
      if (fixed) {
        this.wrapStyle = `top: ${offsetTop + (windowTop || 0)}px;`;
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
