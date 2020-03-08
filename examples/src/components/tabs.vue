<template>
  <view
    :class="computedRootClass"
    :id="customId"
  >
    <uv-sticky
      :disabled="sticky"
      :z-index="zIndex"
      :offset-top="offsetTop"
      :container="container"
      @scroll="handleTouchScroll"
    >
      <view :class="computedWrapClass">
        <slot name="nav-left" />
        <scroll-view
          :class="computedScrollClass"
          :style="computedScrollStyle"
          :scroll-x="scrollable"
          scroll-with-animation
          :scroll-left="scrollLeft"
        >
          <view :class="computedNavClass">
            <view
              v-if="type === 'line'"
              :style="lineStyle"
              class="uv-tabs-line"
            ></view>
            <view
              v-for="(item, index) in computedTabs"
              :key="index"
              :class="computedTabClass + methodTabClass(index, item.disabled)"
              :style="'' + methodTabStyle(index)"
              @click="handleClick(index)"
            >
              <view
                :class="{'uv-ellipsis': ellipsis}"
                :style="item.titleStyle"
              >
                {{ item.title }}
                <uv-info
                  v-if="item.info !== null || item.dot"
                  :info="item.info"
                  :dot="item.dot"
                  custom-class="uv-tab_title-info"
                />
              </view>
            </view>
          </view>
        </scroll-view>
        <slot name="nav-right" />
      </view>
    </uv-sticky>
    <!-- 内容区域 -->
    <!-- todo 这两个节点能否合并为一个节点 -->
    <view
      class="uv-tabs-content"
      @touchstart="handleTouch($event, 'start')"
      @touchmove="handleTouch($event, 'move')"
      @touchend="handleTouch($event, 'end')"
      @touchcancel="handleTouch($event, 'end')"
    >
      <view
        :class="{'uv-tabs-track-animated': animated}"
        :style="computedTrackStyle"
        class="uv-tabs-track"
      >
        <slot />
      </view>
    </view>
  </view>
</template>

<script>
import {
  eventBus, baseMixin, Touch, bem, pick, addUnit, getRect,
} from './utils/index';
import uvSticky from './sticky.vue';
import uvInfo from './info.vue';

