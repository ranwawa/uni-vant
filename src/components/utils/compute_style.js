/**
 * @author 冉娃娃
 * @since 2020/1/16
 * @desc 计算样式
 * @remark
 */

function computeStyle(obj) {
  // todo 这里应该换成reduce,减少一次循环
  return Object
    .entries(obj)
    .filter(([, val]) => val)
    .map(([key, val]) => `${key}: ${val};`)
    .join('');
}
export default computeStyle;
