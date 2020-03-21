/**
 * @author 冉娃娃
 * @since 2020/1/8
 * @desc
 * @remark
 */
module.exports = {
  chainWebpack(webpackConfig) {
    webpackConfig
      .module
      .rule('eslint')
      .use('eslint-loader')
      .loader('eslint-loader')
      .tap((options) => {
        options.fix = true;
        return options;
      });
  },
};