const touch = new Touch();
export default {
  name: 'uv-tabs',
  components: {
    uvInfo,
    uvSticky,
  },
  mixins: [baseMixin, getRect],
  data() {
    return {
      container: null,
      currentIndex: 0,
      tabs: [],
      computedTabs: [],
      children: [],
      scrollable: false,
      scrollLeft: 0,
      lineStyle: '',
    };
  },
  props: {
    // 是否开启手势滑动切换
    swipeable: {
      type: Boolean,
      default: false,
    },
    // 样式风格，可选值为card
    type: {
      type: String,
      default: 'line',
      validate: (value) => ['line', 'card'].includes(value),
    },
    // 标签颜色
    color: {
      type: String,
      default: '',
    },
    // 是否展示外边框，仅在line风格下生效
    border: {
      type: Boolean,
      default: true,
    },
    // 底部条宽度 (px)
    lineWidth: {
      type: [String, Number],
      default: -1,
    },
    // 底部条高度 (px)
    lineHeight: {
      type: [String, Number],
      default: '3px',
    },
    // 动画时间 (单位秒)
    duration: {
      type: Number,
      default: 0.3,
    },
    titleActiveColor: {
      type: String,
      default: '',
    },
    titleInActiveColor: {
      type: String,
      default: '',
    },
    // 当前选中标签的标识符
    active: {
      type: [String, Number],
      default: 0,
    },
    // 是否省略过长的标题文字
    ellipsis: {
      type: Boolean,
      default: true,
    },
    // 是否使用动画切换 Tabs
    animated: {
      type: Boolean,
      default: false,
    },
    // 标签栏样式类
    navClass: {
      type: String,
      default: '',
    },
    // 标签样式类
    tabClass: {
      type: String,
      default: '',
    },
    // 标签激活态样式类
    tabActiveClass: {
      type: String,
      default: '',
    },
    // uv-sticky相关属性
    // 是否使用粘性定位布局
    sticky: {
      type: Boolean,
      default: false,
    },
    // z-index层级
    zIndex: {
      type: Number,
      default: 1,
    },
    // 距离顶部多高开始吸顶
    offsetTop: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    computedRootClass() {
      const { type } = this;
      return `${this.customClass} ${bem('tabs', [type])}`;
    },
    computedWrapClass() {
      const bemClass = bem('tabs-wrap', { scrollable: this.scrollable });
      const otherClass = this.type === 'line' && this.border
        ? 'uv-hairline-top-bottom'
        : '';
      return `${bemClass} ${otherClass}`;
    },
    computedScrollClass() {
      return bem('tabs-scroll', [this.type]);
    },
    computedScrollStyle() {
      return this.color ? `border-color: ${this.color};` : '';
    },
    computedNavClass() {
      return `${this.navClass} ${bem('tabs-nav', [this.type])}`;
    },
    computedTabClass() {
      const { ellipsis, tabClass } = this;
      const bemCls = bem('tab', { complete: !ellipsis });
      const tabCls = tabClass && `${tabClass} `;
      const ellipsisCls = ellipsis && 'uv-ellipsis ';
      return `${tabCls}${ellipsisCls}${bemCls}`;
    },
    computedLineStyle() {
      if (this.type !== 'line') {
        return '';
      }
      const {
        color,
        duration,
        currentIndex,
        lineWidth,
        lineHeight,
      } = this;
      return '';
    },
    computedTrackStyle() {
      if (!this.animate) {
        return '';
      }
      const {
        duration,
        currentIndex,
      } = this;
      return `transform: translateX(${
        -100 * currentIndex}%); transition-duration: ${duration}s`;
    },
  },
  watch: {
    active(newValue) {
      if (newValue !== this.getCurrentName()) {
        this.setCurrentIndexByName(newValue);
      }
    },
  },
  created() {
    eventBus.$on('updateTabs', this.updateTabs());
    eventBus.$on('linkedTab', (tab) => {
      try {
        const index = this.tabs.length;
        tab.index = index;
        this.tabs[index] = tab;
        this.computedTabs.push(
          pick(tab, [
            ...Object.keys(tab.$data),
            ...Object.keys(tab.$props),
          ]),
        );
      } catch (e) {
        console.error(e);
      }
    });
    eventBus.$on('unLinkedTab', (tab) => {
    });
  },
  mounted() {
    // this.container = uni.createSelectorQuery().select('.uv-tabs');
    this.setLine(true);
    this.setTrack();
    this.scrollIntoView();
  },
  methods: {
    async setLine(skipTransition) {
      if (this.type !== 'line') { return; }
      const {
        color,
        duration,
        currentIndex,
        lineWidth,
        lineHeight,
      } = this;
      const rects = await this.getRect('.uv-tab', true);
      const rect = rects[currentIndex];
      if (!rect) { return; }
      const width = lineWidth !== -1 ? lineWidth : rect.width / 2;
      const height = lineHeight !== -1
        ? `height: ${addUnit(lineHeight)}; border-radius: ${addUnit(
          lineHeight,
        )};`
        : '';
      let left = rects
        .slice(0, currentIndex)
        .reduce((prev, curr) => prev + curr.width, 0);
      left += (rect.width - width) / 2;
      const transition = skipTransition
        ? ''
        : `transition-duration: ${duration}s`;
      this.lineStyle = `
        ${height}
        width: ${addUnit(width)};
        background-color: ${color};
        transform: translateX(${left}px);
        ${transition}
      `;
      console.log(this.lineStyle, 123);
    },
    setTrack() {},
    scrollIntoView() {},
    updateTabs() {},
    getCurrentName() {
      const activeTab = this.children[this.currentIndex];
      if (activeTab) {
        return activeTab.getComputedName();
      }
      return '';
    },
    handleTouch(e, m) {
      if (this.swipeable) {
        const method = `handleTouch${m}`;
        this[method](e.touches[0]);
      }
    },
    handleTouchStart(point) {
      touch.setStartPoint(point);
    },
    handleTouchMove() {
    },
    handleTouchEnd(point) {
      const { directionH } = touch.getDirection(point);
      const { currentIndex, tabs } = this;
      // todo 这里和有赞是反的,得验证一下
      switch (directionH) {
        case 'right':
          if (currentIndex < tabs.length - 1) {
            this.setCurrentIndex(currentIndex + 1);
          }
          break;
        case 'left':
          if (currentIndex > 0) {
            this.setCurrentIndex(currentIndex - 1);
          }
          break;
        default:
          break;
      }
    },
    handleTouchScroll(e) {
      this.$emit('scroll', e.detail);
    },
    handleClick(index) {
      const child = this.children[index];
      if (child.disabled) {
        this.$emit('disable');
      } else {
        this.setCurrentIndex(index);
        this.$nextTick(() => this.$emit('click'));
      }
    },
    setCurrentIndex(currentIndex) {
      const { children = [] } = this;
      if (
        typeof currentIndex !== 'number'
        || currentIndex >= children.length
        || currentIndex < 0
      ) {
        return;
      }
      if (currentIndex === this.currentIndex) {
        return;
      }
      children.forEach((item, index) => {
        const active = index === currentIndex;
        if (active !== item.data.active || !item.inited) {
          item.updateRender(active, this);
        }
      });
      const shouldEmitChange = this.currentIndex !== null;
      this.currentIndex = currentIndex;
      this.nextTick(() => {
        this.setLine();
        this.setTrack();
        this.scrollIntoView();
        // todo 官方是trigger而非triggerEvent
        this.$emit('input');
        if (shouldEmitChange) {
          this.$emit('change');
        }
      });
    },
    methodTabClass(index, disabled) {
      const cls = [];
      if (index === this.currentIndex) {
        cls.push(this.tabActiveClass);
        cls.push('uv-tab-active');
      }
      if (disabled) {
        cls.push('uv-tab-disabled');
      }
      return cls.join(' ');
    },
    methodTabStyle(index) {
      const {
        ellipsis,
        color,
        type,
        disabled,
        titleActiveColor,
        titleInactiveColor,
        swipeThreshold,
        scrollable,
        currentIndex,
      } = this;
      const styles = [];
      const isCard = type === 'card';
      const titleColor = index === currentIndex
        ? titleActiveColor
        : titleInactiveColor;
      if (color && isCard) {
        styles.push(`border-color: ${color};`);
        if (!disabled) {
          if (this.active) {
            styles.push(`background-color: ${color}`);
          } else {
            styles.push(`color: ${color}`);
          }
        }
      }
      if (titleColor) {
        styles.push(`color: ${titleColor};`);
      }
      if (scrollable && ellipsis) {
        styles.push(`flex-basis: ${88 / swipeThreshold}%;`);
      }
      return styles.join(';');
    },
  },
};
</script>

