<!-- author: ranwawa -->
<!-- since: 2020/1/5 -->
<!-- desc: 按钮组件 -->
<!-- remark:  -->
<template>
  <view class="container">
    <button
      :class="classes"
      :id="id"
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
    <!--:hover-class="hoverClass"-->
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
  </view>
</template>
<script>
import bem from './bem';

export default {
  name: 'u-button',
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
      default: 'primary',
      validator(value) {
        return ['primary', 'info', 'warning', 'danger'].includes(value);
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
    this.classes = bem('button', [
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
  .u-button {
    /* 隐藏小程序上面的默认边框 */
    &::after {
      border: none;
    }
    /* 按钮类型相关样式 */
    &_primary {

    }
  }
</style>
