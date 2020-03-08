<!-- author: ranwawa -->
<!-- since: 2020/2/14 -->
<!-- desc:  -->
<!-- remark:  -->
<template>
  <view class="uv-doc">
    <uv-platform
      html
      weixin
    />
    <uv-section title="基础用法">
      <uv-swiper-dot
        :info="list"
        :current="currentItem"
      >
        <swiper
          autoplay
          @change="handleChange"
        >
          <swiper-item
            v-for="(item, index) in list"
            :key="index"
          >
            <div class="bg">
              {{ item }}
            </div>
          </swiper-item>
        </swiper>
      </uv-swiper-dot>
    </uv-section>
    <uv-section title="变化样式">
      <uv-swiper-dot
        :info="list"
        :current="currentItem"
        mode="round"
      >
        <swiper
          autoplay
          @change="handleChange"
        >
          <swiper-item
            v-for="(item, index) in list"
            :key="index"
          >
            <div class="bg">
              {{ item }}
            </div>
          </swiper-item>
        </swiper>
      </uv-swiper-dot>
      <br />
      <uv-swiper-dot
        :info="list"
        :current="currentItem"
        mode="nav"
      >
        <swiper
          autoplay
          @change="handleChange"
        >
          <swiper-item
            v-for="(item, index) in list"
            :key="index"
          >
            <div class="bg">
              {{ item }}
            </div>
          </swiper-item>
        </swiper>
      </uv-swiper-dot>
      <br />
      <uv-swiper-dot
        :info="list"
        :current="currentItem"
        mode="indexes"
      >
        <swiper
          autoplay
          @change="handleChange"
        >
          <swiper-item
            v-for="(item, index) in list"
            :key="index"
          >
            <div class="bg">
              {{ item }}
            </div>
          </swiper-item>
        </swiper>
      </uv-swiper-dot>

    </uv-section>
    <uv-section title="自定义样式">
      <uv-swiper-dot
        :info="list"
        :current="currentItem"
        :dots-styles="dotsStyles"
      >
        <swiper
          autoplay
          @change="handleChange"
        >
          <swiper-item
            v-for="(item, index) in list"
            :key="index"
          >
            <div class="bg">
              {{ item }}
            </div>
          </swiper-item>
        </swiper>
      </uv-swiper-dot>
    </uv-section>

  </view>
</template>
<script>
import uvSwiperDot from '@/components/swiper-dot.vue';

export default {
  name: 'swiper-dot',
  components: {
    uvSwiperDot,
  },
  data() {
    return {
      list: [1, 2, 3],
      currentItem: 0,
      dotsStyles: {
        width: 20,
        bottom: 30,
        backgroundColor: 'red',
        selectedBackgroundColor: 'blue',
      },
    };
  },
  methods: {
    handleChange(e) {
      this.currentItem = e.detail.current;
    },
  },
};
</script>
<style
  lang="scss"
  scoped
>
.bg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  &:nth-child(1) {
    background-color: #ccc;
  }
  &:nth-child(1) {
    background-color: yellowgreen;
  }
}
</style>
