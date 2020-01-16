/**
 * @author 冉娃娃
 * @since 2020/1/16
 * @desc 加载组件测试
 * @remark
 */
import Loading from '@/components/loading.vue';
import { mount } from '@vue/test-utils';

const wrapper = mount(Loading);
const wrapper2 = mount(Loading, {
    propsData: {
      color: 'red',
      type: 'spinner',
      size: 40,
      vertical: true,
      'custom-class': 'auto',
      textSize: 15,
    },
    slots: {
      default: 'a',
    },
  },
);
const wrapperIcon = wrapper.find('.uv-loading-icon');
const wrapper2Icon = wrapper2.find('.uv-loading-icon');
const loadingText = wrapper.find('.uv-loading-txt');
const loading2Text = wrapper2.find('.uv-loading-txt');
describe('默认状态测试', function () {
  it('默认情况下,应该包含是转圈动画', () => {
    expect(wrapper.contains('.uv-loading-icon_circular')).toBeTruthy();
  });
});
describe('props之color测试', function () {
  it('默认情况下,图标颜色和父元素一样', () => {
    expect(wrapper.find('.uv-loading-icon').element.style.color)
      .toBe('');
  });
  it('传入red后,icon节点要添加red颜色', () => {
    expect(wrapper2.find('.uv-loading-icon').element.style.color).toBe('red');
  });
});
describe('props之type测试', function () {
  it('默认情况下,type应该是circular', () => {
    expect(wrapper.props('type')).toBe('circular');
  });
  it('传入spinner后,要隐藏.uv-loading-icon_circular节点', () => {
    expect(wrapper2.contains('.uv-loading-icon_circular')).toBeFalsy();
  });
  it('传入spinner后,要出现.uv-loading-icon_spinner节点', () => {
    expect(wrapper2.contains('.uv-loading-icon_spinner')).toBeTruthy();
  });
  it('传入spinner后,要有12个子节点', () => {
    expect(wrapper2Icon.findAll('.uv-loading-icon_dot').length).toBe(12);
  });
});
describe('props之size测试', function () {
  const wrapperIconStyle = wrapperIcon.element.style;
  const wrapper2IconStyle = wrapper2Icon.element.style;
  it('默认情况下,图标大小是14px', () => {
    expect(wrapperIconStyle.width).toBe('30px');
    expect(wrapperIconStyle.height).toBe('30px');
  });
  it('传入40后,.uv-loading-con节点的宽高是40px', () => {
    expect(wrapper2IconStyle.width).toBe('40px');
    expect(wrapper2IconStyle.height).toBe('40px');
  });
  it('传入2em后,节点高宽也要变成2em', done => {
    wrapper2.setProps({ size: '2em' });
    wrapper2
      .vm
      .$nextTick(() => {
        expect(wrapper2IconStyle.width).toBe('2em');
        done();
      });
  });
});
describe('props之vertical测试', function () {
  it('默认情况下,应该是水平对齐的', () => {
    expect(wrapper.contains('.uv-loading_vertical')).toBeFalsy();
  });
  it('vertical传入true后,要新增.vu-loading_vertical类', () => {
    expect(wrapper2.contains('.uv-loading_vertical')).toBeTruthy();
  });
});
describe('props之customClass测试', function () {
  it('传入auto后,要新增auto类名', () => {
    expect(wrapper2.contains('.auto')).toBeTruthy();
  });
});
describe('props之textSize测试', function () {
  it('默认情况下,style属性未定义', () => {
    expect(wrapper.attributes('style')).toBeUndefined();
  });
  it('传入15后,字体要变成15px', () => {
    expect(wrapper2.find('.uv-loading-txt').element.style['font-size'])
      .toBe('15px');
  });
});
describe('slots之default测试', function () {
  it('默认情况下,文字为空', () => {
    expect(loadingText.isEmpty()).toBeTruthy();
  });
  it('插槽传入a后,也要显示a', () => {
    expect(loading2Text.text()).toBe('a');
  });
});
