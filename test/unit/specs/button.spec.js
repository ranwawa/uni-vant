/**
 * @author 冉娃娃
 * @since 2020/1/7
 * @desc 按钮组件的测试文件
 * @remark
 */
import { mount } from '@vue/test-utils';
import Button from '../../../components/button.vue';

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
describe('props异常值测试', function () {
  const wrapper = mount(Button, {});
  /* todo 如何验证prop上的validate是否生效呢? */
});
