/**
 * @author 冉娃娃
 * @since 2020/1/8
 * @desc
 * @remark
 */
module.exports = {
  chainWebpack(webpackConfig) {
    webpackConfig.module
      .rule('vue')
      .uses
      .delete('uniapp-scoped');
  },
};
 