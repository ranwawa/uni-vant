<template>
  <uv-cell
    :size="size"
    :icon="leftIcon"
    :title="label"
    :title-width="titleWidth"
    :center="center"
    :border="border"
    :is-link="isLink"
    :required="required"
    :clickable="clickable"
    :arrow-direction="arrowDirection"
    title-class="uv-field-label"
    :custom-class="customClass"
    :custom-style="customStyle"
    :custom-id="customId"
  >
    <view
      v-if="$slots.icon"
      slot="icon"
      class="uv-field-slot_left-icon"
    >
      <slot name="left-icon" />
    </view>
    <view
      v-if="$slots.label"
      slot="title"
      class="uv-field-slot_label"
    >
      <slot name="label" />
    </view>
    <!-- 主体部分 -->
    <view :class="computedBodyClass">
      <textarea
        v-if="computedIsShowTextarea"
        :class="computedInputClass"
        :fixed="fixed"
        :focus="focus"
        :value="value"
        :disable="computedIsDisableInput"
        :maxlength="maxlength"
        :placeholder="placeholder"
        :placeholder-style="placeholderStyle"
        :placeholder-class="computedPlaceholderClass"
        :auto-height="autosize"
        :cursor-spacing="cursorSpacing"
        :adjust-position="adjustPosition"
        :show-confirm-bar="showConfirmBar"
        :hold-keyboard="holdKeyboard"
        :selection-end="selectionEnd"
        :selection-start="selectionStart"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
        @confirm="handleConfirm"
      />
      <input
        v-else
        :class="computedInputClass"
        :type="type"
        :focus="focus"
        :value="value"
        :disabled="computedIsDisableInput"
        :maxlength="maxlength"
        :placeholder="placeholder"
        :placeholder-style="placeholderStyle"
        :placeholder-class="computedPlaceholderClass"
        :confirm-type="confirmType"
        :confirm-hold="confirmHold"
        :hold-keyboard="holdKeyboard"
        :cursor-spacing="cursorSpacing"
        :adjust-position="adjustPosition"
        :selection-end="selectionEnd"
        :selection-start="selectionStart"
        :password="computedIsShowPassword"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
        @confirm="handleConfirm"
      />
      <uv-icon
        v-if="computedIsShowClearIcon"
        size="16px"
        name="clear"
        custom-class="van-field_clear-root van-field_icon-root"
        @touchstart.native.stop="handleClear"
      />
      <view
        v-if="computedIsShowRightIcon"
        class="uv-field_icon-container"
        @click="handleClickRightIcon"
      >
        <uv-icon
          v-if="rightIcon"
          size="16px"
          :name="rightIcon"
          :custom-class="computedRightIconClass"
        />
        <slot
          v-else
          name="right-icon"
        />
      </view>
      <view class="uv-field-button">
        <slot name="button" />
      </view>
    </view>
    <view
      v-if="errorMessage"
      class="uv-field_error-message"
      :class="computedErrorClass"
    >
      {{ errorMessage }}
    </view>
  </uv-cell>
</template>

<script>
import uvCell from './cell';
import uvIcon from './icon';
import { baseMixin } from './utils/mixins';
import { bem, getSystemInfoSync } from './utils';

