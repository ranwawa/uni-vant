/**
 * @author 冉娃娃
 * @since 2020/1/7
 * @desc jest配置文件
 * @remark 配置文档 https://jestjs.io/docs/zh-Hans/configuration
 */
module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
    'vue',
  ],
  'moduleNameMapper': {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
};
 