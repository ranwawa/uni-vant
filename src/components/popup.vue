<template>
  <view>
    <uv-overlay
      v-if="overlay"
      :show="show"
      :z-index="zIndex"
      :custom-style="overlayStyle"
      :duration="duration"
      @click="clickOverlay"
    />
    <view
      v-if="inited"
      :class="computedRootClass"
      :style="computedRootStyle"
      class="uv-popup"
      :id="customId"
    >
      <slot />
      <uv-icon
        v-if="closeable"
        :name="closeIcon"
        :custom-class="computedIconClass"
        @click="clickCloseIcon"
      />
    </view>
  </view>
</template>

<script>
import { baseMixin, transition } from './utils/mixins';
import { bem } from './utils/index';
import uvOverlay from './overlay.vue';
import uvIcon from './icon.vue';

export default {
  name: 'UvPopup',
  components: {
    uvOverlay,
    uvIcon,
  },
  mixins: [baseMixin, transition],
  props: {
    // z-index 层级
    zIndex: {
      type: Number,
      default: 100,
    },
    // 是否显示遮罩层
    overlay: {
      type: Boolean,
      default: true,
    },
    // 弹出位置，可选值为 top bottom right left
    position: {
      type: String,
      default: 'center',
      validate(value) {
        return ['top', 'right', 'bottom', 'left', 'center'].includes(value);
      },
    },
    // 是否显示圆角
    round: {
      type: Boolean,
      default: false,
    },
    // 自定义遮罩层样式
    overlayStyle: {
      type: String,
      default: '',
    },
    // 是否在点击遮罩层后关闭
    closeOnClickOverlay: {
      type: Boolean,
      default: true,
    },
    // 是否显示关闭图标
    closeable: {
      type: Boolean,
      default: false,
    },
    // 关闭图标名称或图片链接
    closeIcon: {
      type: String,
      default: 'cross',
    },
    // 图标位置
    closeIconPosition: {
      type: String,
      default: 'top-right',
    },
    // 是否为 iPhoneX 留出底部安全距离
    safeAreaInsetBottom: {
      type: Boolean,
      default: true,
    },
    // 是否留出顶部安全距离（状态栏高度）
    safeAreaInsetTop: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedRootClass() {
      const {
        methodClass,
        position,
        round,
        saveAreaInsetBottom,
        saveAreaInsetTop,
      } = this;
      let { customClass } = this;
      customClass = customClass ? `${customClass} ` : '';
      const bemClass = bem(
        'popup',
        [
          position,
          {
            round,
            safe: saveAreaInsetBottom,
            'safe-top': saveAreaInsetTop,
          },
        ],
      );
      return `${customClass}${methodClass} ${bemClass}`;
    },
    computedRootStyle() {
      const {
        zIndex,
        customStyle,
        computedDuration,
      } = this;
      let { display } = this;
      display = display ? '' : 'display: none';
      return `z-index: ${zIndex}; transition-duration: ${
        computedDuration}; ${display}${customStyle}`;
    },
    computedIconClass() {
      return `uv-popup_close-icon uv-popup_close-icon-${
        this.closeIconPosition}`;
    },
  },
  methods: {
    clickOverlay() {
      this.$emit('click-overlay');
      if (this.closeOnClickOverlay) {
        this.$emit('close');
      }
    },
    clickCloseIcon() {
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

  $comp: #{$PREFIX}popup;

  #{$comp} {
    position: fixed;
    overflow-y: auto;
    box-sizing: border-box;
    max-height: 100%;
    transition-timing-function: ease;
    animation: ease both;
    background-color: $popup-background-color;
    font-size: $font-size-md;
    -webkit-overflow-scrolling: touch;

    &-center {
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);

      .uv-popup-round {
        border-radius: $popup-round-border-radius;
      }
    }

    &-top {
      top: 0;
      left: 0;
      width: 100%;

    }

    &.uv-popup-round {
      border-radius: 0 0 $popup-round-border-radius $popup-round-border-radius;
    }

    &-right {
      top: 50%;
      right: 0;
      transform: translate3d(0, -50%, 0);

      &.uv-popup-round {
        border-radius: $popup-round-border-radius 0 0 $popup-round-border-radius;
      }
    }

    &-bottom {
      bottom: 0;
      left: 0;
      width: 100%;

      &.uv-popup-round {
        border-radius: $popup-round-border-radius $popup-round-border-radius 0 0;
      }
    }

    &-left {
      top: 50%;
      left: 0;
      transform: translate3d(0, -50%, 0);

      &.uv-popup-round {
        border-radius: 0 $popup-round-border-radius $popup-round-border-radius 0;
      }
    }

    &-bottom, &-safe {
      /* todo 这个constant和env是啥子玩意儿? */
      /*padding-bottom: constant(safe-area-inset-bottom);*/
      /*padding-bottom: env(safe-area-inset-bottom);*/
    }

    &-safeTop {
      /*padding-top: constant(safe-area-inset-top);*/
      /*padding-top: env(safe-area-inset-top);*/
    }
  }

  .uv-scale-enter-active,
  .uv-scale-leave-active {
    transition-property: opacity, transform;
  }

  .uv-scale-enter,
  .uv-scale-leave-to {
    transform: translate3d(-50%, -50%, 0) scale(0.7);
    opacity: 0;
  }

  .uv-fade-enter-active,
  .uv-fade-leave-active {
    transition-property: opacity;
  }

  .uv-fade-enter,
  .uv-fade-leave-to {
    opacity: 0;
  }

  .uv-center-enter-active,
  .uv-center-leave-active {
    transition-property: opacity;
  }

  .uv-center-enter,
  .uv-center-leave-to {
    opacity: 0;
  }

  .uv-bottom-enter-active,
  .uv-bottom-leave-active,
  .uv-top-enter-active,
  .uv-top-leave-active,
  .uv-left-enter-active,
  .uv-left-leave-active,
  .uv-right-enter-active,
  .uv-right-leave-active {
    transition-property: transform;
  }

  .uv-bottom-enter,
  .uv-bottom-leave-to {
    transform: translate3d(0, 100%, 0);
  }

  .uv-top-enter,
  .uv-top-leave-to {
    transform: translate3d(0, -100%, 0);
  }

  .uv-left-enter,
  .uv-left-leave-to {
    transform: translate3d(-100%, -50%, 0);
  }

  .uv-right-enter,
  .uv-right-leave-to {
    transform: translate3d(100%, -50%, 0);
  }
</style>
