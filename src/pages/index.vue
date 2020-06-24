<template>
  <view class="uv-doc">
    <uv-section
      v-for="(item, key) in componentList"
      :key="key"
      :title="key"
    >
      <uv-cell-group>
        <uv-cell
          v-for="ele in item"
          :key="ele.name"
          :title="ele.name"
          :label="ele.desc"
          :disabled="!ele.isComplete"
          :is-link="ele.isComplete"
          @click="handleClick(ele.name)"
        />
      </uv-cell-group>
    </uv-section>
  </view>
</template>

<script>
import uvCell from '@/components/cell.vue';
import uvCellGroup from '@/components/cell-group.vue';

export default {
  components: {
    uvCell,
    uvCellGroup,
  },
  data() {
    return {
      title: 'uni-vant',
      componentList: {
        基础组件: [
          { name: 'Button 按钮', isComplete: true },
          { name: 'Cell 单元格', isComplete: true },
          { name: 'Icon 图标', isComplete: true },
          { name: 'Image 图片', isComplete: false },
          { name: 'Layout 布局', isComplete: false },
          { name: 'Popup 弹出层', isComplete: true },
          { name: 'Transition 动画', isComplete: true },
        ],
        表单组件: [
          { name: 'Field 输入框', isComplete: true },
          { name: 'Uploader 文件上传', isComplete: true },
        ],
        反馈组件: [
          { name: 'Overlay 遮罩层', isComplete: true },
          { name: 'Swiper-dot 滑块指示器', isComplete: true, desc: '仿uni-app' },
        ],
        展示组件: [
          { name: 'Sticky 粘性布局', isComplete: true },
          { name: 'tag 标签', isComplete: true },
          { name: 'Skeleton 骨架屏', isComplete: true },
        ],
        导航组件: [
          { name: 'NavBar 导航栏', isComplete: true },
        ],
        业务组件: [
          { name: 'result 操作结果', isComplete: true, desc: '自定义' },
          { name: 'price 价格', isComplete: true, desc: '自定义' },
        ],
      },
    };
  },
  methods: {
    handleClick(name) {
      const url = name.split(' ')[0].toLocaleLowerCase();
      uni.navigateTo({ url });
    },
  },
};
</script>

<style></style>
