// 获取cookie
function getCookie(name) {
    if (document.cookie.length > 0) {
        var start = document.cookie.indexOf(name + '=');
        if (start !== -1) {
            start = start + name.length + 1;
            var end = document.cookie.indexOf(';', start);
            if (end === -1) {
                end = document.cookie.length;
            }
            return unescape(document.cookie.substring(start, end));
        }
    }
    return '';
}

function splitUrl(url) {
    return url && url.indexOf('?') !== -1 ? ('&' + url.split('?')[1]) : '';
}

function escapeUrl(url) {
    return url.replace('#', window.escape('#')).replace('&', window.escape('&'));
}