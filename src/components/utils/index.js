/**
 * @author 冉娃娃
 * @since 2020/1/16
 * @desc 集中导出公共方法
 * @remark
 */
import Touch from './touch';
import addUnit from '@/components/utils/add_unit';
import eventBus from '@/components/utils/event_bus';
import computeStyle from '@/components/utils/compute_style';

export { bem } from '@/components/utils/bem';
export { getSystemInfoSync, pick } from '@/components/utils/utils';
export { getRect, baseMixin } from '@/components/utils/mixins';
export {
  Touch,
  addUnit,
  eventBus,
  computeStyle,
};