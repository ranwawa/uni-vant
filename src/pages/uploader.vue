<!-- author: ranwawa -->
<!-- since: 2020/2/12 -->
<!-- desc:  -->
<!-- remark:  -->
<template>
  <view class="uv-doc">
    <uv-platform
      html
      weixin
      android
    />
    <uv-section title="基础用法">
      <uv-uploader
        :file-list="fileList"
        @after-read="afterRead"
        @delete="deleteImg"
      />
    </uv-section>
    <uv-section title="限制上传数量">
      <uv-uploader
        :file-list="fileList"
        :max-count="2"
        @after-read="afterRead"
        @delete="deleteImg"
      />
    </uv-section>
    <uv-section title="自定义上传样式">
      <uv-uploader
        :file-list="fileList"
        @after-read="afterRead"
        @delete="deleteImg"
      >
        <uv-button
          type="primary"
          icon="photo"
        >上传图片
        </uv-button>
      </uv-uploader>
    </uv-section>
    <uv-section title="上传前检验">
      <uv-uploader
        :file-list="fileList"
        :max-count="1"
        :max-size="10240"
        use-before-read
        @after-read="afterRead"
        @delete="deleteImg"
        @oversize="oversize"
        @before-read="beforeRead"
      />
    </uv-section>
  </view>
</template>
<script>
import uvUploader from '@/components/uploader.vue';
import uvButton from '@/components/button.vue';

export default {
  name: 'uploader',
  data() {
    return {
      fileList: [],
    };
  },
  components: {
    uvUploader,
    uvButton,
  },
  methods: {
    deleteImg(e) {
      this.fileList.splice(e.index, 1);
    },
    afterRead(event) {
      const { file } = event;
      this.fileList.push(file);
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      // wx.uploadFile({
      //   url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
      //   filePath: file.path,
      //   name: 'file',
      //   formData: { user: 'test' },
      //   success(res) {
      //     console.log(res);
      //     // 上传完成需要更新 fileList
      //     this.fileList.push({ ...file, url: res.data });
      //   },
      // });
    },
    oversize(e) {
      uni.showToast({
        icon: 'none',
        title: '超过10k了',
      });
      console.log(e);
    },
    beforeRead(e) {
      let appendFix = e.file.name;
      // #ifdef MP
      appendFix = e.file.path;
      // #endif
      if (/\.png$/.test(appendFix)) {
        e.callback(true);
      } else {
        uni.showToast({
          icon: 'none',
          title: '只能是png格式图片',
        });
      }
    },
  },
};
</script>
<style
  lang="scss"
  scoped
>

</style>
