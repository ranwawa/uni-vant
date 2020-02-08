<!-- author: ranwawa -->
<!-- since: 2020/1/5 -->
<!-- desc: 按钮组件 -->
<!-- remark:  -->
<template>
  <!-- TODO button上的id为啥无法挂载呢?icon上的就可以 -->
  <button
    :class="computedClass"
    :style="computedStyle"
    :id="customId"
    hover-class="uv-btn-active hover-class"
    :type="type"
    :size="size"
    :disabled="disabled"
    :lang="lang"
    :open-type="openType"
    :session-from="sessionFrom"
    :send-message-title="sendMessageTitle"
    :send-message-path="sendMessagePath"
    :send-message-img="sendMessageImg"
    :app-parameter="appParameter"
    :show-message-card="showMessageCard"
    @click="handleClick"
    @getuserinfo="emit('getuserinfo', $event)"
    @contact="emit('contact', $event)"
    @getphonenumber="emit('getphonenumber', $event)"
    @error="emit('error', $event)"
    @opensetting="emit('opensetting', $event)"
    @launchapp="emit('launchapp', $event)"
  >
    <template v-if="loading">
      <uv-loading
        :type="loadingType"
        :custom-class="loadingClass"
        :size="loadingSize"
        :color="computedLoadingColor"
      />
      <view
        v-if="loadingText"
        class="uv-btn-loading_text"
      >
        {{ loadingText }}
      </view>
    </template>
    <template v-else>
      <uv-icon
        v-if="icon"
        :name="icon"
        size="1.2em"
        custom-style="line-height: inherit;"
        custom-class="uv-btn-icon"
      />
      <!-- the gutter between icon and text-->
      <text :class="{'uv-btn-text': !!$slots.default && icon}">
        <slot />
      </text>
    </template>
  </button>
  <!-- todo 这里有很多小程序的属性需要迁移过来 -->
  <!--:loading="loading"-->
  <!--:form-type="formType"-->
  <!--:hover-top-propagation="hoverTopPropagation"-->
  <!--:hover-start-time="hoverStartTime"-->
  <!--:hover-stay-time="hoverStayTime"-->

</template>
<script>
import { bem, baseMixin } from './utils/index';
import uvIcon from './icon.vue';
import uvLoading from './loading';

export default {
  name: 'uv-btn',
  mixins: [baseMixin],
  components: {
    uvIcon,
    uvLoading,
  },
  props: {
    // 按钮类型
    type: {
      type: String,
      default: 'default',
      validator(value) {
        return [
          'default', 'primary', 'info', 'warning', 'danger',
        ].includes(value);
      },
    },
    // 按钮颜色
    color: {
      type: String,
      default: '',
    },
    // 按钮尺寸
    size: {
      type: String,
      default: 'normal',
      validator(value) {
        return ['normal', 'large', 'small', 'mini'].includes(value);
      },
    },
    // 朴素按钮
    plain: {
      type: Boolean,
      default: false,
    },
    // 细边框
    hairline: {
      type: Boolean,
      default: false,
    },
    // 块级元素
    block: {
      type: Boolean,
      default: false,
    },
    // 圆形按钮
    round: {
      type: Boolean,
      default: false,
    },
    // 方形按钮
    square: {
      type: Boolean,
      default: false,
    },
    // 禁用按钮
    disabled: {
      type: Boolean,
      default: false,
    },
    // 图标样式
    icon: {
      type: String,
      default: '',
    },
    // 加载状态
    loading: {
      type: Boolean,
      default: false,
    },
    // 加载状态提示文字
    loadingText: {
      type: String,
      default: '',
    },
    // 加载状态图片
    loadingType: {
      type: String,
      default: 'circular',
      validate(value) {
        return ['circular', 'spinner'].includes(value);
      },
    },
    // 自定义加载状态类
    loadingClass: {
      type: String,
      default: '',
    },
    // 加载状态大小
    loadingSize: {
      type: String,
      default: '20px',
    },
    // 返回用户信息的语言
    lang: {
      type: String,
      default: 'en',
      validator(value) {
        return ['en', 'zh_TW', 'zh_CN'].includes(value);
      },
    },
    // 开放能力
    openType: {
      type: String,
      default: '',
      validator(value) {
        return [
          '',
          'contact',
          'share',
          'getPhoneNumber',
          'getUserInfo',
          'launchApp',
          'openSetting',
          'feedback',
        ].includes(value);
      },
    },
    // todo 会话这几个要测一下具体是啥效果
    // 会话来源
    sessionFrom: {
      type: String,
      default: '',
    },
    // 会话内消息卡片点击跳转小程序路径
    sendMessagePath: {
      type: String,
      default: '',
    },
    // 会话内消息卡片图片
    sendMessageImg: {
      type: String,
      default: '',
    },
    // 会话内消息卡片标题
    sendMessageTitle: {
      type: String,
      default: '',
    },
    // 是否显示会话内消息卡片
    showMessageCard: {
      type: Boolean,
      default: false,
    },
    // 打开 APP 时，向 APP 传递的参数
    appParameter: {
      type: String,
      default: '',
    },
  },
  computed: {
    computedStyle() {
      const color = this.color;
      let style = '';
      if (color) {
        let textColor = color;
        // 非朴素按钮
        // 边框,背景为设置的颜色
        // 前景色为白色
        if (!this.plain) {
          style = `border-color: ${color}; background: ${color};`;
          textColor = '#fff';
        }
        style += `color: ${textColor}; border-color: ${textColor};`;
        /* 渐变色去掉边框 */
        if (color.indexOf('gradient') !== -1) {
          style += 'border-width: 0;';
        }
      }
      return `${style}${this.customStyle}`;
    },
    computedLoadingColor() {
      return this.type === 'default' ? '#c9c9c9' : 'white';
    },
    computedClass() {
      const {
        type,
        size,
        plain,
        block,
        round,
        square,
        disabled,
        loading,
        hairline,
      } = this;
      const bemClass = bem('btn', [
        type,
        size,
        {
          plain,
          block,
          round,
          square,
          disabled,
          hairline,
          unclickable: disabled || loading,
        },
      ]);
      return `${bemClass} ${this.customClass} ${hairline ?
        'uv-hairline-surround' : ''}`;
    },
  },
  methods: {
    emit(event, { detail }) {
      this.$emit(event, detail);
    },
    handleClick() {
      if (!this.disabled && !this.loading) {
        this.$emit('click');
      }
    },
  },
};
</script>

