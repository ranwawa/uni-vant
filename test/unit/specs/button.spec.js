/**
 * @author 冉娃娃
 * @since 2020/1/7
 * @desc 按钮组件的测试文件
 * @remark
 */
import { mount } from '@vue/test-utils';
import Button from '@/components/button.vue';

let wrapper = mount(Button);
let wrapper2 = mount(Button, {
  propsData: {
    plain: true,
    block: true,
    round: true,
    square: true,
    disabled: true,
    lang: 'zh_CN',
    openType: 'contact',
    color: 'red',
    customStyle: 'height: 1em;',
  },
});
describe('button.vue', () => {
  it('the first test', () => {
    console.log(12341234);
    const a = 1 + 1;
    expect(a).toEqual(2);
  });
});
describe('wrapper测试', () => {
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
  let wrapper = mount(Button, {
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
  let wrapper = mount(Button, {
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
  it('默认情况下,plain是false', () => {
    expect(wrapper.props('plain')).toBeFalsy();
  });
  /* 这里多创建一个实例,明显有点不科学 */
  /* 那就在外部定义一个,里面重复调用就行 */
  it('传递值后,plain为true', () => {
    expect(wrapper2.props('plain')).toBeTruthy();
  });
  it('传递值后,按钮要增加一个uv-btn_plain的类名', () => {
    expect(wrapper2.classes()).toContain('uv-btn_plain');
  });
});
describe('prop block测试', function () {
  it('默认情况下,block是false', () => {
    expect(wrapper.props('block')).toBeFalsy();
  });
  it('传递值后,block要变成true', () => {
    expect(wrapper2.props('block')).toBeTruthy();
  });
  it('传递值后,按钮要增加一个uv-btn_block的类名', () => {
    expect(wrapper2.classes()).toContain('uv-btn_block');
  });
});
describe('prop round测试', function () {
  it('默认情况下,round是false', () => {
    expect(wrapper.props('round')).toBeFalsy();
  });
  it('传递值后,round要变成true', () => {
    expect(wrapper2.props('round')).toBeTruthy();
  });
  it('传递值后,按钮要增加一个uv-btn_round的类名', () => {
    expect(wrapper2.classes()).toContain('uv-btn_round');
  });
});
describe('prop square测试', function () {
  it('默认情况下,square是false', () => {
    expect(wrapper.props('square')).toBeFalsy();
  });
  it('传递值后,square要变成true', () => {
    expect(wrapper2.props('square')).toBeTruthy();
  });
  it('传递值后,按钮要增加一个uv-btn_round的类名', () => {
    expect(wrapper2.classes()).toContain('uv-btn_square');
  });
});
describe('prop disable测试', function () {
  it('默认情况下,disable是false', () => {
    expect(wrapper.props('disable')).toBeFalsy();
  });
  it('默认情况下,button节点上的disable也是false', () => {
    expect(wrapper.attributes('disable')).toBeFalsy();
  });
  it('默认情况下,没有uv-btn_disabled类名', () => {
    expect(wrapper.classes('uv-btn_disabled')).toBeFalsy();
  });
  it('传递值后,disabled要变成true', () => {
    expect(wrapper2.props('disabled')).toBeTruthy();
  });
  it('传递值后,按钮要增加一个uv-btn_unclickable的类名', () => {
    expect(wrapper2.classes('uv-btn_unclickable')).toBeTruthy();
  });
});
describe('prop lang测试', function () {
  it('lang的默认值是en', () => {
    expect(wrapper.attributes('lang')).toBe('en');
  });
  it('lang值修改后,组件相应的要发生变化', () => {
    expect(wrapper2.props('lang')).toBe('zh_CN');
  });
});
describe('prop openType测试', function () {
  it('open-type的默认值是空字符串', () => {
    expect(wrapper.props('openType')).toBe('');
  });
  it('open-type传入contact后,节点上要有相应的属性值', () => {
    expect(wrapper2.attributes('open-type')).toBe('contact');
  });
});
describe('prop color测试', function () {
  it('默认情况下style属性为空字符串', () => {
    expect(wrapper.attributes('style')).toBeUndefined();
  });
  it('color设置为red时,style的文字颜色要是red', () => {
    expect(wrapper2.attributes('style')).toContain('color: red;');
  });
});
describe('prop customStyle', function () {
  it('传入customStyle后,节点属性要跟着变', () => {
    expect(wrapper2.attributes('style')).toContain('height: 1em;');
  });
  it('渐变色要去掉边框', done => {
    wrapper2.setProps({
      color: 'linear-gradient(#000, #fff)',
    });
    wrapper2.vm.$nextTick(() => {
      expect(wrapper2.element.style.border).toBe('0px');
      done();
    });
  });
});
describe('自定义事件', function () {
  wrapper.vm.$emit('getuserinfo');
  wrapper.vm.$emit('contact');
  wrapper.vm.$emit('getphonenumber');
  wrapper.vm.$emit('error');
  wrapper.vm.$emit('opensetting');
  wrapper.vm.$emit('launchapp');
  it('触发getuserinfo事件', () => {
    expect(wrapper.emitted('getuserinfo')).toBeTruthy();
  });
  it('所有事件全部触发', () => {
    expect(wrapper.emittedByOrder().length).toBe(6);
  });
});

