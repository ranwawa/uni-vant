/**
 * @author 冉娃娃
 * @since 2020/1/15
 * @desc 提示信息的单元测试
 * @remark
 */
import { mount } from '@vue/test-utils';
import Info from '@/components/info.vue';

let wrapper = mount(Info);
let wrapper2 = mount(Info, {
  propsData: {
    info: '11',
  },
});
describe('测试默认样式', function () {
  it('默认情况下,节点不会被渲染', () => {
    expect(wrapper.html()).toBe('');
  });
});
describe('测试props之info', function () {
  it('默认情况下,info应该是空字符串', () => {
    expect(wrapper.props('info')).toBe('');
  });
  it('传入11,文本内容会变成11', () => {
    expect(wrapper2.text()).toBe('11');
  });
});
describe('测试props之dot', function () {
  const wrapper3 = mount(Info, {
    propsData: {
      info: 22,
      dot: true,
    },
  });
  it('默认情况下,dot应该是false', () => {
    expect(wrapper.props('dot')).toBeFalsy();
  });
  it('传入dot时,要有一个uv-info_dot类名', () => {
    expect(wrapper3.classes()).toContain('uv-info_dot');
  });
  it('同时传入Info和dot时,内容为空', () => {
    expect(wrapper3.text()).toBe('');
  });
});
 