import CellGroup from '@/components/cell-group';
import { mount } from '@vue/test-utils';

const wr = mount(CellGroup);
const wr2 = mount(CellGroup, {
  propsData: {
    title: '标题',
    border: false,
    customClass:'a123',
  },
  slots: {
    default: '插槽内容',
  },
});
describe('props之title', function () {
  const cls = '.uv-cell-group-title';
  it('默认情况下，标题为空', () => {
    expect(wr.contains(cls)).toBeFalsy();
  });
  it('传入值后，标题会发生变化', () => {
    expect(wr2.find(cls).text()).toBe('标题');
  });
});
describe('slot之默认插槽', function () {
  const cls = '.uv-cell-group';
  const cls2 = '.uv-hairline-top-bottom';
  it('默认情况下，主体内容为空,有边框', () => {
    expect(wr.find(cls).isEmpty()).toBeTruthy();
    expect(wr.contains(cls2)).toBeTruthy();
  });
  it('传入内容后，要生成相应的插槽内容', () => {
    expect(wr2.find(cls).text()).toBe('插槽内容');
  });
  it('设置边框后,要隐藏对应的类名', () => {
    expect(wr2.contains(cls2)).toBeFalsy();
  });
});
