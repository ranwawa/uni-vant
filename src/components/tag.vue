<template>
  <view
    class="uv-tag"
    :id="customId"
  >
  </view>
</template>

<script>
import { baseMixin, bem } from './utils/index';

export default {
  name: 'uv-tag',
  mixins: [baseMixin],
  props: {},
};
</script>

<style
  scoped
  lang="scss"
>
  @import './sass/_index.scss';

  $comp: #{$PREFIX}tag;

  #{$comp} {

  }
</style>