<!-- author: ranwawa -->
<!-- since: 2020/2/12 -->
<!-- desc:  -->
<!-- remark:  -->
<template>
  <view
    :class="customClass"
    :style="customStyle"
    class="uv-uploader"
    :id="customId"
  >
    <!-- 预览样式 -->
    <template v-if="previewImage">
      <view
        v-for="(item,index) in lists"
        :key="index"
        class="uv-uploader-preview"
      >
        <!-- 图片 -->
        <image
          v-if="item.isImage"
          :style="computedFileStyle"
          class="uv-uploader-preview-image"
          :mode="imageFit"
          :src="item.showSrc"
          :alt="item.showAlt"
          @click="doPreview(item.showSrc)"
        />
        <!-- 视频/文件 -->
        <view
          v-else
          :style="computedFileStyle"
          class="uv-uploader-file"
        >
          <!-- 文件图标 -->
          <uv-icon
            name="description"
            custom-class="uv-uploader-file-icon"
          />
          <!-- 文件名 -->
          <text class="uv-uploader-file-name uv-ellipsis">
            {{ item.showFileName }}
          </text>
        </view>
        <!-- 删除按钮 -->
        <uv-icon
          v-if="deleteable"
          name="clear"
          custom-class="uv-uploader-preview-delete"
          @click="deleteItem(index)"
        />
      </view>
    </template>
    <!-- 上传样式 -->
    <template v-if="computedShowUpload">
      <!-- 自定义上传样式 -->
      <view
        class="uv-uploader-slot"
        @click="startUpload"
      >
        <slot />
      </view>
      <!-- 默认上传样式 -->
      <view
        :style="computedFileStyle"
        class="uv-uploader-upload"
        @click="startUpload"
      >
        <uv-icon
          name="plus"
          custom-class="uv-uploader-upload-icon"
        />
        <text
          v-if="uploadText"
          class="uv-uploader-upload-text"
        >
          {{ uploadText }}
        </text>
      </view>
    </template>
  </view>
</template>
<script>
import uvIcon from './icon';
import { addUnit, baseMixin } from './utils';

