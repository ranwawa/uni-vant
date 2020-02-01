<template>
  <view
    class="uv-transition"
    :id="customId"
    :style="computedStyle"
    :class="methodClass"
    @transitionend="handleTransitionEnd"
  >
    <slot />
  </view>
</template>

<script>
import { baseMixin } from './utils/index';
// todo 这一坨的原理还没完全搞透彻,要结合事件循环中的微任务和宏任务
// 还要结合vue的渲染机制来理解
function later() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 333);
  });
}
export default {
  name: 'uv-transition',
  mixins: [baseMixin],
  data() {
    return {
      type: '',
      inited: false,
      display: false,
      methodClass: '',
      enterFunc: {
        before: () => {
          this.status = 'enter';
          this.$emit('before-enter');
        },
        ing: () => {
          this.$emit('enter');
          this.checkStatus('enter');
          this.methodClass = this.computedNameClasses.enter;
          this.inited = true;
          this.display = true;
        },
        to: () => {
          this.checkStatus('enter');
          this.transitionEnded = false;
          this.methodClass = this.computedNameClasses['enter-to'];
        },
      },
      leaveFunc: {
        before: () => {
          this.status = 'leave';
          this.$emit('before-leave');
        },
        ing: () => {
          this.checkStatus('leave');
          this.$emit('leave');
          this.methodClass = this.computedNameClasses.leave;
        },
        to: () => {
          this.checkStatus('leave');
          this.transitionEnded = false;
          setTimeout(this.handleTransitionEnd, this.computedDuration);
          this.methodClass = this.computedNameClasses['leave-to'];
        },
      },
    };
  },
  props: {
    // 动画类型
    name: {
      type: String,
      default: 'fade',
      validate(value) {
        return [
          'fade', 'fade-up', 'fade-right', 'fade-down', 'fade-left',
          'slide-up', 'slide-right', 'slide-bottom', 'slide-left',
        ].includes(value);
      },
    },
    // 是否展示组件
    show: {
      type: Boolean,
      default: false,
    },
    // duration
    duration: {
      type: [Number, Object],
      default: 300,
    },
    // todo 各个状态的自定义样式还未弄进来
  },
  computed: {
    computedNameClasses() {
      debugger;
      const { name } = this;
      return {
        enter: `uv-${name}-enter`,
        'enter-to': `uv-${name}-enter-to`,
        leave: `uv-${name}-leave`,
        'leave-to': `uv-${name}-leave-to`,
      };
    },
    computedDuration() {
      const { duration } = this;
      return typeof duration === 'number'
        ? duration
        : duration.enter;
    },
    computedStyle() {
      debugger;
      const { computedDuration, display } = this;
      return `transition-duration: ${computedDuration}ms;${
        display ? '' : 'display: none;'}`;
    },
  },
  watch: {
    show(newValue) {
      debugger;
      newValue ? this.enter() : this.leave();
    },
  },
  mounted() {
    debugger;
    this.show && this.enter();
  },
  methods: {
    async enter() {
      this.enterFunc.before();
      await later();
      this.enterFunc.ing();
      await later();
      this.enterFunc.to();
    },
    async leave() {
      if (!this.display) { return; }
      this.leaveFunc.before();
      await later();
      this.leaveFunc.ing();
      await later();
      this.leaveFunc.to();
    },
    handleTransitionEnd() {
      if (this.transitionEnd) { return; }
      this.transitionEnd = true;
      this.$emit(`after-${this.name}`);
      if (!this.show && this.display) {
        this.display = false;
      }
    },
    checkStatus(status) {
      if (status !== this.status) {
        throw new Error(`incongruent status: ${status}`);
      }
    },
  },
};
</script>

<style
  scoped
  lang="scss"
>
  @import './sass/_index.scss';

  $comp: #{$PREFIX}transition;

  #{$comp} {
    transition-property: opacity, transform;
    transition-timing-function: ease;
  }

  $fades: (
    'fade-enter': 0,
    'fade-enter-to': 1,
    'fade-leave': 1,
    'fade-leave-to': 0
  );

  @each $name, $value in $fades {
    #{$PREFIX}#{$name} {
      opacity: $value;
    }
  }

  .uv-fade-up-enter,
  .uv-fade-up-leave-to {
    transform: translate3d(0, 100%, 0);
    opacity: 0;
  }

  .uv-fade-down-enter,
  .uv-fade-down-leave-to {
    transform: translate3d(0, -100%, 0);
    opacity: 0;
  }

  .uv-fade-left-enter,
  .uv-fade-left-leave-to {
    transform: translate3d(-100%, 0, 0);
    opacity: 0;
  }

  .uv-fade-right-enter,
  .uv-fade-right-leave-to {
    transform: translate3d(100%, 0, 0);
    opacity: 0;
  }


  .uv-slide-up-enter,
  .uv-slide-up-leave-to {
    transform: translate3d(0, 100%, 0);
  }

  .uv-slide-down-enter,
  .uv-slide-down-leave-to {
    transform: translate3d(0, -100%, 0);
  }

  .uv-slide-left-enter,
  .uv-slide-left-leave-to {
    transform: translate3d(-100%, 0, 0);
  }

  .uv-slide-right-enter,
  .uv-slide-right-leave-to {
    transform: translate3d(100%, 0, 0);
  }

</style>