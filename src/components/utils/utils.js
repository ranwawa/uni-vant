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
export {
  getSystemInfoSync,
  pick,
};
