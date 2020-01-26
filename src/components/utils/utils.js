let systemInfo = null;
export function getSystemInfoSync() {
  if (systemInfo === null) {
    systemInfo = uni.getSystemInfoSync();
  }
  return systemInfo;
}