/**
 * @author 冉娃娃
 * @since 2020/1/16
 * @desc 计算单位
 * @remark
 */

const REGEXP = new RegExp(/^\d+(\.\d+)?$/);
function addUnit(value) {
  return REGEXP.test('' + value) ? value + 'px' : value;
}
export default addUnit;