/**
 * @author 冉娃娃
 * @since 2020/1/5
 * @desc 计算组件的class属性
 * @remark
 */
const PREFIX = 'uv-';
function join(name, mods) {
  name = PREFIX + name;
  mods = mods.map(function (mod) {
    return name + '-' + mod;
  });
  mods.unshift(name);
  return mods.join(' ');
}
function traversing(mods, conf) {
  if (!conf) {
    return;
  }
  if (typeof conf === 'string' || typeof conf === 'number') {
    mods.push(conf);
  } else if (Array.isArray(conf)) {
    conf.forEach(item => traversing(mods, item));
  } else if (typeof conf === 'object') {
    Object
      .keys(conf)
      .forEach(key => conf[key] && mods.push(key));
  }
}
export default function bem(name, conf) {
  const mods = [];
  traversing(mods, conf);
  return join(name, mods);
}
