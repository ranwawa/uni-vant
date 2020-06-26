<!--
 * @file 空状态组件
 * @version 0.0.1
 * @author 冉娃娃 <274544338@qq.com>
 * @since 2020/6/26 21:27
-->
<template>
  <view class="uv-empty">
    <view class="uv-empty__image">
      <slot
        v-if="useImageSlot"
        name="image"
      />
      <image
        v-else
        :src="computedSrc"
        mode="aspectFill"
      />
    </view>
    <view
      class="uv-empty__description"
    >
      <slot
        v-if="useDescriptionSlot"
        name="description"
      />
      <template v-else>
        {{ description }}
      </template>
    </view>
    <view class="uv-empty__bottom">
      <slot />
    </view>
  </view>
</template>

<script>
import { baseMixin } from './utils';

const PRESETS = {
  error: true,
  search: true,
  default: true,
  network: true,
};
export default {
  mixins: [baseMixin],
  props: {
    image: {
      type: String,
      default: 'default',
    },
    description: {
      type: String,
      default: '',
    },
    useImageSlot: {
      type: Boolean,
      default: false,
    },
    useDescriptionSlot: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedSrc() {
      const { image } = this;
      if (PRESETS[image]) {
        return `https://img.yzcdn.cn/vant/empty-image-${image}.png`;
      }
      return image;
    },
  },
};
</script>

<style
  lang="scss"
  scoped
>
  @import "./sass/index";

  .uv-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: $empty-padding;

    &__image {
      width: $empty-image-size;
      height: $empty-image-size;

      image {
        width: 100%;
        height: 100%;
      }
    }

    &__description {
      margin-top: $empty-description-margin-top;
      padding: $empty-description-padding;
      color: $empty-description-color;
      font-size: $empty-description-font-size;
      line-height: $empty-description-line-height;
    }

    &__bottom {
      margin-top: $empty-bottom-margin-top;
    }
  }
</style>
