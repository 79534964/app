(function () {
  function w() {
    var r = document.documentElement;
    var a = r.getBoundingClientRect().width;
    if (a > 750) {
      a = 750
    } else if (a < 320) {
      a = 320
    }
    rem = a / 7.5;
    r.style.fontSize = rem + 'px';
  }

  var t;
  w();
  window.addEventListener('resize', function () {
    clearTimeout(t);
    t = setTimeout(w, 300);
  }, false);
})();

(function () {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  if (window.navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) {
    script.src = 'http://res.wx.qq.com/open/js/jweixin-1.3.0.js';
  } else if (navigator.userAgent.toLowerCase().indexOf('alipay') !== -1) {
    script.src = 'http://as.alipayobjects.com/g/component/antbridge/1.1.4/antbridge.min.js';
  }
  script.src && head.appendChild(script);
})();
