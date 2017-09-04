// 获取cookie
export function getCookie(name) {
  if (document.cookie.length > 0) {
    let start = document.cookie.indexOf(`${name}=`);
    if (start !== -1) {
      start = start + name.length + 1;
      let end = document.cookie.indexOf(';', start);
      if (end === -1) {
        end = document.cookie.length;
      }
      return unescape(document.cookie.substring(start, end));
    }
  }
  return '';
}

// 设置cookie
export function setCookie(name, value, days = 365) {
  let exdate = new Date();
  exdate.setDate(exdate.getDate() + days);
  document.cookie = `${name}=${escape(value)};expires=${exdate.toGMTString()}`;
}
