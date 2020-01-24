/**
 * @author 冉娃娃
 * @since 2020/1/16
 * @desc 图标测试
 * @remark
 */
import Icon from '@/components/icon.vue';
import Info from '@/components/info.vue';
import { mount } from '@vue/test-utils';

const wrapper = mount(Icon);
const wrapper2 = mount(Icon, {
  propsData: {
    name: 'chat',
    dot: true,
    color: '#fff',
    size: 20,
  },
});
const wrapper3 = mount(Icon, {
  propsData: {
    name: 'chat',
    classPrefix: 'iconfont',
  },
});
describe('props之name测试', function () {
  it('默认情况下,应该包含.van-icon节点,隐藏image节点', () => {
    expect(wrapper.contains('.van-icon')).toBeTruthy();
    expect(wrapper.contains('image')).toBeFalsy();
  });
  it('传入chat后,应该包含van-icon-chat类名', () => {
    expect(wrapper2.contains('.van-icon-chat')).toBeTruthy();
  });
  it('传入/static/bg.png后,显示image节点', done => {
    wrapper2.setProps({ name: '/static/bg.png' });
    wrapper2
      .vm
      .$nextTick(() => {
        expect(wrapper2.contains('image')).toBeTruthy();
        done();
      });
  });
  it('传入/static/bg.png后,应该隐藏van-icon节点', done => {
    wrapper2.setProps({ name: '/static/bg.png' });
    wrapper2
      .vm
      .$nextTick(() => {
        expect(wrapper2.contains('.van-icon')).toBeTruthy();
        done();
      });
  });
});
describe('props之dot测试', function () {
  it('默认情况下,应该没有uv-info组件', () => {
    expect(wrapper.contains(Info)).toBeFalsy();
  });
  it('传入dot,要有uv-info组件', () => {
    expect(wrapper2.contains(Info)).toBeTruthy();
  });
});
describe('props之info', function () {
  it('传入1后,要显示1', done => {
    wrapper2.setProps({
      dot: false,
      info: 1,
    });
    wrapper2
      .vm
      .$nextTick(() => {
        expect(wrapper2.text()).toBe('1');
        done();
      });
  });
});
describe('props之color,size', function () {
  const wrapperIconStyle = wrapper.find('.van-icon').element.style;
  const wrapper2IconStyle = wrapper2.find('.van-icon').element.style;
  it('默认情况下,color为空', () => {
    expect(wrapperIconStyle.color).toBe('');
  });
  it('默认情况下,字号为空', () => {
    expect(wrapperIconStyle['font-size']).toBe('');
  });
  it('传入#fff后,也要变成#fff', () => {
    // 注意 color设置为Inherit时会自动置空
    // 16进制会自动转换成rgb格式
    expect(wrapper2IconStyle.color).toBe('rgb(255, 255, 255)');
  });
  it('传入20后,字号要变成20px', () => {
    expect(wrapper2IconStyle['font-size']).toBe('20px');
  });
});
describe('props之classPrefix', function () {
  it('传入iconfont后,要隐藏.van-icon类名', () => {
    expect(wrapper3.contains('.van-icon')).toBeFalsy();
  });
  it('传入iconfont后,要显示.iconfont类名', () => {
    expect(wrapper3.contains('.iconfont')).toBeTruthy();
  });
  it('传入iconfont和chat后,要显示.iconfont-chat类名', () => {
    expect(wrapper3.contains('.iconfont-chat')).toBeTruthy();
  });
});
