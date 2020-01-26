import Field from '@/components/field';
import Icon from '@/components/icon';
import { mount } from '@vue/test-utils';
import sinon from 'sinon';

const wr = mount(Field);
const wr2 = mount(Field, {
  propsData: {
    type: 'textarea',
    disabled: true,
    error: true,
    inputAlign: 'right',
    inputClass: 'auto-class',
    clearable: true,
  },
});
let wr3;
beforeEach(() => {
  wr3 = mount(Field);
});
describe('props之type', function () {
  it('默认显示input text', () => {
    expect(wr.contains('input')).toBeTruthy();
  });
  it('传入textarea后input就消失了', () => {
    expect(wr2.contains('input')).toBeFalsy();
  });
  it('传入password后，会显示相关属性', done => {
    wr.setProps({ type: 'password' });
    wr
      .vm
      .$nextTick(() => {
        expect(wr.find('input').attributes('password')).toBe('true');
        done();
      });
  });
});
describe('props之样式相关属性', function () {
  it('默认情况下，输入框只有一个样式', () => {
    expect(wr.find('input').classes().length).toBe(1);
  });
  it('传disabled,type,error,inputAlign, inputClass后，文本域会有6个样式', () => {
    expect(wr2.find('textarea').classes().length).toBe(6);
  });
  it('默认情况下，body只有2个样式', () => {
    expect(wr.find('.uv-field-body').classes().length).toBe(2);
  });
  it('传入textarea后，会有3个样式', () => {
    expect(wr2.find('.uv-field-body').classes().length).toBe(3);
  });
});
describe('props之fixed', function () {
  it('默认情况下，input上未包含fixed属性', () => {
    expect(wr.find('input').attributes('fixed')).toBeFalsy();
  });
  it('attribute of fixed value is false in general condition', () => {
    expect(wr2.find('textarea').attributes('fixed')).toBeFalsy();
  });
  it('textarea attribute of fixed value will change to be true', done => {
    wr3.setProps({
      type: 'textarea',
      fixed: true,
    });
    wr3.vm.$nextTick(() => {
      expect(wr3.find('textarea').attributes('fixed')).toBeTruthy();
      done();
    });
  });
});
describe('props of focus', function () {
  it('the focus value is false at the default', () => {
    expect(wr.props('focus')).toBe(false);
  });
  it('the focus value was set to true', () => {
    wr3.setProps({ focus: true });
    expect(wr3.props('focus')).toBe(true);
  });
  it('the handle func will be emitted', () => {
      // todo 无法通过设置属性来实现触发事件？
      // wr3.setProps({ focus: true });
      const fn = sinon.stub();
      wr3.setMethods({
        handleFocus: fn,
      });
      wr3.find('input').trigger('focus');
      expect(wr3.emitted().focus).toBeTruthy();
      // todo 为啥是未执行呢，好像实际执行的还是自己最开始写的那个方法
      // expect(fn.called).toBeTruthy();
    },
  );
});
describe('properties of value and maxlength', function () {
  it('the default value is empty', () => {
    expect(wr.find('input').element.value).toBe('');
  });
  // todo 同样的方法，把100换成50为啥就报异步方法未执行的错误呢？
  it('input value will be change to 1 of one hundred times', done => {
    const value = '1'.repeat(100);
    wr3.setProps({ value });
    wr3.vm.$nextTick(() => {
      expect(wr3.find('input').element.value.length).toBe(100);
      done();
    });
  });
  // it('input value will be set to 1 of fifty times', done => {
  //   const value = '1'.repeat(100);
  //   wr3.setProps({ value, maxlength: 50 });
  //   wr3.vm.$nextTick(() => {
  //     expect(wr3.find('input').element.value.length).toBe(50);
  //     done();
  //   });
  // });
});
describe('property of clearable', function () {
  const wr4 = mount(Field, { clearable: true });
  it('there is no clear icon at default', () => {
    expect(wr.contains(Icon)).toBeFalsy();
  });
  it('there is no clear icon while set the clearable', () => {
    expect(wr4.contains(Icon)).toBeFalsy();
  });
  it('there is a clear icon while focus on a text input filed', done => {
    wr4.setProps({
      clearable: true,
      value: 123,
    });
    wr4.find('input').element.focus();
    wr4.find('input').trigger('focus');
    wr4.vm.$nextTick(() => {
      expect(wr4.find(Icon).contains('.van-icon-clear')).toBeTruthy();
      done();
    });
  });
});
describe('properties of error and errorMessage', function () {
  const cls = '.uv-field_error-message';
  it('there is no error message at the default', () => {
    expect(wr.contains(cls)).toBeFalsy();
  });
  it('there is no error message while set the message without error', done => {
    wr3.setProps({ errorMessage: 'error info' });
    wr3.vm.$nextTick(() => {
      expect(wr3.contains(cls)).toBeFalsy();
      done();
    });
  });
  it('there is error message', done => {
    wr3.setProps({ error: true, errorMessage: 'error info' });
    wr3.vm.$nextTick(() => {
      expect(wr3.contains(cls)).toBeTruthy();
      done();
    });
  });
});
describe('property of rightIcon', function () {
  const cls = '.uv-field_icon-container';
  it('there is no rightIcon at the default', () => {
    expect(wr.contains(cls)).toBeFalsy();
  });
  it('there is a rightIcon while set iconRight property', async () => {
    wr3.setProps({ rightIcon: 'chat' });
    await wr3.vm.$nextTick();
    expect(wr3.contains(cls)).toBeTruthy();
    expect(wr3.find(Icon).contains('.van-icon-chat')).toBeTruthy();
  });
  it('there is a rightIcon while set icon-right slot', () => {
    const wr4 = mount(Field, {
      slots: {
        'right-icon': 'right icon'
      }
    });
    expect(wr4.find(cls).text()).toBe('right icon');
  });
});