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

export function dateFormat(date, fmt) {
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
}

// 设置cookie
export function setCookie(name, value, days = 365) {
  let exdate = new Date();
  exdate.setDate(exdate.getDate() + days);
  document.cookie = `${name}=${escape(value)};expires=${exdate.toGMTString()}`;
}

// 去掉参数全部的回车和空格
export function removeEnter(body) {
  for (let key in body) {
    if (typeof body[key] === 'string') {
      body[key] = body[key].replace(/\n|(^\s*)|(\s*$)/g, '');
    }
  }
  return body;
}

export function escapeUrl(url) {
  return url.replace('#', window.escape('#')).replace('&', window.escape('&'));
}
