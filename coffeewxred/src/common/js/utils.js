// 获取cookie
export function getLocalStorage(name) {
  return window.localStorage[name];
}

// 设置cookie
export function setLocalStorage(name, value) {
  window.localStorage[name] = value;
}
