<!--
 * @file
 * @version 0.0.1
 * @author 冉娃娃 <274544338@qq.com>
 * @since 2020/6/26 21:58
-->
<template>
  <view class="uv-doc">
    <uv-platform
      html
      weixin
      zhifubao
      android
    />
    <uv-section title="基础用法">
      <uv-empty description="描述文字" />
    </uv-section>
    <uv-section title="图片类型">
      <!-- 通用错误 -->
      <uv-empty
        image="error"
        description="描述文字"
      />
      <!-- 网络错误 -->
      <uv-empty
        image="network"
        description="描述文字"
      />
      <!-- 搜索提示 -->
      <uv-empty
        image="search"
        description="描述文字"
      />
    </uv-section>
    <uv-section title="自定义图片">
      <uv-empty
        image="https://img.yzcdn.cn/vant/custom-empty-image.png"
        description="描述文字"
      />
    </uv-section>
    <uv-section title="底部内容">
      <uv-empty description="描述文字">
        <uv-button
          type="danger"
          class="bottom-button"
          round
        >
          按钮
        </uv-button>
      </uv-empty>
    </uv-section>
  </view>
</template>

<script>
import UvEmpty from '../components/empty.vue';
import UvButton from '../components/button.vue';

export default {
  components: {
    UvEmpty,
    UvButton,
  },
};
</script>

<style
  lang="scss"
  scoped
>

</style>
