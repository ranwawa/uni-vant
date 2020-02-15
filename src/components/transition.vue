<template>
  <view
    class="uv-transition"
    :id="customId"
    :style="computedStyle"
    :class="methodClass"
    @transitionend="handleTransitionEnd"
  >
    <slot />
  </view>
</template>

<script>
import { baseMixin, transition } from './utils/mixins';

export default {
  name: 'uv-transition',
  mixins: [baseMixin, transition],
};
</script>

<style
  scoped
  lang="scss"
>
  @import './sass/_index.scss';

  $comp: #{$PREFIX}transition;

  #{$comp} {
    transition-property: opacity, transform;
    transition-timing-function: ease;
  }

  #{$PREFIX}fade {
    &-enter-active,
    &-leave-active {
      transition-property: opacity;
    }

    &-enter,
    &-leave-to {
      opacity: 0;
    }

    &-up-enter-active,
    &-up-leave-active,
    &-down-enter-active,
    &-down-leave-active,
    &-left-enter-active,
    &-left-leave-active,
    &-right-enter-active,
    &-right-leave-active {
      transition-property: opacity, transform;
    }

    &-up-enter,
    &-up-leave-to {
      transform: translate3d(0, 100%, 0);
      opacity: 0;
    }

    &-down-enter,
    &-down-leave-to {
      transform: translate3d(0, -100%, 0);
      opacity: 0;
    }

    &-left-enter,
    &-left-leave-to {
      transform: translate3d(-100%, 0, 0);
      opacity: 0;
    }

    &-right-enter,
    &-right-leave-to {
      transform: translate3d(100%, 0, 0);
      opacity: 0;
    }

  }


  #{$PREFIX}slide {

    &-up-enter-active,
    &-up-leave-active,
    &-down-enter-active,
    &-down-leave-active,
    &-left-enter-active,
    &-left-leave-active,
    &-right-enter-active,
    &-right-leave-active {
      transition-property: transform;
    }

    &-up-enter,
    &-up-leave-to {
      transform: translate3d(0, 100%, 0);
    }

    &-down-enter,
    &-down-leave-to {
      transform: translate3d(0, -100%, 0);
    }

    &-left-enter,
    &-left-leave-to {
      transform: translate3d(-100%, 0, 0);
    }

    &-right-enter,
    &-right-leave-to {
      transform: translate3d(100%, 0, 0);
    }

  }

</style>