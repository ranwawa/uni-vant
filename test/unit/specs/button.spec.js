/**
 * @author 冉娃娃
 * @since 2020/1/7
 * @desc 按钮组件的测试文件
 * @remark
 */
import { mount } from '@vue/test-utils';
import Button from '@/components/button.vue';

describe('button.vue', () => {
  it('the first test', () => {
    console.log(12341234);
    const a = 1 + 1;
    expect(a).toEqual(2);
  });
});
describe('wrapper测试', () => {
  const wrapper = mount(Button);
  it('组件名是uv-btn', () => {
    expect(wrapper.name()).toBe('uv-btn');
  });
  it('根结点是button', () => {
    expect(wrapper.is('button')).toBeTruthy();
  });
  it('id的默认值是空字符串', () => {
    expect(wrapper.props('id')).toBe('');
  });
  it('type的默认值是default', () => {
    expect(wrapper.props('type')).toBe('default');
  });
  it('size的默认值是normal', () => {
    expect(wrapper.props('size')).toBe('normal');
  });
});
describe('prop type测试', function () {
  const wrapper = mount(Button, {
    propsData: {
      type: 'primary',
    },
  });
  it('传递type时,属性要跟着变化', () => {
    expect(wrapper.props('type')).toBe('primary');
  });
  it('传递type时,类名要跟着变化', () => {
    expect(wrapper.classes()).toContain('uv-btn_primary');
  });
  // it('传递type时,颜色要跟着变化', () => {
  //   expect(wrapper.element.style.color).toBe('#fff');
  // });
  // it('type传入other时,要报错', () => {
  //   expect(wrapper.setProps({ type: 'other'})).toThrowError();
  // });
});
describe('prop size测试', function () {
  const wrapper = mount(Button, {
    propsData: {
      size: 'mini',
    },
  });
  it('传递size时,属性要跟着变化', () => {
    expect(wrapper.props('size')).toBe('mini');
  });
  it('传递size时,类名要跟着变化', () => {
    expect(wrapper.classes()).toContain('uv-btn_mini');
  });
});
describe('prop plain测试', function () {
  const wrapper = mount(Button);
  it('默认情况下,plain是false', () => {
    expect(wrapper.props('plain')).toBeFalsy();
  });
  /* todo 这里多创建一个实例,明显有点不科学 */
  const wrapper2 = mount(Button, {
    propsData: {
      plain: true,
    },
  });
  it('传递值后,plain为true', () => {
    expect(wrapper2.props('plain')).toBeTruthy();
  });
  it('传递值后,按钮要增加一个uv-btn_plain的类名', () => {
    expect(wrapper2.classes()).toContain('uv-btn_plain');
  });
});
describe('prop block测试', function () {
  const wrapper = mount(Button);
  it('默认情况下,block是false', () => {
    expect(wrapper.props('block')).toBeFalsy();
  });
  const wrapper2 = mount(Button, {
    propsData: {
      block: true,
    },
  });
  it('传递值后,block要变成true', () => {
    expect(wrapper2.props('block')).toBeTruthy();
  });
  it('传递值后,按钮要增加一个uv-btn_block的类名', () => {
    expect(wrapper2.classes()).toContain('uv-btn_block');
  });
});
describe('prop round测试', function () {
  const wrapper = mount(Button);
  it('默认情况下,round是false', () => {
    expect(wrapper.props('round')).toBeFalsy();
  });
  const wrapper2 = mount(Button, {
    propsData: {
      round: true,
    },
  });
  it('传递值后,round要变成true', () => {
    expect(wrapper2.props('round')).toBeTruthy();
  });
  it('传递值后,按钮要增加一个uv-btn_round的类名', () => {
    expect(wrapper2.classes()).toContain('uv-btn_round');
  });
});
describe('prop square测试', function () {
  const wrapper = mount(Button);
  it('默认情况下,square是false', () => {
    expect(wrapper.props('square')).toBeFalsy();
  });
  const wrapper2 = mount(Button, {
    propsData: {
      square: true,
    },
  });
  it('传递值后,square要变成true', () => {
    expect(wrapper2.props('square')).toBeTruthy();
  });
  it('传递值后,按钮要增加一个uv-btn_round的类名', () => {
    expect(wrapper2.classes()).toContain('uv-btn_square');
  });
});
describe('prop disable测试', function () {
  const wrapper = mount(Button);
  it('默认情况下,disable是false', () => {
    expect(wrapper.props('disable')).toBeFalsy();
  });
  it('默认情况下,button节点上的disable也是false', () => {
    expect(wrapper.attributes('disable')).toBeFalsy();
  });
  it('默认情况下,没有uv-btn_disabled类名', () => {
    expect(wrapper.classes('uv-btn_disabled')).toBeFalsy();
  });
  const wrapper2 = mount(Button, {
    propsData: {
      disabled: true,
    },
  });
  it('传递值后,disabled要变成true', () => {
    expect(wrapper2.props('disabled')).toBeTruthy();
  });
  it('传递值后,按钮要增加一个uv-btn_unclickable的类名', () => {
    expect(wrapper2.classes('uv-btn_unclickable')).toBeTruthy();
  });
});


