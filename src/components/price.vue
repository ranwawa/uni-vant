<!-- @format -->

<!-- author: ranwawa -->
<!-- since: 2020/3/24 -->
<!-- desc: 价格 -->
<template>
  <view
    class="uv-price"
    :class="customClass"
    :style="computedCustomStyle"
    @click="$emit('click', amount)"
  >
    <text class="uv-price__unit">
      {{ unit }}
    </text>
    <text class="uv-price__integer">
      {{ inte }}
    </text>
    <text class="uv-price__decimal"> .{{ deci }}</text>
  </view>
</template>
<script>
import { baseMixin, bem } from "./utils";

export default {
  name: "UvPrice",
  mixins: [baseMixin],
  props: {
    unit: {
      type: String,
      default: "￥",
    },
    amount: {
      type: [String, Number],
      default: "0.00",
    },
    decimal: {
      type: Number,
      default: 2,
    },
    size: {
      type: [String, Number],
      default: 14,
    },
    color: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      inte: 0,
      deci: "00",
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
  computed: {
    computedCustomStyle() {
      const { size } = this;
      const type = typeof size;
      let fontSize;
      if (type === "string") {
        fontSize = `${size}px`;
      } else {
        fontSize = /[a-zA-Z]{2,3}/.test(size) ? size : `${size}px`;
      }
      const color = this.color ? `color: ${this.color};` : "";
      return `${this.customStyle}; font-size: ${fontSize}; ${color}`;
    },
  },
  mounted() {
    this.handleAmount(this.amount);
  },
  methods: {
    handleAmount(newValue) {
      let num = +newValue;
      // eslint-disable-next-line no-self-compare
      num !== num && (num = 0);
      // let deci = num % 1;
      // this.inte = num - deci;
      // deci = Math.trunc(deci * 10 ** this.decimal);
      // this.deci = deci;
      [this.inte, this.deci] = num.toFixed(this.decimal).split(".");
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./sass/variables";

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
