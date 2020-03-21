let systemInfo = null;
function getSystemInfoSync() {
  if (systemInfo === null) {
    systemInfo = uni.getSystemInfoSync().system;
  }
  return systemInfo;
}
function pick(obj, arr) {
  const newObj = {};
  arr.forEach((key) => {
    newObj[key] = obj[key];
  });
  return newObj;
}
function getCharacterLen(val) {
  let len = 0;
  let i = val.length;
  // eslint-disable-next-line no-plusplus
  while (--i >= 0) {
    const length = val.charCodeAt(i);
    len += ((length >= 0 && length <= 128) ? 0.5 : 1);
  }
  return len;
}
export {
  getSystemInfoSync,
  getCharacterLen,
  pick,
};
