import Cell from '@/components/cell';
import Icon from '@/components/icon';
import { mount } from '@vue/test-utils';

const wr = mount(Cell);
const wr2 = mount(Cell, {
  propsData: {
    icon: 'arrow',
    title: '标题',
    titleWidth: '2em',
    label: '说明文字',
    value: '右侧的值',
    isLink: true,
    size: 'large',
    center: true,
    required: true,
    border: false,
    clickable: true,
  },
  slots: {
    title: '插槽标题',
    default: '插槽值',
  },
});
const wr3 = mount(Cell, {
  propsData: {
    label: '说明文字',
    useLabelSlot: true,
  },
  slots: {
    icon: '自定义左侧图标',
    title: '自定义左侧标题',
    label: '插槽说明文字',
    default: '插槽值',
    'right-icon': '插槽右侧图标',
  },
});
describe('props之icon', function () {
  it('默认情况下,左侧图标及图标插槽为空', () => {
    expect(wr.contains(Icon)).toBeFalsy();
    expect(wr.vm.$slots.icon).toBeFalsy();
  });
  it('icon传入arrow，则会有一个uv-icon-arrow的组件', () => {
    expect(wr2.find(Icon).find('.uv-icon-arrow')).toBeTruthy();
  });
  it('传入左侧图标插槽，则会出现对应文字', () => {
    expect(wr3.vm.$slots.icon[0].text).toBe('自定义左侧图标');
  });
});
describe('props之title', function () {
  const cls = '.uv-cell-title';
  it('默认情况下，包含一个uv-cell-title的类，内容为空', () => {
    expect(wr.find(cls).exists()).toBeTruthy();
    expect(wr.find(cls).text()).toBeFalsy();
  });
  it('同时传入title和插槽，只显示title', () => {
    expect(wr2.find(cls).text()).toContain('标题');
  });
  it('只使用插槽时，会显示对应内容', () => {
    expect(wr3.find(cls).text()).toContain('自定义左侧标题');
  });
});
describe('props之titleWidth', function () {
  const cls = '.uv-cell-title';
  it('默认情况下，标题上的style为空', () => {
    expect(wr.find(cls).element.style._length).toBeFalsy();
  });
  it('传入尺寸后，会设置固定宽度', () => {
    expect(wr2.find(cls).element.style['min-width']).toBe('2em');
    expect(wr2.find(cls).element.style['max-width']).toBe('2em');
  });
});
describe('props之label', function () {
  const cls = '.uv-cell-label';
  it('默認情況下,说明文字为空', () => {
    expect(wr.contains(cls)).toBeFalsy();
  });
  it('传入label后就会显示', () => {
    expect(wr2.find(cls).text()).toBe('说明文字');
  });
  it('同时传入插槽和label，显示插槽内容', () => {
    expect(wr3.find(cls).text()).toBe('插槽说明文字');
  });
});
describe('props之value', function () {
  const cls = '.uv-cell-value';
  it('默认情况下，右侧值为空', () => {
    expect(wr.find(cls).text()).toBeFalsy();
  });
  it('同时传入值和插槽，只显示值', () => {
    expect(wr2.find(cls).text()).toBe('右侧的值');
  });
  it('传入插槽时，显示对应内容', () => {
    expect(wr3.find(cls).text()).toBe('插槽值');
  });
});
describe('props之isLink', function () {
  it('设置链接后，默认右侧图标是向右的箭头', () => {
    expect(wr2.findAll(Icon).at(1).find('.uv-icon-arrow')).toBeTruthy();
  });
  it('修改箭头方向后，类名跟着变化', done => {
    wr.setProps({ arrowDirection: 'down' });
    wr
      .vm
      .$nextTick(() => {
        expect(
          wr2.findAll(Icon).at(1).find('.uv-icon-arrow-down')
        ).toBeTruthy();
        done();
      });
  });
  it('设置插槽后，会显示对应内容', () => {
    expect(wr3.vm.$slots['right-icon'][0].text).toBe('插槽右侧图标');
  });
});
describe('props相关布尔值', function () {
  it('默认情况下，根节点有1类名', () => {
    expect(wr.classes().length).toBe(1);
  });
  it('所有属性都传入后，根节点会有6个属性', () => {
    expect(wr2.classes().length).toBe(6);
  });
});









