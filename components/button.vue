<!-- author: ranwawa -->
<!-- since: 2020/1/5 -->
<!-- desc: 按钮组件 -->
<!-- remark:  -->
<template>
  <button
    :class="classes"
    :id="id"
    hover-class="uv-btn_active hover-class"
    :type="type"
    :size="size"
  >
    <slot />
  </button>
  <!--:plain="plain"-->
  <!--:disabled="disabled"-->
  <!--:loading="loading"-->
  <!--:form-type="formType"-->
  <!--:open-type="openType"-->
  <!--:hover-top-propagation="hoverTopPropagation"-->
  <!--:hover-start-time="hoverStartTime"-->
  <!--:hover-stay-time="hoverStayTime"-->
  <!--:lang="lang"-->
  <!--:session-from="sessionFrom"-->
  <!--:send-message-title="sendMessageTitle"-->
  <!--:send-message-path="sendMessagePath"-->
  <!--:send-message-img="sendMessageImg"-->
  <!--:app-parameter="appParameter"-->
  <!--:show-message-card="showMessageCard"-->
  <!--@getuserinfo="$emit('getuserinfo')"-->
  <!--@contact="$emit('contact')"-->
  <!--@getphonenumber="$emit('getphonenumber')"-->
  <!--@error="$emit('error')"-->
  <!--@opensetting="$emit('opensetting')"-->
  <!--@launchapp="$emit('launchapp')"-->
</template>
<script>
import bem from './bem';

export default {
  name: 'uv-btn',
  data() {
    return {
      classes: '',
    };
  },
  props: {
    // 标识符
    id: {
      type: String,
      default: '',
    },
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
    // 按钮尺寸
    size: {
      type: String,
      default: 'normal',
      validator(value) {
        return ['normal', 'large', 'small', 'mini'].includes(value);
      },
    },
  },
  mounted() {
    this.classes = bem('btn', [
      this.type,
      this.size,
    ]);
  },
};
</script>
<style
  lang="scss"
  scoped
>
  @import "sass/index";

  $btn-sizes: (
    /* min-width height padding font-size */
    "large": 100% 50px (0) $font-size-lg,
    "normal": auto 44px (0 15px) $font-size-md,
    "small": 60px 30px (0 $padding-xs) $font-size-sm,
    "mini": 50px 22px (0) $font-size-xs,
  );

  $btn-types: (
    "primary": $primary $primary $white,
    "info": $info $info $white,
    "warning": $warning $warning $white,
    "danger": $danger $danger $white,
    "default": $border-color $white $text-color,
  );

  /* type相关样式 */
  @each $type, $values in $btn-types {
    #{$PREFIX}btn_#{$type} {
      border: 1px solid nth($values, 1);
      background-color: nth($values, 2);
      color: nth($values, 3);
    }
  }

  /* size相关样式 */
  @each $size, $values in $btn-sizes {
    #{$PREFIX}btn_#{$size} {
      min-width: nth($values, 1);
      height: nth($values, 2);
      padding: nth($values, 3);
      font-size: nth($values, 4);
    }
  }

  .uv-btn {
    position: relative;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    vertical-align: middle;
    /* 隐藏小程序上面的默认边框 */
    &::after {
      border: none;
      line-height: 20px;
    }

    /* 点击态 */
    &::before {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      /* todo 继承边框和圆角的目的是什么? */
      /* 用css过渡实现点击态的想法确实妙 */
      border: inherit {
        color: $black;
      };
      border-radius: inherit; /* inherit parent's border radius */
      transform: translate(-50%, -50%);
      opacity: 0;
      content: ' ';

      /* 为啥要把边框和背景设置成黑色呢? */
      /* 就是为了透明过渡嘛,点一下就从 0变成 0.15 即透明变成一点暗灰 */
      background-color: $black;
    }

    &_active::before {
      opacity: 0.15;
    }
  }
</style>
