import {Injectable} from '@angular/core';
import {Factorys} from './factorys';
import {Storage} from '@ionic/storage';

@Injectable()
export class WxSdk {
  private appId = '';
  private timestamp = '';
  private nonceStr = '';
  private signature = '';
  private jsApiList = ['chooseImage', 'getLocalImgData', 'openLocation', 'getLocation', 'onMenuShareTimeline', 'onMenuShareAppMessage'];
  private serviceUrl = `${window.location.host}/coffeewx/toOauth?path=`;

  constructor(public storage: Storage, public factorys: Factorys) {
    if (!this.factorys.getCookie('unionId')) {
      window.location.href = factorys.escapeUrl(window.location.href).replace(`${window.location.host}/`, this.serviceUrl);
    }
  }

  setConfig(data) {
    this.appId = data.appId;
    this.timestamp = data.timestamp;
    this.nonceStr = data.nonceStr;
    this.signature = data.signature;
    window.setTimeout(() => {
      this.config();
      this.share();
    }, 300);
  }

  config() {
    window['wx'].config({
      debug: false,
      appId: this.appId,
      timestamp: this.timestamp,
      nonceStr: this.nonceStr,
      signature: this.signature,
      jsApiList: this.jsApiList
    });
  }

  share() {
    window['wx'].ready(() => {
      window['wx'].onMenuShareTimeline({
        title: '咖啡码头运维系统',
        link: `http://${window.location.host}/mobile/wxoa/index.html`,
        imgUrl: `http://${window.location.host}/mobile/coffeewxapp/static/img/share.jpg`,
        success: () => {
        }
      });
      window['wx'].onMenuShareAppMessage({
        title: '咖啡码头运维系统',
        link: `http://${window.location.host}/mobile/wxoa/index.html`,
        desc: '咖啡码头运维系统(微信端)',
        imgUrl: `http://${window.location.host}/mobile/coffeewxapp/static/img/share.jpg`,
        success: () => {
        }
      });
    });
  }

  getLocation() {
    return new Promise((resolve, reject) => {
      window['wx'].getLocation({
        type: 'gcj02',
        success: (res) => {
          resolve(res);
        },
        fail: (res) => {
          resolve();
          this.factorys.prop('找不到您，请确认定位是否打开！');
        }
      });
    });
  }

  getPicture() {
    return new Promise((resolve, reject) => {
      window['wx'].chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['camera'],
        success: (res) => {
          window['wx'].getLocalImgData({
            localId: res['localIds'][0],
            success: (data) => {
              resolve(data['localData']);
            }
          });
        }
      });
    });
  }
}