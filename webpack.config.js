/**
 * @author 冉娃娃
 * @since 2020/1/8
 * @desc
 * @remark
 */
const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
};