export default {
  name: 'uv-field',
  mixins: [baseMixin],
  // todo 要验证一下，这个最终打包到小程序的js属性里面了么
  behaviors: ['wx://form-field'],
  components: {
    uvCell,
    uvIcon,
  },
  data() {
    return {
      // 系统型号
      // todo 如何测这种依赖方法的属性方法？
      system: getSystemInfoSync().system.split(' ').shift().toLowerCase(),
      focused: false,
    };
  },
  props: {
    // cell相关属性
    // 单元格大小
    size: {
      type: String,
      default: '',
      validate(value) {
        return ['', 'large'].includes(value);
      },
    },
    // 左侧图标
    leftIcon: {
      type: String,
      default: '',
    },
    // 左侧标题
    label: {
      type: String,
      default: '',
    },
    // 标题宽度
    titleWidth: {
      type: [String, Number],
      default: '90px',
    },
    // 内容垂直居中
    center: {
      type: Boolean,
      default: false,
    },
    // 下边框
    border: {
      type: Boolean,
      default: true,
    },
    // 是否显示箭头
    isLink: {
      type: Boolean,
      default: false,
    },
    // 是否显示必填标记
    required: {
      type: Boolean,
      default: false,
    },
    // 点击反馈
    clickable: {
      type: Boolean,
      default: false,
    },
    // 箭头方向
    arrowDirection: {
      type: String,
      default: '',
      validate(value) {
        return ['', 'up', 'down', 'left'].includes(value);
      },
    },
    // input属性
    // 输入框类型
    type: {
      type: String,
      default: 'text',
      validate(value) {
        return [
          'number', 'idcard', 'textarea', 'digit', 'password',
        ].includes(value);
      },
    },
    // 密码框
    password: {
      type: Boolean,
      default: false,
    },
    // 输入框样式
    inputClass: {
      type: String,
      default: '',
    },
    // 如果 type 为 textarea 且在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true
    // todo 这是为啥呢
    fixed: {
      type: Boolean,
      default: false,
    },
    // 焦点
    focus: {
      type: Boolean,
      default: false,
    },
    // 输入值
    value: {
      type: String,
      default: '',
    },
    // 禁用状态
    disabled: {
      type: Boolean,
      default: false,
    },
    // 只读
    readonly: {
      type: Boolean,
      default: false,
    },
    // 最大长度
    maxlength: {
      type: Number,
      default: -1,
    },
    // 提示文字
    placeholder: {
      type: String,
      default: '',
    },
    // 提示文字样式
    placeholderStyle: {
      type: String,
      default: '',
    },
    // 自适应高度
    autosize: {
      type: Boolean,
      default: false,
    },
    // 输入框聚焦时底部与键盘的距离
    cursorSpacing: {
      type: Number,
      default: 50,
    },
    // 键盘弹起时，是否自动上推页面
    adjustPosition: {
      type: Boolean,
      default: true,
    },
    // 是否显示键盘上方带有”完成“按钮那一栏，只对 textarea 有效
    showConfirmBar: {
      type: Boolean,
      default: true,
    },
    // focus 时，点击页面的时候不收起键盘
    holdKeyboard: {
      type: Boolean,
      default: false,
    },
    // 光标起始位置，自动聚集时有效，需与 selection-end 搭配使用
    selectionStart: {
      type: Number,
      default: -1,
    },
    // 光标结束位置，自动聚集时有效，需与 selection-start 搭配使用
    selectionEnd: {
      type: Number,
      default: -1,
    },
    // 设置键盘右下角按钮的文字，仅在 type='text' 时生效
    confirmType: {
      type: String,
      default: '',
    },
    // 点击键盘右下角按钮时是否保持键盘不收起，在 type='textarea' 时无效
    confirmHold: {
      type: Boolean,
      default: false,
    },
    // 清除控件
    clearable: {
      type: Boolean,
      default: false,
    },
    // 输入框内容对齐方式，可选值为 center right
    inputAlign: {
      type: String,
      default: '',
      validate(value) {
        return ['center', 'right'].includes(value);
      },
    },
    // 错误信息
    errorMessage: {
      type: String,
      default: '',
    },
    // 是否显示错误信息
    error: {
      type: Boolean,
      default: false,
    },
    // 底部错误提示文案对齐方式，可选值为 center right
    errorMessageAlign: {
      type: String,
      default: '',
      validate(value) {
        return ['', 'center', 'right'].includes(value);
      },
    },
    // 右侧图标样式
    rightIconClass: {
      type: String,
      default: '',
    },
    // 右侧图标
    rightIcon: {
      type: String,
      default: '',
    },
  },
  computed: {
    computedBodyClass() {
      const {
        type,
        system,
      } = this;
      const param = [];
      if (system === 'ios') {
        param.push(system);
      }
      if (type === 'textarea') {
        param.push(type);
      }
      return bem('field-body', param);
    },
    computedIsShowTextarea() {
      return this.type === 'textarea';
    },
    computedInputClass() {
      const {
        inputClass,
        inputAlign,
        type,
        disabled,
        error,
      } = this;
      const param = [
        inputAlign,
        {
          disabled,
          error,
        },
      ];
      if (this.computedIsShowTextarea) {
        param.push(type);
      }
      const bemClass = bem('field-input', param);
      return `${inputClass && inputClass + ' '}${bemClass}`;
    },
    computedIsDisableInput() {
      return this.disabled || this.readonly;
    },
    computedPlaceholderClass() {
      return bem('field-placeholder', { error: this.error });
    },
    computedIsShowPassword() {
      return this.password || this.type === 'password';
    },
    computedIsShowClearIcon() {
      return this.clearable && this.focused && this.value && !this.readonly;
    },
    computedRightIconClass() {
      return `van-field_icon-root${this.rightIconClass && ' ' + this.rightIconClass}`;
    },
    computedErrorClass() {
      const {
        errorMessageAlign,
        disabled,
        error,
      } = this;
      return bem('field_error', [
        errorMessageAlign,
        {
          disabled,
          error,
        },
      ]);
    },
    computedIsShowRightIcon() {
      return this.rightIcon || this.$slots['right-icon'];
    },
  },
  mounted() {
    // todo 需要验证支付宝等其他小程序的情况
    console.log(this.$slots);
  },
  methods: {
    handleInput(e) {
      const { value = '' } = e.detail || {};
      // todo 这里加个tick的主要目的是？
      this.$nextTick(() => {
        this.emitChange(value);
      });
    },
    handleBlur(e) {
      const { value = '' } = e.detail || {};
      this.focused = false;
      this.$emit('blue', value);
    },
    handleFocus(e) {
      const { value = '' } = e.detail || {};
      this.focused = true;
      this.$emit('focus', value);
    },
    handleConfirm(e) {
      const { value = '' } = e.detail || {};
      this.$emit('confirm', value);
    },
    handleClear() {
      this.$nextTick(() => {
        this.emitChange('');
      });
    },
    handleClickRightIcon() {
      this.$emit('click-icon');
    },
    emitChange(e) {
      this.$emit('input', e);
      this.$emit('change', e);
    },
  },
};
</script>

