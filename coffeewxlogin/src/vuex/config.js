// 测试接口地址
// const HOST = 'http://test.wx.mattburg.cn/coffeewx/';
// 正式接口地址
const HOST = 'http://org.oa.mattburg.cn/coffeewx/';

const state = {
  imgUrl: process.env.NODE_ENV === 'development' ? 'http://192.168.8.110:8080/static/img/' : `http://${window.location.host}/mobile/coffeewxlogin/static/img/`,
  proxyUrl: `${HOST}v1/`,
  // 正确
  ok: '01',
  // token过期
  onToken: '300',
  // 判断微信支付宝
  userType: (() => {
    return window.$utils.getUserType() || 'WX';
  })(),
  // weiXin
  // 微信获取签名接口
  weiXinGetSignUrl: `${HOST}sign`,
  // common
  // 获取token签名
  getUserTokenUrl: `${HOST}user/login`,
  // index
  index_smsUrl: `${HOST}sms/send`,
  index_setRedUrl: `${HOST}hb/rec18`
};

export default state;
