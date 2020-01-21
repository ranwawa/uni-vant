<!-- author: ranwawa -->
<!-- since: 2020/1/21 -->
<!-- desc:  -->
<!-- remark:  -->
<template>
  <view class="uv-doc">
    <uv-section title="按钮类型">
      <uv-button>默认按钮</uv-button>
      <uv-button type="primary">主要按钮</uv-button>
      <uv-button type="info">信息按钮</uv-button>
      <uv-button type="danger">危险按钮</uv-button>
      <uv-button type="warning">警告按钮</uv-button>
    </uv-section>
    <uv-section title="朴素按钮">
      <uv-button plain> 朴素按钮</uv-button>
      <uv-button
        type="info"
        plain
      >朴素按钮
      </uv-button>
    </uv-section>
    <uv-section title="细边框">
      <uv-button>粗边框按钮</uv-button>
      <uv-button hairline>细边框按钮</uv-button>
    </uv-section>
    <uv-section title="禁用状态">
      <uv-button type="info">正常状态</uv-button>
      <uv-button
        type="info"
        disabled
      >禁用状态
      </uv-button>
    </uv-section>
    <uv-section title="加载状态">
      <uv-button loading></uv-button>
      <uv-button
        loading
        loading-type="spinner"
      ></uv-button>
      <uv-button
        loading
        loading-text="加载中..."
      ></uv-button>
    </uv-section>
    <uv-section title="按钮形状">
      <uv-button square>方形按钮</uv-button>
      <uv-button round>圆形按钮</uv-button>
    </uv-section>
    <uv-section title="图标按钮">
      <uv-button
        type="primary"
        icon="star-o"
      ></uv-button>
      <uv-button icon="star-o">官方图标</uv-button>
      <uv-button icon="https://img.yzcdn.cn/vant/logo.png">图片图标</uv-button>
    </uv-section>
    <uv-section title="按钮尺寸">
      <uv-button size="large">大号按钮</uv-button>
      <uv-button>普通按钮</uv-button>
      <uv-button size="small">小呈按钮</uv-button>
      <uv-button size="mini">mini按钮</uv-button>
    </uv-section>
    <uv-section title="自定义颜色">
      <uv-button color="rgb(114, 50, 221)">单色按钮</uv-button>
      <uv-button
        color="rgb(114, 50, 221)"
        plain
      >单色按钮
      </uv-button>
      <uv-button color="linear-gradient(to right, rgb(75, 176, 255), rgb(97, 73, 246))">
        单色按钮
      </uv-button>
    </uv-section>
  </view>
</template>
<script>
import uvButton from '@/components/button';

export default {
  name: 'button',
  components: {
    uvButton,
  },
};
</script>
<style
  lang="scss"
  scoped
>
  /deep/ .uv-btn {
    margin: 0 12px 12px 0;
  }
</style>
