/**
 * @author 冉娃娃
 * @since 2020/1/17
 * @desc 公共组件方法
 * @remark
 */
const baseMixin = {
  props: {
    // 标识符
    customId: {
      type: String,
      default: '',
    },
    // 自定义样式
    customStyle: {
      type: String,
      default: '',
    },
    // 自定义类名
    customClass: {
      type: String,
      default: '',
    },
  },
};
const getRect = {
  methods: {
    getRect(selector, all) {
      return new Promise(resolve => {
        const query = uni.createSelectorQuery().in(this);
        const method = all ? 'selectAll' : 'select';
        query[method](selector)
          .boundingClientRect(rect => resolve(rect))
          .exec();
      });
    },
  },
};
// todo 这一坨的原理还没完全搞透彻,要结合事件循环中的微任务和宏任务
// 还要结合vue的渲染机制来理解
function later() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 333);
  });
}
const transition = {
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
    enterClass: {
      type: String,
      default: '',
    },
    // todo 下面这些属性还未整合到具体的类名当中
    enterActiveClass: {
      type: String,
      default: '',
    }, enterToClass: {
      type: String,
      default: '',
    }, leaveClass: {
      type: String,
      default: '',
    }, leaveActiveClass: {
      type: String,
      default: '',
    }, leaveToClass: {
      type: String,
      default: '',
    },
  },
  computed: {
    computedNameClasses() {
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
export default baseMixin;
export {
  getRect,
  baseMixin,
  transition,
};
