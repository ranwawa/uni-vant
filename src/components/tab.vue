<template>
  <view
    v-show="shouldShow"
    class="uv-tab-pane"
    :id="customId"
  >
    {{ index }}
    <slot v-if="shouldRender" />
  </view>
</template>

<script>
import {
  baseMixin, eventBus, bem, pick,
} from './utils/index';

export default {
  name: 'uv-tab',
  mixins: [baseMixin],
  data() {
    return {
      index: 0,
      inited: false,
      active: false,
      shouldShow: true,
      shouldRender: true,
    };
  },
  props: {
    // 标签名称，作为匹配的标识符
    name: {
      type: [String, Number],
      default: '',
    },
    // 标题
    title: {
      type: String,
      default: '',
    },
    // 是否禁用标签
    disabled: {
      type: Boolean,
      default: false,
    },
    // 是否显示小红点
    dot: {
      type: Boolean,
      default: false,
    },
    // 图标右上角提示信息
    info: {
      type: [String, Number],
      default: '',
    },
    // 自定义标题样式
    titleStyle: {
      type: String,
      default: '',
    },
  },
  computed: {
    computedClass() {
      const { active } = this;
      return bem('tab-pane', {
        active,
        inactive: !active,
      });
    },
  },
  watch: {
    name: () => this.update(),
    title: () => this.update(),
    disabled: () => this.update(),
    dot: () => this.update(),
    info: () => this.update(),
  },
  mounted() {
    eventBus.$emit(
      'linkedTab',
      this,
      // pick(this, [
      //   ...Object.keys(this.$data),
      //   ...Object.keys(this.$props),
      // ]),
    );
  },
  methods: {
    getComputedName() {
      return this.name !== '' ? this.name : this.index;
    },
    update() {
      eventBus.$emit('updateTabs');
    },
    updateRender(active, parent) {
      const { lazyRender, animated } = parent;
      this.inited = this.inited || active;
      this.active = active;
      this.shouldRender = this.inited || !lazyRender;
      this.shouldShow = active || animated;
    },
  },
  destroyed() {
    eventBus.$emit('unLinkTab', this.index);
  },
};
</script>

<style
  scoped
  lang="scss"
>
  @import './sass/_index.scss';

  $comp: #{$PREFIX}tab;

  :host {
    flex-shrink: 0;
    box-sizing: border-box;
    width: 100%;
  }

  #{$comp} {
    font-size: $font-size-md;
    &-pane {
      box-sizing: border-box;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;

      /* todo 这两个css属性有区别吗? */
      // 感觉效果是一样的啊
      &-active {
        height: auto;
      }

      &-inactive {
        height: 0;
        overflow: visible;
      }
    }
  }
</style>
