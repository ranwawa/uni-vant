<!-- author: ranwawa -->
<!-- since: 2020/2/14 -->
<!-- desc:  -->
<!-- remark:  -->
<!-- eslint-disable max-len -->
<template>
  <view class="uv-swiper__warp">
    <slot />
    <view
      v-if="mode === 'default'"
      :style="{'bottom':dots.bottom + 'px'}"
      class="uv-swiper__dots-box"
    >
      <view
        v-for="(item,index) in info"
        :key="index"
        :style="{
        'width': (index === current? dots.width*2:dots.width ) + 'px','height':dots.width/3 +'px' ,'background-color':index !== current?dots.backgroundColor:dots.selectedBackgroundColor,'border-radius':'0px'}"
        class="uv-swiper__dots-item uv-swiper__dots-bar"
      />
    </view>
    <view
      v-else-if="mode === 'dot'"
      :style="{'bottom':dots.bottom + 'px'}"
      class="uv-swiper__dots-box"
    >
      <view
        v-for="(item,index) in info"
        :key="index"
        :style="{
        'width': dots.width + 'px','height':dots.height +'px' ,'background-color':index !== current?dots.backgroundColor:dots.selectedBackgroundColor,'border':index !==current ? dots.border:dots.selectedBorder}"
        class="uv-swiper__dots-item"
      />
    </view>
    <view
      v-else-if="mode === 'round'"
      :style="{'bottom':dots.bottom + 'px'}"
      class="uv-swiper__dots-box"
    >
      <view
        v-for="(item,index) in info"
        :key="index"
        :class="[index === current&&'uv-swiper__dots-long']"
        :style="{'width':(index === current? dots.width*3:dots.width ) + 'px','height':dots.height +'px' ,'background-color':index !== current?dots.backgroundColor:dots.selectedBackgroundColor,'border':index !==current ? dots.border:dots.selectedBorder}"
        class="uv-swiper__dots-item "
      />
    </view>
    <view
      v-else-if="mode === 'nav'"
      :style="{'background-color':dotsStyles.backgroundColor,'bottom':'0'}"
      class="uv-swiper__dots-box uv-swiper__dots-nav"
    >
      <text
        :style="{'color':dotsStyles.color}"
        class="uv-swiper__dots-nav-item"
      >{{ (current+1)+'/'+info.length +' ' +info[current][field] }}
      </text>
    </view>
    <view
      v-else-if="mode === 'indexes'"
      :style="{'bottom':dots.bottom + 'px'}"
      class="uv-swiper__dots-box"
    >
      <view
        v-for="(item,index) in info"
        :key="index"
        :style="{
        'width':dots.width + 'px','height':dots.height +'px' ,'color':index === current?dots.selectedColor:dots.color,'background-color':index !== current?dots.backgroundColor:dots.selectedBackgroundColor,'border':index !==current ? dots.border:dots.selectedBorder}"
        class="uv-swiper__dots-item uv-swiper__dots-indexes"
      >
        <text class="uv-swiper__dots-indexes-text">{{ index+1 }}</text>
      </view>
    </view>
  </view>
</template>

<script>
/**
 * SwiperDot 轮播图指示点
 * @description 自定义轮播图指示点
 * @tutorial https://ext.dcloud.net.cn/plugin?id=284
 * @property {Number} current 当前指示点索引，必须是通过 `swiper` 的 `change` 事件获取到的 `e.detail.current`
 * @property {String} mode = [default|round|nav|indexes] 指示点的类型
 *  @value default 默认指示点
 *  @value round 圆形指示点
 *  @value nav 条形指示点
 *  @value indexes 索引指示点
 * @property {String} field mode 为 nav 时，显示的内容字段（mode = nav 时必填）
 * @property {String} info 轮播图的数据，通过数组长度决定指示点个数
 * @property {Object} dotsStyles 指示点样式
 * @event {Function} clickItem 组件触发点击事件时触发，e={currentIndex}
 */
export default {
  name: 'uv-swiper-dot',
  props: {
    info: {
      type: Array,
      default() {
        return [];
      },
    },
    current: {
      type: Number,
      default: 0,
    },
    dotsStyles: {
      type: Object,
      default() {
        return {};
      },
    },
    // 类型 ：default(默认) indexes long nav
    mode: {
      type: String,
      default: 'default',
      validate: (value) => [
        'default', 'round', 'nav', 'indexes',
      ].includes(value),
    },
    // 只在 nav 模式下生效，变量名称
    field: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dots: {
        width: 8,
        height: 8,
        bottom: 10,
        color: '#fff',
        backgroundColor: 'rgba(0, 0, 0, .3)',
        border: '1px rgba(0, 0, 0, .3) solid',
        selectedBackgroundColor: '#333',
        selectedBorder: '1px rgba(0, 0, 0, .9) solid',
      },
    };
  },
  watch: {
    dotsStyles(newVal) {
      this.dots = Object.assign(this.dots, this.dotsStyles);
    },
    mode(newVal) {
      if (newVal === 'indexes') {
        this.dots.width = 20;
        this.dots.height = 20;
      } else {
        this.dots.width = 8;
        this.dots.height = 8;
      }
    },
  },
  created() {
    if (this.mode === 'indexes') {
      this.dots.width = 20;
      this.dots.height = 20;
    }
    this.dots = Object.assign(this.dots, this.dotsStyles);
  },
};
</script>

<style
  lang="scss"
  scoped
>
  @import "./sass/_index.scss";

  $comp: #{$PREFIX}swiper;

  #{$comp} {
    &__warp {
      /* #ifndef APP-NVUE */
      position: relative;
      /* #endif */
      display: flex;
      overflow: hidden;
      flex: 1;
      flex-direction: column;
    }

    &__dots-box {
      position: absolute;
      right: 0;
      bottom: 10px;
      left: 0;
      /* #ifndef APP-NVUE */
      display: flex;
      /* #endif */
      align-items: center;
      flex: 1;
      flex-direction: row;
      justify-content: center;
    }

    &__dots-item {
      width: 8px;
      margin-left: 6px;
      border-radius: 100px;
      background-color: rgba(0, 0, 0, 0.4);;
      // transition: width 0.2s linear;  不要取消注释，不然会不能变色
    }

    &__dots-item:first-child {
      margin: 0;
    }

    &__dots-default {
      border-radius: 100px;
    }

    &__dots-long {
      border-radius: 50px;
    }

    &__dots-bar {
      border-radius: 50px;
    }

    &__dots-nav {
      bottom: 0px;
      display: flex;
      /* #ifndef APP-NVUE */
      align-items: center;
      /* #endif */
      flex: 1;
      flex-direction: row;
      justify-content: flex-start;
      height: 40px;
      background-color: rgba(0, 0, 0, 0.2);
    }

    &__dots-nav-item {
      margin: 0 15px;
      color: #fff;
      font-size: 14px;
    }

    &__dots-indexes {
      /* #ifndef APP-NVUE */
      display: flex;
      /* #endif */
      align-items: center;
      justify-content: center;

      &-text {
        color: #fff;
        font-size: 12px;
      }
    }
  }
</style>
