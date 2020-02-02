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

  $fades: (
    'fade-enter': 0,
    'fade-enter-to': 1,
    'fade-leave': 1,
    'fade-leave-to': 0
  );

  @each $name, $value in $fades {
    #{$PREFIX}#{$name} {
      opacity: $value;
    }
  }

  .uv-fade-up-enter,
  .uv-fade-up-leave-to {
    transform: translate3d(0, 100%, 0);
    opacity: 0;
  }

  .uv-fade-down-enter,
  .uv-fade-down-leave-to {
    transform: translate3d(0, -100%, 0);
    opacity: 0;
  }

  .uv-fade-left-enter,
  .uv-fade-left-leave-to {
    transform: translate3d(-100%, 0, 0);
    opacity: 0;
  }

  .uv-fade-right-enter,
  .uv-fade-right-leave-to {
    transform: translate3d(100%, 0, 0);
    opacity: 0;
  }


  .uv-slide-up-enter,
  .uv-slide-up-leave-to {
    transform: translate3d(0, 100%, 0);
  }

  .uv-slide-down-enter,
  .uv-slide-down-leave-to {
    transform: translate3d(0, -100%, 0);
  }

  .uv-slide-left-enter,
  .uv-slide-left-leave-to {
    transform: translate3d(-100%, 0, 0);
  }

  .uv-slide-right-enter,
  .uv-slide-right-leave-to {
    transform: translate3d(100%, 0, 0);
  }

</style>