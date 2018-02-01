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

// 去掉参数全部的回车和空格
export function removeEnter(body) {
  for (let key in body) {
    if (typeof body[key] === 'string') {
      body[key] = body[key].replace(/\n|(^\s*)|(\s*$)/g, '');
    }
  }
  return body;
}

// 产生随机数
export function getRandomNum(Min, Max) {
  return (Min + Math.round(Math.random() * (Max - Min)));
}

export function escapeUrl(url) {
  return url.replace('#', window.escape('#')).replace('&', window.escape('&'));
}
