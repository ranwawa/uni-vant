<!-- @format -->

<!-- author: ranwawa -->
<!-- since: 2020/3/24 -->
<!-- desc: 价格 -->
<template>
  <view class="uv-price" @click="$emit('click', amount)">
    <text class="uv-price__unit">
      {{ unit }}
    </text>
    <text class="uv-price__integer">
      {{ inte }}
    </text>
    <text class="uv-price__decimal"> .{{ deci }} </text>
  </view>
</template>
<script>
export default {
  name: 'UvPrice',
  props: {
    unit: {
      type: String,
      default: '￥',
    },
    amount: {
      type: [String, Number],
      default: '0.00',
    },
    size: {
      type: [String, Number],
      default: 18,
    },
    color: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      inte: 0,
      deci: '00',
    };
  },
  watch: {
    amount(newValue, oldValue) {
      if (newValue === oldValue) {
        return;
      }
      this.handleAmount(newValue);
    },
  },
  mounted() {
    this.handleAmount(this.amount);
  },
  methods: {
    handleAmount(newValue) {
      let num = +newValue;
      // eslint-disable-next-line no-self-compare
      num = num !== num ? '0.00' : num.toFixed(2);
      [this.inte, this.deci] = num.split('.');
    },
  },
};
</script>
<style lang="scss" scoped>
$price-color: #f05b28 !default;
$price-size: 24rpx;
$price-unit-margin: 2rpx;
.uv-price {
  display: inline-block;
  color: $price-color;
  font-size: $price-size;
  font-weight: bold;
  line-height: 1;
  vertical-align: baseline;
  &__unit {
    display: inline-block;
    margin-right: $price-unit-margin;
  }
  &__integer {
    font-size: 2em;
  }
}
</style>