function adaptorGetDefaultMethod() {
  let method = 'chooseImage';
  // #ifdef MP-WEIXIN || MP-QQ
  method = 'chooseMessageFile';
  // #endif
  return method;
}
function adaptorCheckImageType(item) {
  let prefix = 'http://tmp';
  // #ifdef H5
  prefix = 'blob';
  // #endif
  return item.path.indexOf(prefix) === 0;
}
export default {
  name: 'uv-uploader',
  components: {
    uvIcon,
  },
  mixins: [baseMixin],
  data() {
    return {};
  },
  props: {
    previewImage: {
      type: Boolean,
      default: true,
    },
    // 是否展示删除按钮
    deleteable: {
      type: Boolean,
      default: true,
    },
    // 览图和上传区域的尺寸，默认单位为px
    previewSize: {
      type: [String, Number],
      default: '80px',
    },
    // 预览图裁剪模式，可选值参考小程序image组件的mode属性
    imageFit: {
      type: String,
      default: 'scaleToFill',
    },
    // 上传区域文字提示
    uploadText: {
      type: String,
      default: '',
    },
    // 是否禁用文件上传
    disabled: {
      type: Boolean,
      default: false,
    },
    // 标识符，可以在回调函数的第二项参数中获取
    name: {
      type: String,
      default: '',
    },
    // 接受的文件类型
    accept: {
      type: String,
      default: 'image',
      validate(value) {
        return ['all', 'image', 'file', 'video'].includes(value);
      },
    },
    // 所选的图片的尺寸, 当accept为image类型时设置所选图片的尺寸可选值为original compressed
    sizeType: {
      type: Array,
      default: () => (['original', 'compressed']),
      validate(value) {
        return value.includes('original') || value.includes('compressed');
      },
    },
    // 是否在点击预览图后展示全屏图片预览
    previewFullImage: {
      type: Boolean,
      default: true,
    },
    // 是否开启图片多选，部分安卓机型不支持
    multiple: {
      type: Boolean,
      default: false,
    },
    // 图片或者视频选取模式，当accept为image类型时设置capture可选值为camera可以直接调起摄像头
    capture: {
      type: Array,
      default: () => (['album', 'camera']),
      validate(value) {
        return value.includes('album') || value.includes('camera');
      },
    },
    // 文件大小限制，单位为byte
    maxSize: {
      type: Number,
      default: -1,
    },
    // 文件上传数量限制
    maxCount: {
      type: Number,
      default: 100,
      validate: (value) => value <= 100,
    },
    // 是否开启文件读取前事件
    useBeforeRead: {
      type: Boolean,
      default: false,
    },
    // 当 accept 为 video 时生效，可选值为 back front
    camera: {
      type: String,
      default: 'back',
      validate(value) {
        return ['back', 'front'].includes(value);
      },
    },
    // 当 accept 为 video 时生效，是否压缩视频，默认为true
    compressed: {
      type: Boolean,
      default: true,
    },
    // max-duration
    maxDuration: {
      type: Number,
      default: 60,
    },
    // 预览图列表
    fileList: {
      type: Array,
      default: () => ([]),
    },
  },
  computed: {
    computedFileStyle() {
      const size = addUnit(this.previewSize);
      return ` width: ${size}; height: ${size}; `;
    },
    computedShowUpload() {
      return this.lists.length < this.maxCount;
    },
    lists() {
      return this
        .fileList
        .map((item, index) => {
            item.showSrc = item.url || item.path;
            item.showAlt = item.name || `图片${index}`;
            item.showFileName = item.name || item.showSrc;
            let { isImage } = item;
            if (typeof isImage === 'undefined') {
              isImage = adaptorCheckImageType(item);
            }
            return {
              ...item,
              isImage,
            };
          },
        );
    },
  },
  methods: {
    deleteItem(index) {
      this.$emit('delete', {
        index,
        name: this.name,
      });
    },
    doPreview(url) {
      if (!this.previewFullImage) { return; }
      const images = this.lists
        .filter(item => item.isImage)
        .map(item => item.url || item.path);
      this.$emit(
        'click-preview', {
          url,
          name: this.name,
        },
      );
      uni
        .previewImage({
          urls: images,
          current: url,
        })
        .then(([err, data]) => {
          if (err) {
            throw err;
          } else {
          }
        }).catch(err => console.error(err));
    },
    startUpload() {
      if (this.disabled) {
        return;
      }
      const {
        name = '',
        accept,
        maxSize,
        multiple,
        useBeforeRead = false, // 是否定义了 beforeRead
      } = this;
      this
        .chooseFile()
        .then(([err, data]) => {
          if (err) {
            throw err;
          } else {
            const file = this.getFileInfo(accept, data, multiple);
            if (!this.checkFileSize(file, maxSize)) {
              return this.$emit('oversize', { name, file });
            }
            const emitAfterRead = () => this.$emit(
              'after-read',
              { file, name },
            );
            if (useBeforeRead) {
              return this.$emit('before-read', {
                file,
                name,
                callback: (res) => res ? emitAfterRead() : '',
              });
            }
            emitAfterRead();
          }
        }).catch(err => console.error(err));
    },
    chooseFile() {
      const {
        capture: sourceType,
        maxCount,
        multiple,
        accept,
        sizeType,
        lists,
        camera,
        compressed,
        maxDuration,
      } = this;
      let chooseFile = null;
      const newMaxCount = maxCount - lists.length;
      switch (accept) {
        case 'image': {
          const count = multiple ? (newMaxCount > 9 ? 9 : newMaxCount) : 1;
          chooseFile = uni.chooseImage({
            count,
            sizeType,
            sourceType,
          });
          break;
        }
        case 'video': {
          chooseFile = uni.chooseVideo({
            sourceType,
            compressed,
            maxDuration,
            camera,
          });
          break;
        }
        default: {
          const count = multiple ? newMaxCount : 1;
          uni[adaptorGetDefaultMethod()]({
            count,
            type: 'file',
          });
          break;
        }
      }
      return chooseFile;
    },
    getFileInfo(accept, data, multiple) {
      let file = null;
      if (accept === 'video') {
        file = {
          path: data.tempFilePath,
          ...data,
        };
      } else {
        file = multiple ? data.tempFiles : data.tempFiles[0];
      }
      return file;
    },
    checkFileSize(file, maxSize) {
      return file instanceof Array
        ? file.every(ele => ele.size <= maxSize)
        : file.size <= maxSize;
    },
  },
};
</script>
<style
  lang="scss"
  scoped
>
  @import "sass/index";
  @import "sass/hariline";

  $comp: #{$PREFIX}uploader;
  #{$comp} {
    position: relative;
    display: inline-flex;
    flex-wrap: wrap;

    &-slot:empty {
      display: none;
    }

    &-slot:not(:empty) + &-upload {
      display: none !important;
    }

    &-upload {
      position: relative;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      box-sizing: border-box;
      width: $uploader-size;
      height: $uploader-size;
      margin: 0 $padding-xs $padding-xs 0;
      border: 1px dashed $uploader-upload-border-color;
      border-radius: $uploader-upload-border-radius;
      background-color: $uploader-upload-background-color;
    }

    &-text {
      margin-top: $padding-xs;
      color: $uploader-text-color;
      font-size: $uploader-text-font-size;
    }

    &-preview {
      position: relative;
      margin: 0 $padding-xs $padding-xs 0;

      &-image {
        display: block;
        width: $uploader-size;
        height: $uploader-size;
        border-radius: $uploader-upload-border-radius;
      }
    }

    &-file {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      width: $uploader-size;
      height: $uploader-size;
      border-radius: $uploader-upload-border-radius;
      background-color: $uploader-file-background-color;

      &-name {
        box-sizing: border-box;
        width: 100%;
        margin-top: $padding-xs;
        padding: 0 5px;
        text-align: center;
        color: $uploader-file-name-text-color;
        font-size: $uploader-file-name-font-size;
      }
    }
  }
</style>