<style
  scoped
  lang="scss"
>
  @import './sass/_index.scss';

  $comp: #{$PREFIX}tabs;

  #{$comp} {
    position: relative;
    -webkit-tap-highlight-color: transparent;
    font-size: $font-size-md;

    &-wrap {
      display: flex;
      overflow: hidden;

      &-scrollable {
        .uv-tab {
          flex: 0 0 22%;
        }
      }
    }

    &-scroll {
      background-color: $tabs-nav-background-color;

      &-line {
        box-sizing: content-box;
        height: calc(100% + 15px); /* 15px padding to hide scrollbar in mobile safari */
      }

      &-card {
        margin: 0 $padding-md;
      }
    }

    &-nav {
      position: relative;
      display: flex;
      user-select: none;

      &-card {
        box-sizing: border-box;
        height: $tabs-card-height;
        border: $border-width-base solid $tabs-default-color;
        border-radius: $border-radius-sm;

        .van-tab {
          color: $tabs-default-color;
          border-right: $border-width-base solid $tabs-default-color;
          /*line-height: calc($tabs-card-height - 2 * $border-width-base);*/

          &:last-child {
            border-right: none;
          }

          &.van-tab--active {
            color: $white;
            background-color: $tabs-default-color;
          }

          &-disabled {
            color: $tab-disabled-text-color;
          }
        }
      }
    }

    &-line-wrap {
      /* todo 这个应该无用吧*/
      height: $tabs-line-height;
    }

    &-track {
      position: relative;
      width: 100%;
      height: 100%;

      &-animated {
        display: flex;
        transition-property: transform;
      }
    }

    &-content {
      overflow: hidden;
    }

    &-card-wrap {
      height: $tabs-card-height;
    }

  }
</style>
