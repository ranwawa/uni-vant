<template>
  <view class="uv-doc">
    <uv-platform
      html
      weixin
    />
    <uv-section title="基础用法">
      <uv-cell-group>
        <uv-cell
          v-for="item in transitionNameList"
          :key="item"
          :title="item"
          is-link
          @click="handleClick(item)"
        />
      </uv-cell-group>
    </uv-section>

    <view class="fixed">
      <uv-transition
        :name="transitionName"
        :show="isShowTransition"
        :duration="transitionDuration"
      >
        <view class="content"></view>
      </uv-transition>
    </view>
  </view>
</template>

<script>
import uvCell from '@/components/cell.vue';
import uvCellGroup from '@/components/cell-group.vue';
import uvTransition from '@/components/transition.vue';

export default {
  name: 'transition',
  components: {
    uvTransition,
    uvCellGroup,
    uvCell,
  },
  data() {
    return {
      transitionDuration: 2000,
      transitionName: 'fade',
      isShowTransition: false,
      transitionNameList: [
        'fade',
        'fade-up',
        'fade-down',
        'fade-left',
        'fade-right',
        // todo slide leave 未隐藏,可能会存在bug
        'slide-up',
        'slide-down',
        'slide-left',
        'slide-right',
      ],
    };
  },
  methods: {
    handleClick(prop) {
      this.transitionName = prop;
      this.$nextTick(() => {
        this.isShowTransition = true;
      });
      setTimeout(() => {
        this.isShowTransition = false;
      }, 2000);
    },
  },
};
</script>

<style
  scoped
  lang="scss"
>
  .fixed {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    height: 100%;
    pointer-events: none;
  }
  .content {
    width: 200px;
    height: 200px;
    margin: 200px auto auto;
    background-color: blue;
  }
</style>