<style lang="scss">
  @import "sass/index";
  @import "sass/hariline";


  $border-radius-sm: 2px;

  // 样式前缀
  $comp: #{$PREFIX}btn;
  $btn-sizes: (
    /* min-width height padding font-size */
    "large": 100% 50px (0) $font-size-lg,
    "normal": auto 44px (0 15px) $font-size-md,
    "small": 60px 30px (0 $padding-xs) $font-size-sm,
    // compatible with WeiXin button[size=mini]
    "mini": 50px (22px !important) (0) ($font-size-xs !important),
  );
  $btn-types: (
    /* border-color background-color color */
    "primary": $primary $primary $white,
    "info": $info $info $white,
    "warning": $warning $warning $white,
    "danger": $danger $danger $white,
    "default": $border-color ($white !important) $text-color,
  );

  @mixin get-plain($class-name, $color) {
    #{$comp}-plain {
      background-color: $white;

      &#{$class-name} {
        color: $color;
      }
    }
  }

  /* type相关样式 */
  @each $type, $values in $btn-types {
    $class-name: #{$comp}-#{$type};
    $bd-color: nth($values, 1);
    $bg-color: nth($values, 2);
    $color: nth($values, 3);

    #{$class-name} {
      border: 1px solid $bd-color;
      background-color: $bg-color;
      color: $color;
    }

    @if $class-name == '#{$comp}-default' {
      $bg-color: $color;
    }
    @include get-plain($class-name, $bg-color);
  }

  /* size相关样式 */
  @each $size, $values in $btn-sizes {
    #{$comp}-#{$size} {
      min-width: nth($values, 1);
      height: nth($values, 2);
      padding: nth($values, 3);
      font-size: nth($values, 4);
    }
  }

  #{$comp} {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    transition: opacity $animation-duration-fast;
    text-align: center;
    vertical-align: middle;
    border-radius: $border-radius-sm;
    -webkit-appearance: none;
    -webkit-text-size-adjust: 100%;

    /* 隐藏小程序上面的默认边框 */
    &::after {
      border-width: 0;
      line-height: 20px;
    }

    /* 点击态 */
    &::before {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      content: ' ';;
      transform: translate(-50%, -50%);
      opacity: 0;
      border: inherit {
        color: $black;
      }
      border-radius: inherit; /* inherit parent's border radius */
      background-color: $black;
    }

    /* uni在h5里面已经实现了active时根据Hover-class添加对应类名 */
    &-active::before {
      opacity: 0.15;
    }

    &-block {
      display: flex;
      width: 100%;
    }

    &-round {
      border-radius: $border-radius-max;
    }

    &-square {
      border-radius: 0;
    }

    &-unclickable::after {
      display: none;
    }

    &-disabled {
      opacity: $disabled-opacity;
    }

    &-loading_text {
      margin-left: $padding-base;
    }

    &-hairline {
      padding-top: 1px; // add 1px padding for text vertical align middle
      border-width: 0;

      &::after {
        border-width: 1px;
        border-color: inherit;
        border-radius: $border-radius-sm * 2;
      }

      &.uv-btn-round::after {
        border-radius: $border-radius-sm;
      }

      &.uv-btn-square::after {
        border-radius: 0;
      }
    }

    &-text {
      margin-left: 4px;
    }
  }
</style>
