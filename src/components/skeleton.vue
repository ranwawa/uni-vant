<!--
 * @file 骨架屏组件
 * @version 0.0.1
 * @author 冉娃娃 <274544338@qq.com>
 * @since 2020/6/15 11:23
-->
<template>
  <view class="uv-skeleton">
    <view v-if="loading" :class="computedClass" :style="customStyle">
      <view
        v-if="avatar"
        :class="computedAvatarClass"
        :style="computedAvatarStyle"
      />
      <view class="uv-skeleton__content">
        <view
          v-if="title"
          class="uv-skeleton__title"
          :style="'width:' + titleWidth"
        />
        <view
          v-for="(item, index) in row"
          :key="index"
          class="uv-skeleton__row"
          :style="'width:' + (computedIsArray ? rowWidth[index] : rowWidth)"
        />
      </view>
    </view>
    <view v-else class="uv-skeleton__content">
      <slot />
    </view>
  </view>
</template>

<script>
import { baseMixin, bem } from './utils';

export default {
  name: 'UvSkeleton',
  mixins: [baseMixin],
  props: {
    row: {
      type: Number,
      default: 0,
    },
    title: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: true,
    },
    animate: {
      type: Boolean,
      default: true,
    },
    avatarSize: {
      type: String,
      default: '64rpx',
    },
    avatarShape: {
      type: String,
      default: 'round',
    },
    titleWidth: {
      type: String,
      default: '40%',
    },
    rowWidth: {
      type: [String, Array],
      default: '100%',
    },
  },
  computed: {
    computedClass() {
      const { animate, customClass } = this;
      const bemClass = bem('skeleton', [{ animate }]);
      return `${bemClass} ${customClass}`;
    },
    computedAvatarClass() {
      return bem('skeleton__avatar', [this.avatarShape]);
    },
    computedIsArray() {
      return this.rowWidth instanceof Array;
    },
    computedAvatarStyle() {
      return `width:${this.avatarSize}; height:${this.avatarSize}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./sass/index";

$comp: #{$PREFIX}skeleton;
#{$comp} {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: $skeleton-padding;

  &__avatar {
    flex-shrink: 0;
    margin-right: $padding-md;
    background-color: $skeleton-avatar-background-color;

    &-round {
      border-radius: 100%;
    }
  }

  &__content {
    flex: 1;
  }

  &__avatar + &__content {
    padding-top: $padding-xs;
  }

  &__row,
  &__title {
    height: $skeleton-row-height;
    background-color: $skeleton-row-background-color;
  }

  &__title {
    margin: 0;
  }

  &__row {
    &:not(:first-child) {
      margin-top: $skeleton-row-margin-top;
    }
  }

  &__title + &__row {
    margin-top: px2rpx(20);
  }

  &-animate {
    animation: uv-skeleton-blink $skeleton-animation-duration ease-in-out
      infinite;
  }

  @keyframes uv-skeleton-blink {
    50% {
      opacity: 0.6;
    }
  }
}
</style>
