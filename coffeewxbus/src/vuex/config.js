// 测试接口地址
const HOST = 'http://test.wx.mattburg.cn/coffeewx/';
// 正式接口地址
// const HOST = 'http://org.oa.mattburg.cn/coffeewx/';

const state = {
  imgUrl: process.env.NODE_ENV === 'development' ? 'http://192.168.2.4:8080/static/img/' : `http://${window.location.host}/mobile/coffeewxbus/static/img/`,
  proxyUrl: `${HOST}v1/`,
  // 正确
  ok: '01',
  // token过期
  onToken: '300',
  // 判断微信支付宝
  userType: (() => {
    if (process.env.NODE_ENV === 'development') {
      return 'WX';
    }
    if (window.navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) {
      return 'WX';
    }
    if (window.navigator.userAgent.toLowerCase().indexOf('alipay') !== -1) {
      return 'ZFB';
    }
    return '';
  })(),
  // index
  index_smsUrl: `${HOST}sms/send`,
  index_setRedUrl: `${HOST}hb/rec18`
};

export default state;
