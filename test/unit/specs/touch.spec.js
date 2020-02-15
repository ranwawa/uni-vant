import Touch from '@/components/utils/touch';

const touch = new Touch;
const point = {
  clientX: 100,
  clientY: 100,
};
touch.setStartPoint(point);
describe('正常值测试', function () {
  it('方向为右上', () => {
    const point = {
      clientX: 160,
      clientY: 160,
    };
    const { directionV, directionH } = touch.getDirection(point);
    expect(directionH).toBe('right');
    expect(directionV).toBe('top');
  });
  it('方向为正上', () => {
    const point = {
      clientX: 70,
      clientY: 160,
    };
    const { directionV, directionH } = touch.getDirection(point);
    expect(directionH).toBe('');
    expect(directionV).toBe('top');
  });
  it('方向为左上', () => {
    const point = {
      clientX: 40,
      clientY: 160,
    };
    const { directionV, directionH } = touch.getDirection(point);
    expect(directionH).toBe('left');
    expect(directionV).toBe('top');
  });
  it('方向为左', () => {
    const point = {
      clientX: 20,
      clientY: 120,
    };
    const { directionV, directionH } = touch.getDirection(point);
    expect(directionH).toBe('left');
    expect(directionV).toBe('');
  });
});