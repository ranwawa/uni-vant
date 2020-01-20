/**
 * @author 冉娃娃
 * @since 2020/1/17
 * @desc 公共组件方法
 * @remark
 */
export default {
  props: {
    // 标识符
    id: {
      type: String,
      default: '',
    },
    // 自定义样式
    // todo 这两个属性要抽成mixins或者父类继承
    // 包括相关的computed属性也是一样
    customStyle: {
      type: String,
      default: '',
    },
    // 自定义类名
    customClass: {
      type: String,
      default: '',
    },
  }
}
