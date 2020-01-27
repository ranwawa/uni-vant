/**
 * @author 冉娃娃
 * @since 2020/1/17
 * @desc 公共组件方法
 * @remark
 */
const baseMixin = {
  props: {
    // 标识符
    customId: {
      type: String,
      default: '',
    },
    // 自定义样式
    customStyle: {
      type: String,
      default: '',
    },
    // 自定义类名
    customClass: {
      type: String,
      default: '',
    },
  },
};
const getRect = {
  methods: {
    getRect(selector, all) {
      return new Promise(resolve => {
        const query = uni.createSelectorQuery().in(this);
        const method = all ? 'selectAll' : 'select';
        query[method](selector)
          .boundingClientRect(rect => resolve(rect))
          .exec();
      });
    },
  },
};
export default baseMixin;
export {
  getRect,
  baseMixin,
};
