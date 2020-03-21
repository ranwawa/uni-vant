<!-- author: ranwawa -->
<!-- since: 2020/2/24 -->
<!-- desc: 操作结果 -->

<template>
  <view
    :class="customClass"
    :style="customStyle"
    class="uv-result"
    :id="customId"
  >
    <slot
      v-if="useIconSlot"
      name="icon"
    />
    <uv-icon
      v-else
      :name="iconName"
      :custom-class="computedClass"
      size="66"
    />
    <slot
      v-if="useContentSlot"
      name="desc"
    />
    <template v-else>
      <view
        v-if="contentTitle"
        class="uv-result-title"
      >
        {{ contentTitle }}
      </view>
      <view
        v-if="contentDesc"
        class="uv-result-desc"
      >
        {{ contentDesc }}
      </view>
    </template>
    <slot
      v-if="useButtonSlot"
      name="button"
    />
    <uv-button
      v-else
      :type="buttonType"
      size="large"
      custom-style="margin-top: 30px;"
      @click="$emit('click')"
    >
      {{ buttonText }}
    </uv-button>
  </view>
</template>
<script>
import { RESULT_TYPE } from './utils/constants';
import { baseMixin, bem } from './utils';
import uvIcon from './icon.vue';
import uvButton from './button.vue';

export default {
  name: 'uv-result',
  components: {
    uvIcon,
    uvButton,
  },
  mixins: [baseMixin],
  data() {
    return {
      iconName: '',
      buttonType: '',
    };
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'success',
      validate: (value) => RESULT_TYPE.includes(value),
    },
    useIconSlot: {
      type: Boolean,
      default: false,
    },
    useContentSlot: {
      type: Boolean,
      default: false,
    },
    useButtonSlot: {
      type: Boolean,
      default: false,
    },
    pageTitle: {
      type: String,
      default: '操作成功',
    },
    contentTitle: {
      type: String,
      default: '操作成功',
    },
    contentDesc: {
      type: String,
      default: '',
    },
    buttonText: {
      type: String,
      default: '确定',
    },
  },
  computed: {
    computedClass() {
      return bem('result_icon', [this.type]);
    },
  },
  watch: {
    pageTitle: {
      immediate: true,
      handler: (title) => uni.setNavigationBarTitle({ title }),
    },
    type: {
      immediate: true,
      handler(val) {
        let iconName = val;
        let buttonType = val;
        switch (val) {
          case RESULT_TYPE[0]:
            iconName = 'checked';
            buttonType = 'primary';
            break;
          case RESULT_TYPE[3]:
            iconName = 'clear';
            break;
          default:
            break;
        }
        this.iconName = this.name || iconName;
        this.buttonType = buttonType;
      },
    },
  },
};
</script>
<style
  lang="scss"
  scoped
>
  @import "./sass/index";

  $uv-result-title-size: 18px;

  $comp: #{$PREFIX}result;

  #{$comp} {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding-top: 40px;
    font-size: $font-size-md;

    &-title {
      margin: 15px auto 5px;
      font-size: $uv-result-title-size;
      font-weight: bold;
      line-height: 25px;
    }

    &-desc {
      color: $gray-7;
      font-size: $font-size-md;
    }
  }
</style>