<style
  lang="scss"
  scoped
>
  @import "./sass/index";

  $comp: #{$PREFIX}field;

  #{$comp} {
    &-body {
      display: flex;
      align-items: center;

      &-textarea {
        line-height: 1.2em;
        min-height: $cell-line-height;
      }

      &-textarea.uv-filed-body-ios {
        margin-top: -4.5px;
      }
    }

    &-input {
      position: relative;
      display: block;
      box-sizing: border-box;
      width: 100%;
      margin: 0;
      padding: 0;
      line-height: inherit;
      text-align: left;
      background-color: transparent;
      border: 0;
      resize: none;
      color: $field-input-text-color;
      /* 兼容h5 uni会自动生成一个16px的尺寸 */
      font-size: $font-size-md;
      height: $cell-line-height;
      min-height: $cell-line-height;

      &-textarea {
        height: $field-text-area-min-height;
        min-height: $field-text-area-min-height;
      }

      &-error {
        color: $field-input-error-text-color;
      }

      &-disabled {
        background-color: transparent;
        opacity: 1;
        color: $field-input-disabled-text-color;
      }

      &-center {
        text-align: center;
      }

      &-right {
        text-align: right;
      }
    }

    &_icon-container {
      line-height: inherit;
      vertical-align: middle;
      padding: 0 $padding-xs;
      margin-right: -$padding-xs;
    }

    &_icon-container,
    &-button {
      flex-shrink: 0;
    }

    &_icon-container {
      color: $field-icon-container-color;

      &:empty {
        display: none;
      }
    }

    &-button {
      padding-left: $padding-xs;

      &:empty {
        display: none;
      }
    }

    &_error {
      text-align: left;
      font-size: $field-error-message-text-font-size;
      color: $field-error-message-color;

      &-center {
        text-align: center;
      }

      &-right {
        text-align: right;
      }
    }
  }
</style>