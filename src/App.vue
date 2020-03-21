<script>
export default {
  onLaunch() {
    console.log('App Launch');
  },
  onShow() {
    console.log('App Show');
  },
  onHide() {
    console.log('App Hide');
  },
};
</script>

<style lang="scss">
  @import "assets/font/iconfont.css";
  @import "components/common/index.css";
  @import "components/sass/hariline";
  .uv-doc {
    min-height: calc(100vh - 56px);
    padding: 0 16px;

    &-section {
      box-sizing: border-box;

      &_title {
        display: block;
        margin: 18px 0;
        color: rgba(69, 90, 100, 0.6);
        font-size: 14px;
        font-weight: normal;
        line-height: 16px;
      }

      &_body {
        // 在h5下面,自动生成的uni-view居然是inline
        display: block;
        margin: 16px 0;
      }
    }
  }
</style>
