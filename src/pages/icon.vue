<!-- author: ranwawa -->
<!-- since: 2020/1/17 -->
<!-- desc: 图标 -->
<!-- remark:  -->
<template>
  <view class="uv-doc">
    <uv-platform
      html
      weixin
    />
    <uv-section title="基础用法">
      <uv-icon name="chat-o" />
      <uv-icon
        name="https://img.yzcdn.cn/vant/logo.png"
        size="1em"
      />
    </uv-section>
    <uv-section title="提示信息">
      <uv-icon
        name="chat-o"
        dot
      />
      <uv-icon
        name="chat-o"
        info="9"
      />
      <uv-icon
        name="chat-o"
        info="99+"
      />
    </uv-section>
    <uv-section title="图标颜色">
      <uv-icon
        name="chat-o"
        color="red"
      />
      <uv-icon
        name="chat-o"
        color="rgb(7, 193, 96)"
      />
    </uv-section>
    <uv-section title="图标大小">
      <uv-icon name="chat-o" />
      <uv-icon
        name="chat-o"
        size="44px"
      />
    </uv-section>
    <uv-section title="自定义图标">
      <uv-icon
        name="qr"
        class-prefix="iconfont"
        size="32px"
      />
      <uv-icon
        name="img"
        class-prefix="iconfont"
        size="32px"
      />
    </uv-section>
  </view>
</template>
<script>
import uvIcon from '@/components/icon.vue';

export default {
  name: 'icon',
  components: {
    uvIcon,
  },
};
</script>
<style
  lang="scss"
  scoped
>
  /deep/ .uv-doc-section_body {
    font-size: 32px;
  }

  /deep/ .uv-icon {
    margin-right: 16px;
  }
</style>
